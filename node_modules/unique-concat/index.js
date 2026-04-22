'use strict';

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
var go = module.exports = function uniqueConcat(arr1, arr2, identity) {

  if (!arr1 || !arr2) throw new Error('Need two arrays to merge');
  if (!Array.isArray(arr1)) throw new Error('First argument is not an array, but a ' + typeof arr1);
  if (!Array.isArray(arr2)) throw new Error('Second argument is not an array, but a ' + typeof arr2);
  if (identity && typeof identity !== 'function') throw new Error('Third argument should be a function');

  function hashify(acc, k) {
    acc[identity ? identity(k) : k] = k;
    return acc;
  }

  var arr1Hash = arr1.reduce(hashify, {});
  var mergedHash = arr2.reduce(hashify, arr1Hash);

  return Object.keys(mergedHash).map(function (key) { return mergedHash[key]; });
};
