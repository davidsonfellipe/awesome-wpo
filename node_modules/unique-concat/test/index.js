'use strict';
/*jshint asi: true */

var test = require('tape')
var concat = require('../')

test('\nconcating two empty arrays', function (t) {
  var res = concat([], [])
  t.deepEqual(res, [])
  t.end()
})

test('\nconcating first array empty', function (t) {
  var res = concat([], [ 1, 2 ])
  t.deepEqual(res, [ 1, 2 ])
  t.end()
})

test('\nconcating first array empty with non-unique values', function (t) {
  var res = concat([], [ 1, 2, 1 ])
  t.deepEqual(res, [ 1, 2 ])
  t.end()
})

test('\nconcating second array empty with non-unique values', function (t) {
  var res = concat([ 1, 2, 2 ], [ ])
  t.deepEqual(res, [ 1, 2 ])
  t.end()
})

test('\nconcating two non-empty arrays with unique values', function (t) {
  var res = concat([ 1, 2, 3 ], [ 4, 5, 6])
  t.deepEqual(res, [1, 2, 3, 4, 5, 6])
  t.end()
})

test('\nconcating two non-empty arrays with non-unique values', function (t) {
  var res = concat([ 1, 2, 3 ], [ 1, 2, 3, 4, 5, 6])
  t.deepEqual(res, [1, 2, 3, 4, 5, 6])
  t.end()
})

test('\nstrings: concating two non-empty arrays with non-unique values', function (t) {
  var res = concat([ '1', '2', '3' ], [ '1', '2', '3', '4', '5', '6'])
  t.deepEqual(res, ['1', '2', '3', '4', '5', '6'])
  t.end()
})

test('\nfloats: concating two non-empty arrays with non-unique values', function (t) {
  var res = concat([ 1.1, 2.1, 3.1 ], [ 1.1, 2.2, 3.1, 4, 5, 6])

  // FF seems to order these differently (by weird logic) than other browers, so we need to sort to make the test consistent
  res = res.sort(function (a, b) { return a < b ? -1 : 1 });

  t.deepEqual(res, [ '1.1', '2.1', '2.2', '3.1', '4', '5', '6' ])
  t.end()
})

test('\nobjects: concating two non-empty arrays with non-unique values', function (t) {
  var res = concat ([ { foo: true }, { bar: true} ], [ { foo: false }, { czar: true }])
  t.equal(res.length, 1, 'stores \'[object Object]\' and therefore has only one unique value')
  t.end()
})

test('\nargument validation', function (t) {
  t.throws(function () { concat(null, []) }, /two arrays/)
  t.throws(function () { concat(1, []) }, /First argument is not an array/)
  t.throws(function () { concat([], 2) }, /Second argument is not an array/)
  t.end()
})

test('\ncustom identity function', function (t) {
  var identity = function (obj) { return obj.a; }
  var res = concat([{ a: 1 }, { a: 2, b: 1}], [{ a: 2, b: 2 }, { a: 3 }], identity);
  t.deepEqual(res, [{ a: 1 }, { a: 2, b: 2 }, { a: 3 }], 'returns set of object with unique "a" property values')
  t.end()
})

test('\nnon-function passed as identity', function (t) {
  t.throws(function () { concat([1], [2], 'not a function') }, /Third argument should be a function/)
  t.end()
})
