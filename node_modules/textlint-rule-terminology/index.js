// @ts-check
const fs = require('fs');
const path = require('path');
const stripJsonComments = require('strip-json-comments');
const { RuleHelper } = require('textlint-rule-helper');
const { upperFirst } = require('lodash');

const DEFAULT_OPTIONS = {
	terms: [],
	skip: ['BlockQuote'],
	defaultTerms: true,
	exclude: [],
};
const sentenceStartRegExp = /\w+[.?!]\)? $/;

function reporter(context, opts = {}) {
	const options = { ...DEFAULT_OPTIONS, ...opts };
	const terms = getTerms(options.defaultTerms, options.terms, options.exclude);

	// Match all words (plain strings) with a single regexp
	const words = terms.filter(rule => typeof rule === 'string');
	const exactWordRules = [[getMultipleWordRegExp(words), words]];

	// Create a separate regexp of each array rule ([pattern, replacement])
	const advancedRules = terms.filter(rule => typeof rule !== 'string');

	const rules = [...exactWordRules, ...advancedRules];

	const helper = new RuleHelper(context);
	const { Syntax, RuleError, report, fixer, getSource } = context;
	return {
		[Syntax.Str](node) {
			if (
				helper.isChildNode(
					node,
					options.skip.map(rule => Syntax[rule])
				)
			) {
				return false;
			}

			return new Promise(resolve => {
				const text = getSource(node);

				rules.forEach(([pattern, replacements]) => {
					const regExp =
						typeof pattern === 'string' ? getAdvancedRegExp(pattern) : pattern;

					let match;
					// eslint-disable-next-line no-cond-assign
					while ((match = regExp.exec(text))) {
						const index = match.index;
						const matched = match[0];

						let replacement = getReplacement(pattern, replacements, matched);

						// Capitalize word in the beginning of a sentense if the original word was capitalized
						const textBeforeMatch = text.substring(0, index);
						const isSentenceStart =
							index === 0 || sentenceStartRegExp.test(textBeforeMatch);
						if (isSentenceStart && upperFirst(matched) === matched) {
							replacement = upperFirst(replacement);
						}

						// Skip correct spelling
						if (matched === replacement) {
							continue;
						}

						const range = [index, index + matched.length];
						const fix = fixer.replaceTextRange(range, replacement);
						const message = `Incorrect usage of the term: “${matched.trim()}”, use “${replacement.trim()}” instead`;
						report(node, new RuleError(message, { index, fix }));
					}
				});

				resolve();
			});
		},
	};
}

/**
 * @param {boolean} defaultTerms
 * @param {string | Array} terms
 * @param {Array} [exclude]
 */
function getTerms(defaultTerms, terms, exclude) {
	const defaults = defaultTerms
		? loadJson(path.resolve(__dirname, 'terms.jsonc'))
		: [];
	const extras = typeof terms === 'string' ? loadJson(terms) : terms;
	// Order matters, the first term to match is used. We prioritize user 'extras' before defaults
	const listTerms = [...(Array.isArray(extras) ? extras : []), ...defaults];

	// Filter on all terms
	if (Array.isArray(exclude)) {
		return listTerms.filter(term => {
			if (Array.isArray(term)) {
				return !exclude.includes(term[0]);
			}
			return !exclude.includes(term);
		});
	}
	return listTerms;
}

/**
 * @param {string} filepath
 */
function loadJson(filepath) {
	const json = readTermsFile(path.resolve(filepath));
	return JSON.parse(stripJsonComments(json));
}

/**
 * @param {string} filepath
 */
function readTermsFile(filepath) {
	try {
		return fs.readFileSync(filepath, 'utf8');
	} catch (err) {
		if (err.code === 'ENOENT') {
			throw new Error(`Terms file not found: ${filepath}`);
		} else {
			throw err;
		}
	}
}

/**
 * Match exact word in the middle of the text
 * @param {string} pattern
 */
function getExactMatchRegExp(pattern) {
	return new RegExp(
		// 1. Beginning of the string, or any character that isn't "-" or alphanumeric
		// 2. Exact match of the pattern
		// 3. Space, ". ", "." at the end of the string, end of the string
		`(?<=^|[^-\\w])\\b${pattern}\\b(?= |\\. |\\.$|$)`,
		'ig'
	);
}

/**
 * Match any of given words exactly in the middle of the text
 * @param {string[]} words
 */
function getMultipleWordRegExp(words) {
	return getExactMatchRegExp(`(?:${words.join('|')})`);
}

/**
 * Match pattern on word boundaries in the middle of the text unless the pattern
 * has look behinds
 * @param {string} pattern
 */
function getAdvancedRegExp(pattern) {
	if (
		// Look behind: (?<=...) and (?<!...)
		pattern.startsWith('(?<') ||
		// Positive look ahead: (?=...)
		pattern.includes('(?=') ||
		// Negative look ahead: (?!...)
		pattern.includes('(?!')
	) {
		return new RegExp(pattern, 'ig');
	}
	return getExactMatchRegExp(pattern);
}

/**
 * @param {string} pattern
 * @param {string[]} replacements
 * @param {string} matched
 */
function getReplacement(pattern, replacements, matched) {
	if (Array.isArray(replacements)) {
		return findWord(replacements, matched);
	}

	return `xyz ${matched} xyz`
		.replace(new RegExp(pattern, 'i'), replacements)
		.slice(4, -4);
}

/**
 * @param {string[]} items
 * @param {string} match
 */
function findWord(items, match) {
	const lowerCaseMatch = match.toLowerCase();
	return items.find(word => word.toLowerCase() === lowerCaseMatch);
}

module.exports = {
	linter: reporter,
	fixer: reporter,
	test: {
		getTerms,
		findWord,
		getMultipleWordRegExp,
		getExactMatchRegExp,
		getAdvancedRegExp,
		getReplacement,
	},
};
