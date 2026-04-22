# p-memoize [![Build Status](https://travis-ci.org/sindresorhus/p-memoize.svg?branch=master)](https://travis-ci.org/sindresorhus/p-memoize)

> [Memoize](https://en.wikipedia.org/wiki/Memoization) promise-returning & async functions

Useful for speeding up consecutive function calls by caching the result of calls with identical input.


## Install

```
$ npm install p-memoize
```


## Usage

```js
const pMemoize = require('p-memoize');
const got = require('got');

const memGot = pMemoize(got, {maxAge: 1000});

(async () => {
	memGot('sindresorhus.com');

	// This call is cached
	memGot('sindresorhus.com');

	setTimeout(() => {
		// This call is not cached as the cache has expired
		memGot('sindresorhus.com');
	}, 2000);
})();
```


## API

### pMemoize(fn, [options])

Returns a memoized version of the `fn` function.

#### fn

Type: `Function`

Promise-returning or async function to be memoized.

#### options

Type: `Object`

See the [`mem` options](https://github.com/sindresorhus/mem#options).

### pMemoize.clear(memoized)

Clear all cached data of a memoized function.

Will throw if passed a non-memoized function.


## Related

- [p-debounce](https://github.com/sindresorhus/p-debounce) - Debounce promise-returning & async functions
- [p-throttle](https://github.com/sindresorhus/p-throttle) - Throttle promise-returning & async functions
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
