# @textlint/feature-flag

textlint internal feature flag manager.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint/feature-flag

## Usage

```js
import { coreFlags, isFeatureEnabled, setFeature } from "@textlint/feature-flag";
// core flag
assert.ok(coreFlags.runningCLI === false);
assert.ok(coreFlags.runningTester === false); // default loose
coreFlags.runningCLI = true;
coreFlags.runningTester = true;
coreFlags.experimental = true;
assert.ok(coreFlags.runningCLI === true);
assert.ok(coreFlags.runningTester === true);
assert.ok(coreFlags.experimental === true);
// feature-flag
try{
    isFeatureEnabled("test")
}catch(error){
    // default strict
}
setFeature("test", true);
assert.ok(isFeatureEnabled("test") === true);

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
