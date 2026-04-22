/**
 * Logger Utils class
 * Use this instead of `console.log`
 * Main purpose for helping linting.
 */
export default class Logger {
    static log(...message: Array<any>): void;
    static warn(...message: Array<any>): void;
    static error(...message: Array<any>): void;
}
