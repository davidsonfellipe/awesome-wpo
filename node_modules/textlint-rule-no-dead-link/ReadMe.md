# textlint-rule-no-dead-link

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)
[![npm](https://img.shields.io/npm/v/textlint-rule-no-dead-link.svg)](https://www.npmjs.com/package/textlint-rule-no-dead-link)
[![Build Status](https://travis-ci.org/textlint-rule/textlint-rule-no-dead-link.svg?branch=master)](https://travis-ci.org/textlint-rule/textlint-rule-no-dead-link)
[![Build status](https://ci.appveyor.com/api/projects/status/mkllnrt580c33hcw/branch/master?svg=true)](https://ci.appveyor.com/project/textlintrule/textlint-rule-no-dead-link/branch/master)
[![Dependency Status](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link.svg)](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link)
[![devDependency Status](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link/dev-status.svg)](https://david-dm.org/textlint-rule/textlint-rule-no-dead-link#info=devDependencies)

[textlint](https://github.com/textlint/textlint) rule
to make sure every link in a document is available.

The primary target of this rule is Markdown documents, but it also works on plain text documents (See tests).

## Installation

```
$ npm install textlint-rule-no-dead-link
```

## Usage

```
$ npm install textlint textlint-rule-no-dead-link
$ textlint --rule textlint-rule-no-dead-link text-to-check.txt
```

## Features

### Dead Link Detection

Shows an error if a link is dead (i.e. its server returns one of the ["non-ok" responses](https://fetch.spec.whatwg.org/#ok-status)).

### Obsolete Link Detection

[![Fixable](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

Shows an error if a link is obsolete or moved to another location (i.e. its server returns one of the ["redirect" responses](https://fetch.spec.whatwg.org/#redirect-status)).

This error is fixable and textlint will automatically replace the obsolete links with their new ones if you run it with `--fix` option.

### Relative Link Resolution

Sometimes your files contain relative URIs, which don't have domain information in an URI string.
In this case, we have to somehow resolve the relative URIs and convert them into absolute URIs.

The resolution strategy is as follows:

1. If `baseURI` is specified, use that path to resolve relative URIs (See the below section for details).
2. If not, try to get the path of the file being linted and use its parent folder as the base path.
3. If that's not available (e.g., when you are performing linting from API), put an error `Unable to resolve the relative URI`.

## Options

Please write your configurations in `.textlintrc`.

The default options are:

```json
{
  "rules": {
    "no-dead-link": {
      "checkRelative": true,
      "baseURI": null,
      "ignore": [],
      "preferGET": [],
      "ignoreRedirects": false,
      "retry": 3,
      "userAgent": "textlint-rule-no-dead-link/1.0",
      "maxRetryTime": 10
    }
  }
}
```

### checkRelative

This rule checks the availability of relative URIs by default.
You can turn off the checks by passing `false` to this option.

### baseURI

The base URI to be used for resolving relative URIs.

Though its name, you can pass either an URI starting with `http` or `https`, or an file path starting with `/`.

Examples:

```json
"no-dead-link": {
  "baseURI": "http://example.com/"
}
```

```json
"no-dead-link": {
  "baseURI": "/Users/textlint/path/to/parent/folder/"
}
```

### ignore

An array of URIs or [glob](https://github.com/isaacs/node-glob "glob")s to be ignored.
These list will be skipped from the availability checks.

Example:

```json
"no-dead-link": {
  "ignore": [
    "http://example.com/not-exist/index.html",
    "http://example.com/*" // glob format
  ]
}
```

### preferGET

An array of [origins](https://url.spec.whatwg.org/#origin) to lets the rule connect to the origin's URL by `GET` instead of default `HEAD` request.

Although the rule will fall back to `GET` method when `HEAD` request is failed (status code is not between 200 and 300), in order to shorten time to run your test, you can use this option when you are sure that target origin always returns 5xx for `HEAD` request.

Example:

```json
"no-dead-link": {
  "preferGET": [
    "http://example.com"
  ]
}
```

### ignoreRedirects

This rule checks for redirects (3xx status codes) and consider's them an error by default.
To ignore redirects during checks, set this value to `false`.

<!-- Experimental 

### concurrency

This rule checks links concurrently.
The default concurrency count is `8`.

-->
### retry

This rule checks the url with retry.
The default max retry count is `3`.

### userAgent

Customize `User-Agent` http header.

### maxRetryTime

The max of allow waiting time second for retry, if response header has `Retry-After`.

Default: `10`

## Tests

```
npm test
```

## Contribution

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT License (http://nodaguti.mit-license.org/)
