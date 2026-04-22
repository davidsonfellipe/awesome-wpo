# textlint-rule-helper [![Actions Status: test](https://github.com/textlint/textlint-rule-helper/workflows/test/badge.svg)](https://github.com/textlint/textlint-rule-helper/actions?query=workflow%3A"test")

This is helper library for creating [textlint](https://github.com/textlint/textlint "textlint") rule.

## Installation

```
npm install textlint-rule-helper
```

### Support textlint version

- ~2.2: textlint 12>=
- ~2.3: textlint 13>=

## API

### class RuleHelper

Helper for traversing TxtAST.

#### ruleHelper.getParents(node) : TxtNode[]

Get parents of node.
The parent nodes are returned in order from the closest parent to the outer ones.
`node` is not contained in the results.

**Params**

- node `TxtNode` - the node is start point.

#### ruleHelper.isChildNode(node, types): boolean

Return true if `node` is wrapped any one of node `types`.

**Params**

- node `TxtNode` - is target node
- types `Array.<string>` - are wrapped target node

#### ruleHelper.isPlainStrNode(node): boolean

`isPlainStrNode()` return true if the node is Str node and fill following conditions:

- the node is Str node
- the node is under the Paragraph node
- the node is not under the BlockQuote

**Params**

- node `TxtNode` - is target node

This function is useful for the common use case.

If you want to lint Str node, but you do not want to lint styled node, this function is useful.
The styled node is `Link`, `Strong`, `BlockQuote`, `Header`, and it may be written by other people.

For example, you have added a link to your document, the link's title is written by other people.

Opposite of it, The plain Str node is just under the Paragraph node, and it was written by you.

**Examples**

Return true

```markdown
str str str
- list text
```

Return false

```markdown
# Header
![alt text](https://example.com)
[link title](https://example.com)
> BlockQuote text
**Strong text**
[linkReference][]
[^footnote text]
```

use case

- [refactor: use isPlainStrNode helper by azu · Pull Request #29 · textlint-ja/textlint-rule-preset-ja-spacing](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/pull/29)

### class IgnoreNodeManager

You can manager ignoring range in texts.

#### ignore(node): void

Add the range of `node` to ignoring range list.

**Params**

-  node `TxtNode` - target node

#### ignoreRange(range): void

Add the `range` to ignoring range list

**Params**

- range `[number, number]`

#### ignoreChildrenByTypes(targetNode, ignoredNodeTypes): void

if the children node has the type that is included in `ignoredNodeTypes`,
Add range of children node of `node` to ignoring range list,

**Params**

- targetNode `TxtNode` - target node
- ignoredNodeTypes `Array.<string>` - are node types for ignoring

#### isIgnoredIndex(index): boolean

If the `index` is included in ignoring range list, return true.
`index` should be absolute position.

**Params**

-  index `number` - index value start with 0

#### isIgnoredRange(range): boolean

If the `range` is included in ignoring range list, return true.
`range` should includes absolute positions.

**Params**

- range `[number, number]`

#### isIgnored(node): boolean

If the `range` of `node` is included in ignoring range list, return true.

**Params**

-  node `TxtNode` - target node

### RuleHelper and IgnoreNodeManager Example

A rule for [textlint](https://github.com/textlint/textlint "textlint").

```js
import { RuleHelper } from "textlint-rule-helper";
import { IgnoreNodeManager } from "textlint-rule-helper";
export default function(context) {
  var helper = new RuleHelper(context);
  var ignoreNodeManager = new IgnoreNodeManager();
  var exports = {};
  var reportingErrors = [];
  exports[context.Syntax.Paragraph] = function(node) {
    // Add `Code` node to ignoring list
    ignoreNodeManager.ignoreChildrenByTypes(node, [context.Syntax.Code]);
    // do something
    reportingErrors.push(node, ruleError);
  };
  exports[context.Syntax.Str] = function(node) {
    // parent nodes is any one Link or Image.
    if (helper.isChildNode(node, [context.Syntax.Link, context.Syntax.Image])) {
      return;
    }
    // get Parents
    var parents = helper.getParents(node);
  };
  exports[Syntax.Document + ":exit"] = function(node) {
    reportingErrors.forEach(function(node, ruleError) {
      // if the error is ignored, don't report
      if (ignoreNodeManager.isIgnored(node)) {
        return;
      }
      // report actual
    });
  };
  return exports;
};
```

## `wrapReportHandler(context, options, handler): TextlintRuleReportHandler`

**Params**

- context `TextlintRuleContent` - rule context object
- options `{{ignoreNodeTypes: TxtNodeType[]}}` - options
- handler `(report: (node: AnyTxtNode, ruleError: TextlintRuleError) => void) => any` - handler should return a object

`wrapReportHandler` is high level API that use `RuleHelper` and `IgnoreNodeManager`.
It aim to easy to ignore some Node type for preventing unnecessary error report.

Example: ignore `BlockQuote` and `Code` node.

```js
import { wrapReportHandler } from "textlint-rule-helper";
const reporter = function (context) {
   const { Syntax, getSource } = context;
   return wrapReportHandler(context, {
       ignoreNodeTypes: [Syntax.BlockQuote, Syntax.Code]
   },report => { // <= wrap version of context.report
       // handler should return a rule handler object
       return {
           [Syntax.Paragraph](node) {
               const text = getSource(node);
               const index = text.search("code");
               /*
                * Following text is matched, but it will not reported.
                * ----
                * This is `code`.
                * > code
                * ----
                */
                if(index === -1){
                    return;
                }
                report(node, new context.RuleError(item.name, {
                   index
                }));
           }
       }
   });
};
export default reporter;
```

The Mechanism of `wrapReportHandler`: `

- Ignore all parent nodes that are matched with `ignoreNodeTypes`.
- Ignore all children nodes that are matched with `ignoreNodeTypes`.
    - `wrapReportHandler` create custom `report` function that ignore matched node

## Use-Case

You can see real use-case of this helper library.

- [textlint/rule-advanced.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/rule-advanced.md "textlint/rule-advanced.md at master · textlint/textlint")
- [textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu "textlint-rule-no-mix-dearu-desumasu")

## ChangeLog

- [Releases · textlint/textlint-rule-helper](https://github.com/textlint/textlint-rule-helper/releases "Releases · textlint/textlint-rule-helper")

## Development

```
pnpm i --frozen-lockfile
# watch
pnpm run watch
# build
pnpm run build
# test
pnpm run test
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
