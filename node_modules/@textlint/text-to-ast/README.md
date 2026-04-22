# @textlint/text-to-ast

Parse plain text to AST with location info.

This library is a part of [textlint/textlint](https://github.com/textlint/textlint "textlint/textlint").

Markdown version: [@textlint/markdown-to-ast](https://github.com/textlint/textlint/tree/master/packages/@textlint/markdown-to-ast "textlint/markdown-to-ast")

The AST consists of `TxtNode`s.
A `TxtNode` of the AST has following properties:

- `loc` - Nodes have line and column-based location info.
- `range` - Nodes have an index-based location range (array).
- `raw` - Node have a `raw` text.
- `value` - Node have a `value` of text.

The interface are defined in [textlint/txtnode.md](https://github.com/textlint/textlint/blob/master/docs/txtnode.md "textlint/txtnode.md at master · textlint/textlint")

This library is a part of [textlint/textlint](https://github.com/textlint/textlint "textlint/textlint").

## Installation

```
npm install @textlint/text-to-ast
```

## DEMO

- [AST explorer for textlint](https://textlint.github.io/astexplorer/ "AST explorer for textlint")

## Usage

```js
var parse = require("@textlint/text-to-ast").parse;
var text = "This is a text\nParse text to AST";
var AST = parse(text);
console.log(JSON.stringify(AST, null ,4))
/*
{
    "type": "Document",
    "range": [
        0,
        32
    ],
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 2,
            "column": 17
        }
    },
    "children": [
        {
            "type": "Paragraph",
            "raw": "This is a text",
            "range": [
                0,
                14
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 14
                }
            },
            "children": [
                {
                    "type": "Str",
                    "raw": "This is a text",
                    "range": [
                        0,
                        14
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                }
            ]
        },
        {
            "type": "Break",
            "raw": "\n",
            "range": [
                14,
                15
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 14
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            }
        },
        {
            "type": "Paragraph",
            "raw": "Parse text to AST",
            "range": [
                15,
                32
            ],
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 17
                }
            },
            "children": [
                {
                    "type": "Str",
                    "raw": "Parse text to AST",
                    "range": [
                        15,
                        32
                    ],
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 0
                        },
                        "end": {
                            "line": 2,
                            "column": 17
                        }
                    }
                }
            ]
        }
    ]
}
*/
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
