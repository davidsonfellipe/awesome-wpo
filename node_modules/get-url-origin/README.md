# get-url-origin [![Build Status](https://travis-ci.org/azu/node-get-url-origin.svg?branch=master)](https://travis-ci.org/azu/node-get-url-origin)

Get origin from url string in Node.js.

This library based on Node.js's [Legacy URL API](https://nodejs.org/api/url.html#url_legacy_url_api "Legacy URL API")(`require('url').Url`)

If you can use Node.js >=7, please use New built-in [URL module](https://nodejs.org/api/url.html#url_url_origin).

## Install

Install with [npm](https://www.npmjs.com/):

    npm install get-url-origin

## Usage

### API

```ts
/**
 * Return URL origin string from `urlString`.
 * If origin is not found, return null
 * @param {string} urlString
 * @returns {string | null}
 * @see https://url.spec.whatwg.org/#origin
 */
export declare const getURLOrigin: (urlString: string) => string | null;
```

### Example

```ts
getURLOrigin('https://example.com/file/to/path?example'); // => 'https://example.com'
getURLOrigin('http://example.com:80/path/to/file'); // => 'http://example.com:80'
```

## Changelog

See [Releases page](https://github.com/azu/node-get-url-origin/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/node-get-url-origin/issues).

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
