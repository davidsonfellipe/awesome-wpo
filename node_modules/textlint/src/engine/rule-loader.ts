"use strict";
import { moduleInterop } from "@textlint/module-interop";
import * as fs from "fs";
import * as path from "path";

/**
 * Load all rule modules from specified directory.
 * These are filtered by [extname]
 * @param {String} [rulesDir] Path to rules directory, may be relative. Defaults to `lib/rules`.
 * @param {String} [extname] extension name
 * @returns {Object} Loaded rule modules by rule ids (file names).
 */
export function loadFromDir(rulesDir: string, extname: string = ".js"): { [index: string]: any } {
    let rulesDirAbsolutePath: string;
    if (!rulesDir) {
        rulesDirAbsolutePath = path.join(__dirname, "rules");
    } else {
        rulesDirAbsolutePath = path.resolve(process.cwd(), rulesDir);
    }
    const rules = Object.create(null);
    fs.readdirSync(rulesDirAbsolutePath).forEach((file: string) => {
        if (path.extname(file) !== extname) {
            return;
        }
        const withoutExt = path.basename(file, extname);
        rules[withoutExt] = moduleInterop(require(path.join(rulesDirAbsolutePath, file)));
    });
    return rules;
}
