# @textlint/kernel

textlint kernel is core logic by pure JavaScript.

This module is a low layer of textlint.

No plugin, No rule, No filter rule by default.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint/kernel

## Usage

```js
import { TextlintKernel } from "@textlint/kernel";
const kernel = new TextlintKernel();
const options = {
    filePath: "/path/to/file.md",
    ext: ".md",
    plugins: [
        {
            pluginId: "markdown",
            plugin: require("@textlint/textlint-plugin-markdown")
        }
    ],
    rules: [
        {
            ruleId: "no-todo",
            rule: require("textlint-rule-no-todo").default
        }
    ]
};
kernel.lintText("TODO: text", options).then(result => {
    assert.ok(typeof result.filePath === "string");
    assert.ok(result.messages.length === 1);
});
```

Notes: Preset is a collection of Rules.
Currently, `presets` option does not exist.

## Type Interface

`@textlint/kernel` export core types of textlint.

If you use TypeScript, this types help you.

```ts
// Types
import {
    TextlintResult,
    TextlintFixResult,
    TextlintFixCommand,
    TextlintMessage,
    // Kernel rule/filter/plugin format
    TextlintKernelRule,
    TextlintKernelFilterRule,
    TextlintKernelPlugin,
    // textlint rule interface
    TextlintRuleCreator,
    TextlintRuleOptions,
    // textlint filter rule interface
    TextlintFilterRuleCreator,
    TextlintFilterRuleOptions,
    // textlint plugin interface
    TextlintPluginCreator,
    TextlintPluginOptions,
    TextlintPluginProcessor,
    TextlintPluginProcessorConstructor
} from "@textlint/kernel";
```

## Changelog

See [Releases page](https://github.com/textlint/textlint/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/textlint/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
