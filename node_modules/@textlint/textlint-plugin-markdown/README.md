# @textlint/textlint-plugin-markdown

Markdown support for [textlint](https://github.com/textlint/textlint "textlint").

## Installation

    npm install @textlint/textlint-plugin-markdown

## Usage

Built-in support on textlint.
No need configuration.

------

Following config is set by default.

```
{
    "plugins": {
        "@textlint/markdown": true
    }
}
```

## Options

- `extensions`: `string[]`
    - Additional file extensions for markdown
    
For example, if you want to treat [MDX](https://github.com/mdx-js/mdx) as markdown, put following config to `.textlintrc`    

```json5
{
    "plugins": {
        "@textlint/markdown": {
            "extensions": [".mdx"]
        }
    }
}
```


## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
