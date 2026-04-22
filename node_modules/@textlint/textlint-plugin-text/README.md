# @textlint/textlint-plugin-text

Plain text plugin for [textlint](https://github.com/textlint/textlint "textlint").

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint/textlint-plugin-text

## Usage

This plugin is built-in in textlint.
No need configuration.

------

Following config is set by default.

```
{
    "plugins": {
        "@textlint/text": true
    }
}
```

## Options

- `extensions`: `string[]`
    - Additional file extensions for plain text
    
For example, if you want to treat `.custom-ext` as text, put following config to `.textlintrc`    

```json5
{
    "plugins": {
        "@textlint/text": {
            "extensions": [".custom-ext"]
        }
    }
}
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
