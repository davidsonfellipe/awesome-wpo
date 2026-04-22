# @textlint/module-interop

ECMAScript module interop library.

import `.default` from ES module or CommonJS module.

`example.mjs`
```ts
const value = 42;

export default value;
```

```ts
import {moduleInterop} from "@textlint/module-interop";

// Doesn't matter if `require` uses `module.exports` or ES Module `export`
const value = moduleInterop(require("./example"));
console.log(value);  // 42
```

**Notes**: This library is for common use. 
This library is not depended on textlint.

## Why it is needed?

Some rule modules use `export default`.

If you creating rule preset for textlint, you should wrap the required result.

```js
const rule = require("textlint-rule-es-export-default-example");
console.log(rule); // { default: ruleImplantation } 
```

This library resolve this issue by `moduleInterop` function.

```js
const {moduleInterop} = require("@textlint/module-interop");
const rule = moduleInterop(require("textlint-rule-es-export-default-example"));
console.log(rule); // ruleImplantation
``````

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint/module-interop

## Usage

```ts
const {moduleInterop} = require("@textlint/module-interop");
const rule = moduleInterop(require("textlint-rule-example")); // rule implementation
```

## Related

- [leebenson/module-interop: ES6 module interop](https://github.com/leebenson/module-interop)
    - Same purpose, but it has different API
- [izaakschroeder/interop-require: Require babel ES6 modules from node land.](https://github.com/izaakschroeder/interop-require)
    - Same function, but it prevent static analyzer
    - It is just dynamic `require` that prevent static analyzer like [Asset Relocator Loader for Webpack](https://github.com/zeit/webpack-asset-relocator-loader).

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

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
