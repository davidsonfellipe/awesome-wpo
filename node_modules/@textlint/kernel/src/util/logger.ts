// LICENSE : MIT
"use strict";

/* eslint-disable no-console */

/**
 * Logger Utils class
 * Use this instead of `console.log`
 * Main purpose for helping linting.
 */
export default class Logger {
    static log(...message: Array<any>) {
        console.log(...message);
    }

    static warn(...message: Array<any>) {
        console.warn(...message);
    }

    static error(...message: Array<any>) {
        console.error(...message);
    }
}

/* eslint-enable no-console */
