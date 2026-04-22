# unique-concat [![build status](https://secure.travis-ci.org/thlorenz/unique-concat.png)](http://travis-ci.org/thlorenz/unique-concat)

[![testling badge](https://ci.testling.com/thlorenz/unique-concat.png)](https://ci.testling.com/thlorenz/unique-concat)

Concatenates two arrays, removing duplicates in the process and returns one array with unique values.

```js
var concat = require('unique-concat');
var res = concat([ 1, 2, 3 ], [ 1, 2, 3, 4, 5, 6])
console.log(res);
// => [1, 2, 3, 4, 5, 6]
```

## Installation

    npm install unique-concat

## API

###*function uniqueConcat(arr1, arr2[, identity])*
```
/**
 * Concatenates two arrays, removing duplicates in the process and returns one array with unique values.
 * In case the elements in the array don't have a proper built in way to determine their identity,
 * a custom identity function must be provided.
 *
 * As an example, {Object}s all return '[ 'object' ]' when .toString()ed and therefore require a custom
 * identity function.
 *
 * @name exports
 * @function unique-concat
 * @param arr1 {Array} first batch of elements
 * @param arr2 {Array} second batch of elements
 * @param identity {Function} (optional) supply an alternative way to get an element's identity
 */
```

## Identity function example

```js
var identity = function (obj) { return obj.a; }
var res = concat([{ a: 1 }, { a: 2, b: 1}], [{ a: 2, b: 2 }, { a: 3 }], identity);
console.log(res);
// => [ { a: 1 }, { a: 2, b: 2 }, { a: 3 } ]
```

For more examples see [tests](https://github.com/thlorenz/unique-concat/blob/master/test/index.js)

## License

MIT
