# textlint-rule-terminology

[![textlint fixable rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) [![Build Status](https://travis-ci.org/sapegin/textlint-rule-terminology.svg)](https://travis-ci.org/sapegin/textlint-rule-terminology) [![npm](https://img.shields.io/npm/v/textlint-rule-terminology.svg)](https://www.npmjs.com/package/textlint-rule-terminology)

[Textlint](https://github.com/textlint/textlint) rule to check and fix terms, brands and technologies spelling in your tech writing in English.

For example:

- Javascript → JavaScript
- NPM → npm
- front-end → frontend
- website → site
- Internet → internet

(You can customize the rules as you wish.)

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1p0s3e2p1U1m1r3N2Q41/terminology.png)

## Installation

```shell
npm install textlint-rule-terminology
```

## Usage

```shell
textlint --fix --rule terminology Readme.md
```

## Configuration

You can configure the rule in your `.textlintrc`:

```js
{
  "rules": {
    "terminology": {
      // Load default terms (see terms.jsonc in the repository)
      "defaultTerms": true,
      // Syntax elements to skip. Overrides the default
      "skip": ["Blockquote"],
      // List of terms
      "terms": [
        // Exact spelling including the case
        "JavaScript",
        "ESLint",
        "Sass",
        "Less",
        "npm",
        // RegExp (case-insensitive) → replacement
        ["front[- ]end(\\w*)", "frontend$1"],
        ["back[- ]end(\\w*)", "backend$1"],
        ["web[- ]?site(s?)", "site$1"],
        ["hot[- ]key", "hotkey"],
        ["repo\\b", "repository"],
        ["CLI tool(s?)", "command line tool$1"],
        ["build system(s?)", "build tool$1"],
        ["id['’]?s", "IDs"],
        ["(\\w+[^.?!]\\)? )webpack", "$1webpack"],
        ["(\\w+[^.?!]\\)? )internet", "$internet"]
      ],
      // OR load terms from a file
      "terms": "~/terms.jsonc",
      // OR load terms from npm
      "terms": "@johnsmith/terms",
      // Excludes terms
      "exclude": [
        "CSS"
      ]
    }
  }
}
```

Check [the default terminology](./terms.jsonc). Read more about [configuring textlint](https://github.com/textlint/textlint/blob/master/docs/configuring.md).

## Tips & tricks

Use [textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments) to disable terminology check for particular paragraphs:

```markdown
<!-- textlint-disable terminology -->

Oh my javascript!

<!-- textlint-enable -->
```

## Other textlint rules

- [textlint-rule-apostrophe](https://github.com/sapegin/textlint-rule-apostrophe) — correct apostrophe usage
- [textlint-rule-diacritics](https://github.com/sapegin/textlint-rule-diacritics) — words with diacritics
- [textlint-rule-stop-words](https://github.com/sapegin/textlint-rule-stop-words) — filler words, buzzwords and clichés

## Change log

The change log can be found on the [Releases page](https://github.com/sapegin/textlint-rule-terminology/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Sponsoring

This software has been developed with lots of coffee, buy me one more cup to keep it going.

<a href="https://www.buymeacoffee.com/sapegin" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" height="51" width="217" ></a>

## Authors and license

[Artem Sapegin](https://sapegin.me) and [contributors](https://github.com/sapegin/textlint-rule-terminology/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
