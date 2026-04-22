/**
 * Load all rule modules from specified directory.
 * These are filtered by [extname]
 * @param {String} [rulesDir] Path to rules directory, may be relative. Defaults to `lib/rules`.
 * @param {String} [extname] extension name
 * @returns {Object} Loaded rule modules by rule ids (file names).
 */
export declare function loadFromDir(rulesDir: string, extname?: string): {
    [index: string]: any;
};
