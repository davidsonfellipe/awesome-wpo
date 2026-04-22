/**
 * Logger Utils class
 * Use this instead of `console.log`
 * Main purpose for helping linting.
 */
export declare class Logger {
    static log(...message: any[]): void;
    static warn(...message: any[]): void;
    static error(...message: any[]): void;
}
