# @textlint/linter-formatter

[textlint](https://github.com/textlint/textlint "textlint/textlint") output formatter.

## Installation

```
npm install @textlint/linter-formatter
```

## Usage

See [formatters/](src/formatters).

Currently, you can use "stylish" (defaults), "checkstyle", "compact", "jslint-xml", "json", "junit", "pretty-error", "table", "tap", and "unix".

```js
const createFormatter = require("@textlint/linter-formatter").createFormatter;
const formatter = createFormatter({
    formatterName: "stylish"
});
const output = formatter([
    {
        filePath: "./README.md",
        messages: [
            {
                ruleId: "semi",
                line: 1,
                column: 23,
                message: "Expected a semicolon."
            }
        ]
    }
]);
console.log(output);
/*
./README.md
  1:23  warning  Expected a semicolon  semi

✖ 1 problem (0 errors, 1 warning)
*/
```


## API

```typescript
export declare type FormatterConfig = {
    color?: boolean;
    formatterName: string;
};
export declare function createFormatter(formatterConfig: FormatterConfig): (results: TextlintResult[]) => string;
export interface FormatterDetail {
    name: string;
}
export declare function getFormatterList(): FormatterDetail[];
```

## CLI

```
$ textlint -f json README.md --rule no-todo | textlint-formatter -f pretty-error --stdin
```

## Other formatter

- [azu/textlint-formatter-codecov: textlint formatter for codecov json.](https://github.com/azu/textlint-formatter-codecov)
- [azu/textlint-formatter-lcov: textlint formatter for lcov format](https://github.com/azu/textlint-formatter-lcov)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
