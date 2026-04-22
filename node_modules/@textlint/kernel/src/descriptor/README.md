# descriptor

A Descriptor class for kernel.

The Descriptor is a structure object of rules, filter rules, plugins.

- The Descriptor is normalized/filtered object
    - without duplication
    - without disabled
- Create a Descriptor from textlintrc object
- Create a Descriptor from kernel options
- Analyze plugins and provide available extensions for linting 
- Analyze rules and provide normalized rule instance

## Usage

```js
const descriptors = new TextlintKernelDescriptor({
    plugins: [
        {
            pluginId: "text",
            plugin: createDummyPlugin([".txt"])
        },
        {
            pluginId: "markdown",
            plugin: createDummyPlugin([".md"])
        }
    ],
    rules: [
        {
            ruleId: "example",
            rule: exampleRule
        }
    ],
    filterRules: []
});
// available extensions
assert.deepStrictEqual(descriptors.plugin.availableExtensions, [".txt", ".md"]);
// get plugin instance
const markdownProcessor = descriptors.findPluginDescriptorWithExt(".md");
assert.ok(markdownProcessor !== undefined);
// rules
assert.strictEqual(descriptors.rule.descriptors.length, 1);
```

