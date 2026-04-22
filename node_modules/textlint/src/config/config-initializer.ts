// LICENSE : MIT
"use strict";
import { TextlintPackageNamePrefix } from "@textlint/utils";

const fs = require("fs");
const path = require("path");
const isFile = require("is-file");
const readPkg = require("read-pkg");
import { Config } from "./config";
import { Logger } from "../util/logger";

/**
 * read package.json if found it
 * @param {string} dir
 * @returns {Promise.<Array.<String>>}
 */
const getTextlintDependencyNames = (dir: string): Promise<Array<string>> => {
    return readPkg(dir)
        .then((pkg: any) => {
            const dependencies = pkg.dependencies || {};
            const devDependencies = pkg.devDependencies || {};
            const mergedDependencies = Object.assign({}, dependencies, devDependencies);
            const pkgNames = Object.keys(mergedDependencies);
            return pkgNames.filter((pkgName) => {
                const ruleOrFilter =
                    pkgName.indexOf(TextlintPackageNamePrefix.filterRule) !== -1 ||
                    pkgName.indexOf(TextlintPackageNamePrefix.rule) !== -1;
                if (pkgName === "textlint-rule-helper") {
                    return false;
                }
                return ruleOrFilter;
            });
        })
        .catch(() => {
            return [];
        });
};

/**
 * create object that fill with `defaultValue`
 * @param {Array} array
 * @param {*} defaultValue
 * @returns {Object}
 */
const arrayToObject = (array: Array<any>, defaultValue: any): object => {
    const object: { [index: string]: string } = {};
    array.forEach((item) => {
        object[item] = defaultValue;
    });
    return object;
};

export interface CreateConfigFileOption {
    // create .textlint in the `dir`
    dir: string;
    // display log message if it is `true`
    verbose: boolean;
}

/**
 * Create .textlintrc file
 * @params {string} dir The directory of .textlintrc file
 * @returns {Promise.<number>} The exit code for the operation.
 */
export const createConfigFile = (options: CreateConfigFileOption) => {
    const dir = options.dir;
    return getTextlintDependencyNames(dir).then((pkgNames) => {
        const rcFile = `.${Config.CONFIG_FILE_NAME}rc`;
        const filePath = path.resolve(dir, rcFile);
        if (isFile(filePath)) {
            Logger.error(`${rcFile} is already existed.`);
            return Promise.resolve(1);
        }
        const filters = pkgNames
            .filter((pkgName) => {
                return pkgName.indexOf(TextlintPackageNamePrefix.filterRule) !== -1;
            })
            .map((filterName) => {
                return filterName.replace(TextlintPackageNamePrefix.filterRule, "");
            });
        const rules = pkgNames
            .filter((pkgName) => {
                return pkgName.indexOf(TextlintPackageNamePrefix.rule) !== -1;
            })
            .map((filterName) => {
                return filterName.replace(TextlintPackageNamePrefix.rule, "");
            });
        const defaultTextlintRc = {
            filters: arrayToObject(filters, true),
            rules: arrayToObject(rules, true)
        };
        const output = JSON.stringify(defaultTextlintRc, null, 2);
        fs.writeFileSync(filePath, output);
        if (options.verbose) {
            Logger.log(`${rcFile} is created.`);
        }
        return Promise.resolve(0);
    });
};
