// LICENSE : MIT
"use strict";

/* eslint-disable no-console */

/**
 * Logger Utils class
 * Use this instead of `console.log`
 * Main purpose for helping linting.
 */
export class Logger {
    static log(...message: any[]) {
        console.log(...message);
    }

    static warn(...message: any[]) {
        console.warn(...message);
    }

    static error(...message: any[]) {
        console.error(...message);
    }
}

/* eslint-enable no-console */
