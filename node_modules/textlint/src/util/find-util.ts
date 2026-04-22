// LICENSE : MIT
"use strict";
const pathToGlob = require("path-to-glob-pattern");
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const debug = require("debug")("textlint:find-util");
const DEFAULT_IGNORE_PATTERNS = Object.freeze(["**/.git/**", "**/node_modules/**"]);
export type FindFilesOptions = {
    cwd?: string;
    ignoreFilePath?: string;
};
const mapGitIgnorePatternTo = (base: string) => (ignore: string) => {
    if (ignore.startsWith("!")) {
        return "!" + path.posix.join(base, ignore.slice(1));
    }
    return path.posix.join(base, ignore);
};
const isFile = (filePath: string) => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (error) {
        return false;
    }
};
/**
 * filter files by config
 * @param {string[]} patterns glob patterns
 * @param {{extensions?: string[], cwd?: string }} options
 */
export function pathsToGlobPatterns(
    patterns: string[],
    options: { extensions?: string[]; cwd?: string } = {}
): string[] {
    const processPatterns = pathToGlob({
        extensions: options.extensions || [],
        cwd: options.cwd || process.cwd()
    });
    return patterns.map(processPatterns);
}
/**
 * found files by glob pattern
 * @param {string[]} patterns
 * @param {FindFilesOptions} options
 * @returns {string[]} file path list
 */
export function findFiles(patterns: string[], options: FindFilesOptions = {}): string[] {
    const cwd = options.cwd || process.cwd();
    const ignoredPatterns: string[] = [];
    ignoredPatterns.push(...DEFAULT_IGNORE_PATTERNS);
    if (options.ignoreFilePath) {
        const baseDir = path.resolve(cwd, path.dirname(options.ignoreFilePath));
        const normalizeIgnoreFilePath = path.resolve(cwd, options.ignoreFilePath);
        debug("findFiles ignore baseDir: %s, normalizeIgnoreFilePath: %s", baseDir, normalizeIgnoreFilePath);
        if (fs.existsSync(normalizeIgnoreFilePath)) {
            const ignored = fs
                .readFileSync(normalizeIgnoreFilePath, "utf-8")
                .split(/\r?\n/)
                .filter((line: string) => !/^\s*$/.test(line) && !/^\s*#/.test(line))
                .map(mapGitIgnorePatternTo(baseDir));
            debug("ignored: %o", ignored);
            ignoredPatterns.push(...ignored);
        }
    }
    debug("search patterns: %o", patterns);
    debug("search ignore patterns: %o", ignoredPatterns);
    const files: string[] = [];
    const addFile = (filePath: string) => {
        if (files.indexOf(filePath) === -1) {
            files.push(filePath);
        }
    };
    patterns.forEach((pattern) => {
        const file = path.resolve(cwd, pattern);
        if (isFile(file)) {
            addFile(fs.realpathSync(file));
        } else {
            glob.sync(pattern, {
                cwd,
                absolute: true,
                nodir: true,
                ignore: ignoredPatterns
            }).forEach((filePath: string) => {
                // workaround for windows
                // https://github.com/isaacs/node-glob/issues/74#issuecomment-31548810
                addFile(path.resolve(filePath));
            });
        }
    });
    return files;
}

/**
 * @param {string[]} files
 * @param {{extensions?: string[]}} [options]
 * @returns {{availableFiles: string[], unAvailableFiles: string[]}}
 */
export function separateByAvailability(
    files: string[],
    options: { extensions?: string[] } = {}
): { availableFiles: string[]; unAvailableFiles: string[] } {
    const extensions = options.extensions || [];
    const availableFiles: string[] = [];
    const unAvailableFiles: string[] = [];
    files.forEach((filePath) => {
        const extname = path.extname(filePath);
        if (extensions.indexOf(extname) === -1) {
            unAvailableFiles.push(filePath);
        } else {
            availableFiles.push(filePath);
        }
    });
    return {
        availableFiles,
        unAvailableFiles
    };
}
