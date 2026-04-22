# @textlint/source-code-fixer

Apply @textlint/kernel lint result to text.

Almost user just use `@textlint/kernel`'s `fixText` API instead of This package.

This package provide primitive functions for @textlint/kernel.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint/source-code-fixer

## Usage

```ts
import { TextlintKernel } from "@textlint/kernel";
import { applyFixesToText } from "@textlint/source-code-fixer";
const kernel = new TextlintKernel();
const text = "text";
const result = kernel.lintText(text, {
    ...
});
const fixedOutput = applyFixesToText(text, result.messages);
```

## Changelog

See [Releases page](https://github.com/textlint/textlint/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/textlint/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
