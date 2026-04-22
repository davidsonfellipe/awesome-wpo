"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// MIT © 2017 azu
// MIT © Zoltan Kochan
// Original https://github.com/zkochan/rcfile
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var debug = require("debug")("rc-config-loader");
var requireFromString = require("require-from-string");
var JSON5 = require("json5");
var defaultLoaderByExt = {
    ".js": loadJSConfigFile,
    ".json": loadJSONConfigFile,
    ".yaml": loadYAMLConfigFile,
    ".yml": loadYAMLConfigFile
};
var defaultOptions = {
    // does look for `package.json`
    packageJSON: false,
    // treat default(no ext file) as some extension
    defaultExtension: [".json", ".yaml", ".yml", ".js"],
    cwd: process.cwd()
};
var selectLoader = function (defaultLoaderByExt, extension) {
    if (![".json", ".yaml", ".yml", ".js"].includes(extension)) {
        throw new Error(extension + " is not supported.");
    }
    return defaultLoaderByExt[extension];
};
/**
 * Find and load rcfile, return { config, filePath }
 * If not found any rcfile, throw an Error.
 * @param {string} pkgName
 * @param {rcConfigLoaderOption} [opts]
 * @returns {{ config: Object, filePath:string } | undefined}
 */
function rcFile(pkgName, opts) {
    if (opts === void 0) { opts = {}; }
    // path/to/config or basename of config file.
    var configFileName = opts.configFileName || "." + pkgName + "rc";
    var defaultExtension = opts.defaultExtension || defaultOptions.defaultExtension;
    var cwd = opts.cwd || defaultOptions.cwd;
    var packageJSON = opts.packageJSON || defaultOptions.packageJSON;
    var packageJSONFieldName = typeof packageJSON === "object" ? packageJSON.fieldName : pkgName;
    var parts = splitPath(cwd);
    var loadersByOrder = Array.isArray(defaultExtension)
        ? defaultExtension.map(function (extension) { return selectLoader(defaultLoaderByExt, extension); })
        : selectLoader(defaultLoaderByExt, defaultExtension);
    var loaderByExt = Object.assign({}, defaultLoaderByExt, {
        "": loadersByOrder
    });
    return findConfig({
        parts: parts,
        loaderByExt: loaderByExt,
        loadersByOrder: loadersByOrder,
        configFileName: configFileName,
        packageJSON: packageJSON,
        packageJSONFieldName: packageJSONFieldName
    });
}
exports.rcFile = rcFile;
/**
 *
 * @returns {{
 *  config: string,
 *  filePath: string
 * }}
 */
function findConfig(_a) {
    var parts = _a.parts, loaderByExt = _a.loaderByExt, loadersByOrder = _a.loadersByOrder, configFileName = _a.configFileName, packageJSON = _a.packageJSON, packageJSONFieldName = _a.packageJSONFieldName;
    var extensions = Object.keys(loaderByExt);
    while (extensions.length) {
        var ext = extensions.shift();
        // may be ext is "". if it .<product>rc
        var configLocation = join(parts, configFileName + ext);
        if (!fs_1.default.existsSync(configLocation)) {
            continue;
        }
        // if ext === ""(empty string):, use ordered loaders
        var loaders = ext ? loaderByExt[ext] : loadersByOrder;
        if (!Array.isArray(loaders)) {
            var loader = loaders;
            var result = loader(configLocation, false);
            if (!result) {
                continue;
            }
            return {
                config: result,
                filePath: configLocation
            };
        }
        for (var i = 0; i < loaders.length; i++) {
            var loader = loaders[i];
            var result = loader(configLocation, true);
            if (!result) {
                continue;
            }
            return {
                config: result,
                filePath: configLocation
            };
        }
    }
    if (packageJSON) {
        var pkgJSONLoc = join(parts, "package.json");
        if (fs_1.default.existsSync(pkgJSONLoc)) {
            var pkgJSON = require(pkgJSONLoc);
            if (pkgJSON[packageJSONFieldName]) {
                return {
                    config: pkgJSON[packageJSONFieldName],
                    filePath: pkgJSONLoc
                };
            }
        }
    }
    if (parts.pop()) {
        return findConfig({ parts: parts, loaderByExt: loaderByExt, loadersByOrder: loadersByOrder, configFileName: configFileName, packageJSON: packageJSON, packageJSONFieldName: packageJSONFieldName });
    }
    return;
}
function splitPath(x) {
    return path_1.default.resolve(x || "").split(path_1.default.sep);
}
function join(parts, filename) {
    return path_1.default.resolve(parts.join(path_1.default.sep) + path_1.default.sep, filename);
}
function loadJSConfigFile(filePath, suppress) {
    debug("Loading JavaScript config file: " + filePath);
    try {
        var content = fs_1.default.readFileSync(filePath, "utf-8");
        return requireFromString(content, filePath);
    }
    catch (error) {
        debug("Error reading JavaScript file: " + filePath);
        if (!suppress) {
            error.message = "Cannot read config file: " + filePath + "\nError: " + error.message;
            throw error;
        }
    }
}
function loadJSONConfigFile(filePath, suppress) {
    debug("Loading JSON config file: " + filePath);
    try {
        return JSON5.parse(readFile(filePath));
    }
    catch (error) {
        debug("Error reading JSON file: " + filePath);
        if (!suppress) {
            error.message = "Cannot read config file: " + filePath + "\nError: " + error.message;
            throw error;
        }
    }
}
function readFile(filePath) {
    return fs_1.default.readFileSync(filePath, "utf8");
}
function loadYAMLConfigFile(filePath, suppress) {
    debug("Loading YAML config file: " + filePath);
    // lazy load YAML to improve performance when not used
    var yaml = require("js-yaml");
    try {
        // empty YAML file can be null, so always use
        return yaml.safeLoad(readFile(filePath)) || {};
    }
    catch (error) {
        debug("Error reading YAML file: " + filePath);
        if (!suppress) {
            error.message = "Cannot read config file: " + filePath + "\nError: " + error.message;
            throw error;
        }
    }
}
//# sourceMappingURL=rc-config-loader.js.map