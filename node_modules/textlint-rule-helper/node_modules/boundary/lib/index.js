"use strict";
/*
  Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearch = exports.upperBound = exports.lowerBound = exports.compare = void 0;
function compare(v1, v2) {
    return v1 < v2;
}
exports.compare = compare;
function upperBound(array, value, comp = compare) {
    let len = array.length;
    let i = 0;
    while (len) {
        let diff = len >>> 1;
        let cursor = i + diff;
        if (comp(value, array[cursor])) {
            len = diff;
        }
        else {
            i = cursor + 1;
            len -= diff + 1;
        }
    }
    return i;
}
exports.upperBound = upperBound;
function lowerBound(array, value, comp = compare) {
    let len = array.length;
    let i = 0;
    while (len) {
        let diff = len >>> 1;
        let cursor = i + diff;
        if (comp(array[cursor], value)) {
            i = cursor + 1;
            len -= diff + 1;
        }
        else {
            len = diff;
        }
    }
    return i;
}
exports.lowerBound = lowerBound;
function binarySearch(array, value, comp = compare) {
    let cursor = lowerBound(array, value, comp);
    return cursor !== array.length && !comp(value, array[cursor]);
}
exports.binarySearch = binarySearch;
/* vim: set sw=4 ts=4 et tw=80 : */
//# sourceMappingURL=index.js.map