# @textlint/ast-traverse

@textlint/ast-traverse provide traversal functions for [TxtAST](https://github.com/textlint/textlint/blob/master/docs/txtnode.md "TxtAST").

This traverse function is a fork of [estraverse](https://github.com/estools/estraverse "Estraverse") for [@textlint/markdown-to-ast](https://github.com/textlint/textlint/tree/master/packages/@textlint/markdown-to-ast/ "textlint/markdown-to-ast").

This library is a part of [textlint/textlint](https://github.com/textlint/textlint "textlint/textlint").

## Installation

```
npm install @textlint/ast-traverse
```

## Usage

```js
var parse = require("@textlint/markdown-to-ast").parse,
    Syntax = require("@textlint/markdown-to-ast").Syntax;
var traverse = require("@textlint/ast-traverse").traverse,
    VisitorOption = require("@textlint/ast-traverse").VisitorOption;
var AST = parse("# Header\nHello*world*");
traverse(AST, {
    enter(node) {
        console.log("enter", node.type);
        if (node.type === Syntax.Strong) {
            return VisitorOption.Skip;
        }
    },
    leave(node) {
        console.log("leave", node.type);
    }
});
```

Traversal rule is the same with [Estraverse](https://github.com/estools/estraverse "Estraverse").

## Example

Markdown:

```markdown
Hello *world*
```

AST:

```json
{
    "start_line": 1,
    "start_column": 1,
    "end_line": 0,
    "children": [
        {
            "start_line": 1,
            "start_column": 1,
            "end_line": 0,
            "inline_content": [
                {
                    "c": "Hello",
                    "raw": "Hello",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 5
                        }
                    },
                    "range": [
                        0,
                        5
                    ],
                    "type": "Str"
                },
                {
                    "c": " ",
                    "raw": " ",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 5
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    },
                    "range": [
                        5,
                        6
                    ],
                    "type": "Str"
                },
                {
                    "c": [
                        {
                            "c": "world",
                            "raw": "world",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            },
                            "range": [
                                0,
                                5
                            ],
                            "type": "Str"
                        }
                    ],
                    "raw": "*world*",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    },
                    "range": [
                        6,
                        13
                    ],
                    "type": "Emphasis"
                }
            ],
            "children": [],
            "raw": "Hello *world*",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 13
                }
            },
            "range": [
                0,
                13
            ],
            "type": "Paragraph"
        }
    ],
    "raw": "Hello *world*",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 13
        }
    },
    "range": [
        0,
        13
    ],
    "type": "Document"
}
```

Traversal all from Root(Document node):

```
[enter, Syntax.Document],
// # Header
[enter, Syntax.Header],
[enter, Syntax.Str],
[leave, Syntax.Str],
[leave, Syntax.Header],
// => Paragraph
[enter, Syntax.Paragraph],
[enter, Syntax.Str],
[leave, Syntax.Str],
// *world*
[enter, Syntax.Emphasis],
[enter, Syntax.Str],
[leave, Syntax.Str],
[leave, Syntax.Emphasis],
// <= Paragraph
[leave, Syntax.Paragraph],
// End
[leave, Syntax.Document]
```

## NOTE

You want to set property on Node.

Bad example:

```js
var TraverseController = require("@textlint/ast-traverse").Controller;
var controller = new TraverseController();
controller.traverse(ast, {
    enter: function (node, parent) {
        node.parent = parent;// it cause a circular reference!
        // do something
        something(node);
    }
});
```

`node.parent = parent;` cause a circular reference!

Correct example:

```js
var TraverseController = require("@textlint/ast-traverse").Controller;
var controller = new TraverseController();
controller.traverse(ast, {
    enter: function (node, parent) {
        // set property as non-enumerable value
        Object.defineProperty(node, "parent", {
            value: parent
        });
        // do something
        something(node);
    }
});
```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

and 

Includes [Estraverse](https://github.com/estools/estraverse "Estraverse")
    
    Copyright (C) 2012-2013 Yusuke Suzuki
    https://github.com/estools/estraverse/blob/master/LICENSE.BSD
