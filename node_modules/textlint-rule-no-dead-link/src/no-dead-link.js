import { RuleHelper } from 'textlint-rule-helper';
import fetch from 'node-fetch';
import URL from 'url';
import fs from 'fs-extra';
import minimatch from 'minimatch';
import { isAbsolute } from 'path';
import { getURLOrigin } from 'get-url-origin';
import pMemoize from 'p-memoize';
import PQueue from 'p-queue';
import * as http from 'http';
import * as https from 'https';

const DEFAULT_OPTIONS = {
  checkRelative: true, // {boolean} `false` disables the checks for relative URIs.
  baseURI: null, // {String|null} a base URI to resolve relative URIs.
  ignore: [], // {Array<String>} URIs to be skipped from availability checks.
  preferGET: [], // {Array<String>} origins to prefer GET over HEAD.
  retry: 3, // {number} Max retry count
  concurrency: 8, // {number} Concurrency count of linting link [Experimental]
  interval: 500, // The length of time in milliseconds before the interval count resets. Must be finite. [Experimental]
  intervalCap: 8, // The max number of runs in the given interval of time. [Experimental]
  keepAlive: false, // {boolean} if it is true, use keepAlive for checking request [Experimental]
  userAgent: 'textlint-rule-no-dead-link/1.0', // {String} a UserAgent,
  maxRetryTime: 10, // (number) The max of waiting seconds for retry, if response returns `After-Retry` header.
};

// Adopted from http://stackoverflow.com/a/3809435/951517
const URI_REGEXP = /(?:https?:)?\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

/**
 * Returns `true` if a given URI is https? url.
 * @param {string} uri
 * @return {boolean}
 */
function isHttp(uri) {
  const { protocol } = URL.parse(uri);
  return protocol === 'http:' || protocol === 'https:';
}

/**
 * Returns `true` if a given URI is relative.
 * @param {string} uri
 * @return {boolean}
 * @see https://github.com/panosoft/is-local-path
 */
function isRelative(uri) {
  const { host } = URL.parse(uri);
  return host === null || host === '';
}

/**
 * Returns if a given URI indicates a local file.
 * @param {string} uri
 * @return {boolean}
 * @see https://nodejs.org/api/path.html#path_path_isabsolute_path
 */
function isLocal(uri) {
  if (isAbsolute(uri)) {
    return true;
  }
  return isRelative(uri);
}

/**
 * Return `true` if the `code` is redirect status code.
 * @see https://fetch.spec.whatwg.org/#redirect-status
 * @param {number} code
 * @returns {boolean}
 */
function isRedirect(code) {
  return (
    code === 301 || code === 302 || code === 303 || code === 307 || code === 308
  );
}

function isIgnored(uri, ignore = []) {
  return ignore.some((pattern) => minimatch(uri, pattern));
}

/**
 * wait for ms and resolve the promise
 * @param ms
 * @returns {Promise<any>}
 */
function waitTimeMs(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const keepAliveAgents = {
  http: new http.Agent({ keepAlive: true }),
  https: new https.Agent({ keepAlive: true }),
};

const createFetchWithRuleDefaults = (ruleOptions) => {
  /**
   * Use library agent, avoid to use global.http(s)Agent
   * Want to avoid Socket hang up
   * @param parsedURL
   * @returns {module:http.Agent|null|module:https.Agent}
   */
  const getAgent = (parsedURL) => {
    if (!ruleOptions.keepAlive) {
      return null;
    }
    if (parsedURL.protocol === 'http:') {
      return keepAliveAgents.http;
    }
    return keepAliveAgents.https;
  };

  return (uri, fetchOptions) => {
    const { host } = URL.parse(uri);
    return fetch(uri, {
      ...fetchOptions,
      // Disable gzip compression in Node.js
      // to avoid the zlib's "unexpected end of file" error
      // https://github.com/request/request/issues/2045
      compress: false,
      // Some website require UserAgent and Accept header
      // to avoid ECONNRESET error
      // https://github.com/textlint-rule/textlint-rule-no-dead-link/issues/111
      headers: {
        'User-Agent': ruleOptions.userAgent,
        'Accept': '*/*',
        // Same host for target url
        // https://github.com/textlint-rule/textlint-rule-no-dead-link/issues/111
        'Host': host,
      },
      // custom http(s).agent
      agent: getAgent,
    });
  };
};
/**
 * Create isAliveURI function with ruleOptions
 * @param {object} ruleOptions
 * @returns {isAliveURI}
 */
const createCheckAliveURL = (ruleOptions) => {
  // Create fetch function for this rule
  const fetchWithDefaults = createFetchWithRuleDefaults(ruleOptions);
  /**
   * Checks if a given URI is alive or not.
   *
   * Normally, this method following strategiry about retry
   *
   * 1. Head
   * 2. Get
   * 3. Get
   *
   * @param {string} uri
   * @param {string} method
   * @param {number} maxRetryCount
   * @param {number} currentRetryCount
   * @return {{ ok: boolean, redirect?: string, message: string }}
   */
  return async function isAliveURI(uri, method = 'HEAD', maxRetryCount = 3, currentRetryCount = 0) {
    const opts = {
      method,
      // Use `manual` redirect behaviour to get HTTP redirect status code
      // and see what kind of redirect is occurring
      redirect: 'manual',
    };
    try {
      const res = await fetchWithDefaults(uri, opts);
      // redirected
      if (isRedirect(res.status)) {
        const redirectedUrl = res.headers.get('Location');
        const finalRes = await fetchWithDefaults(
          redirectedUrl,
          { ...opts, redirect: 'follow' },
        );
        const { hash } = URL.parse(uri);
        return {
          ok: finalRes.ok,
          redirected: true,
          redirectTo: hash !== null ? `${finalRes.url}${hash}` : finalRes.url,
          message: `${res.status} ${res.statusText}`,
        };
      }
      // retry if it is not ok when use head request
      if (!res.ok && method === 'HEAD' && currentRetryCount < maxRetryCount) {
        return isAliveURI(uri, 'GET', maxRetryCount, currentRetryCount + 1);
      }

      // try to fetch again if not reach max retry count
      if (currentRetryCount < maxRetryCount) {
        const retrySeconds = res.headers.get('Retry-After');
        // If the response has `Retry-After` header, prefer it
        // else exponential retry: 0ms -> 100ms -> 200ms -> 400ms -> 800ms ...
        const retryWaitTimeMs = retrySeconds !== null ? retrySeconds * 1000 : currentRetryCount ** 2 * 100;
        const maxRetryTimeMs = ruleOptions.maxRetryTime * 1000;
        if (retryWaitTimeMs <= maxRetryTimeMs) {
          await waitTimeMs(retryWaitTimeMs);
        }
        return isAliveURI(uri, 'GET', maxRetryCount, currentRetryCount + 1);
      }

      return {
        ok: res.ok,
        message: `${res.status} ${res.statusText}`,
      };
    } catch (ex) {
      // Retry with `GET` method if the request failed
      // as some servers don't accept `HEAD` requests but are OK with `GET` requests.
      // https://github.com/textlint-rule/textlint-rule-no-dead-link/pull/86
      if (method === 'HEAD' && currentRetryCount < maxRetryCount) {
        return isAliveURI(uri, 'GET', maxRetryCount, currentRetryCount + 1);
      }

      return {
        ok: false,
        message: ex.message,
      };
    }
  };

};

/**
 * Check if a given file exists
 */
async function isAliveLocalFile(filePath) {
  try {
    await fs.access(filePath.replace(/[?#].*?$/, ''));

    return {
      ok: true,
    };
  } catch (ex) {
    return {
      ok: false,
      message: ex.message,
    };
  }
}

function reporter(context, options = {}) {
  const { Syntax, getSource, report, RuleError, fixer, getFilePath } = context;
  const helper = new RuleHelper(context);
  const ruleOptions = { ...DEFAULT_OPTIONS, ...options };
  const isAliveURI = createCheckAliveURL(ruleOptions);
  // 30sec memorized
  const memorizedIsAliveURI = pMemoize(isAliveURI, {
    maxAge: 30 * 1000,
  });
  /**
   * Checks a given URI's availability and report if it is dead.
   * @param {TextLintNode} node TextLintNode the URI belongs to.
   * @param {string} uri a URI string to be linted.
   * @param {number} index column number the URI is located at.
   * @param {number} maxRetryCount retry count of linting
   */
  const lint = async ({ node, uri, index }, maxRetryCount) => {
    if (isIgnored(uri, ruleOptions.ignore)) {
      return;
    }

    if (isRelative(uri)) {
      if (!ruleOptions.checkRelative) {
        return;
      }

      const filePath = getFilePath();
      const base = ruleOptions.baseURI || filePath;
      if (!base) {
        const message =
          'Unable to resolve the relative URI. Please check if the base URI is correctly specified.';

        report(node, new RuleError(message, { index }));
        return;
      }

      // eslint-disable-next-line no-param-reassign
      uri = URL.resolve(base, uri);
    }

    // Ignore non http external link
    // https://github.com/textlint-rule/textlint-rule-no-dead-link/issues/112
    if (!isLocal(uri) && !isHttp(uri)) {
      return;
    }

    const method =
      ruleOptions.preferGET.filter(
        (origin) => getURLOrigin(uri) === getURLOrigin(origin),
      ).length > 0
        ? 'GET'
        : 'HEAD';

    const result = isLocal(uri)
      ? await isAliveLocalFile(uri)
      : await memorizedIsAliveURI(uri, method, maxRetryCount);
    const { ok, redirected, redirectTo, message } = result;
    // When ignoreRedirects is true, redirected should be ignore
    if (redirected && ruleOptions.ignoreRedirects) {
      return;
    }
    if (!ok) {
      const lintMessage = `${uri} is dead. (${message})`;
      report(node, new RuleError(lintMessage, { index }));
    } else if (redirected) {
      const lintMessage = `${uri} is redirected to ${redirectTo}. (${message})`;
      const fix = fixer.replaceTextRange(
        [index, index + uri.length],
        redirectTo,
      );
      report(node, new RuleError(lintMessage, { fix, index }));
    }
  };

  /**
   * URIs to be checked.
   * @type {Array<{ node: TextLintNode, uri: string, index: number }>}
   */
  const URIs = [];

  return {
    [Syntax.Str](node) {
      if (helper.isChildNode(node, [Syntax.BlockQuote])) {
        return;
      }

      // prevent double checks
      if (helper.isChildNode(node, [Syntax.Link])) {
        return;
      }

      const text = getSource(node);

      // Use `String#replace` instead of `RegExp#exec` to allow us
      // perform RegExp matches in an iterate and immutable manner
      text.replace(URI_REGEXP, (uri, index) => {
        URIs.push({ node, uri, index });
      });
    },

    [Syntax.Link](node) {
      if (helper.isChildNode(node, [Syntax.BlockQuote])) {
        return;
      }

      // Ignore HTML5 place holder link.
      // Ex) <a>Placeholder Link</a>
      if (typeof node.url === 'undefined') {
        return;
      }

      // [text](http://example.com)
      //       ^
      const index = node.raw.indexOf(node.url) || 0;

      URIs.push({
        node,
        uri: node.url,
        index,
      });
    },

    [`${context.Syntax.Document}:exit`]() {
      const queue = new PQueue({
        concurrency: ruleOptions.concurrency,
        intervalCap: ruleOptions.intervalCap,
        interval: ruleOptions.interval,
      });
      const linkTasks = URIs.map((item) => () => lint(item, ruleOptions.retry));
      return queue.addAll(linkTasks);
    },
  };
}

export default {
  linter: reporter,
  fixer: reporter,
};
