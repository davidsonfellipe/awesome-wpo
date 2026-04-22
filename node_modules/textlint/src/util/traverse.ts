/**
 * @fileoverview Simple directory traversal logic.
 * @author Nicholas C. Zakas
 */
"use strict";
import fs from "fs";
import path from "path";
import debug0 from "debug";
const debug = debug0("textlint:traverse");
/**
 * Walks a path recursively calling the callback on each file.
 * @param {string} name The file or directory path.
 * @param {string[]} extensions The file extensions that should cause the callback
 *      to be called.
 * @param {Function} [exclude] The function to check if file/path should be excluded.
 * @param {Function} callback The function to call on each file.
 * @returns {void}
 * @private
 */
function walk(name: string, extensions: string[], exclude: Function, callback: Function): void {
    const stat = fs.statSync(name);
    /**
     * @param {string} dir
     * @param {string[]} stack
     */
    function traverse(dir: string, stack: string[]) {
        stack.push(dir);
        fs.readdirSync(path.join(...stack)).forEach((file: string) => {
            // skip all hidden things (dirs, files, links)
            if (file[0] === ".") {
                return;
            }
            const filePath = path.join(...stack.concat([file]));
            const fileStat = fs.statSync(filePath);
            // if this file or directory is excluded from linting, skip over it.
            if (exclude && exclude(filePath)) {
                debug(`Ignoring ${filePath}`);
                return;
            }
            // only call callback for files with correct extensions
            if (fileStat.isFile() && extensions.indexOf(path.extname(filePath)) > -1) {
                callback(filePath);
            } else if (fileStat.isDirectory()) {
                traverse(file, stack);
            }
        });
        stack.pop();
    }
    const basename = path.basename(name);
    // don't ignore cases like 'textlint ./'
    if ((basename !== "." && basename !== ".." && basename[0] === ".") || (exclude && exclude(name))) {
        debug(`Ignoring ${name}`);
        return;
    }
    // always call callback for any files that are passed on the command line
    if (stat.isFile()) {
        if (extensions.indexOf(path.extname(name)) > -1) {
            callback(name);
        }
    } else {
        traverse(name, []);
    }
}
/**
 * Traverses multiple directories and calls a callback on each file.
 * @param {{files:string[], exclude:Function, extensions:string[]}} options The option for the traversal.
 * param {string[]} options.files An array of file and directory paths to traverse.
 * param {Function} options.exclude The function to check if file/path should be excluded.
 * @param {Function} callback A function to call for each file.
 * @returns {void}
 */
module.exports = function traverse(
    options: { files: string[]; exclude: Function; extensions: string[] },
    callback: Function
): void {
    const files = options.files;
    const exclude = options.exclude;
    const extensions = options.extensions;
    files.forEach((file) => {
        walk(file, extensions, exclude, callback);
    });
};
