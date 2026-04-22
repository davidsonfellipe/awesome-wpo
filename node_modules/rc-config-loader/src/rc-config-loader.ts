// MIT © 2017 azu
// MIT © Zoltan Kochan
// Original https://github.com/zkochan/rcfile
import path from "path";
import fs from "fs";

const debug = require("debug")("rc-config-loader");
const requireFromString = require("require-from-string");
const JSON5 = require("json5");

const defaultLoaderByExt = {
    ".js": loadJSConfigFile,
    ".json": loadJSONConfigFile,
    ".yaml": loadYAMLConfigFile,
    ".yml": loadYAMLConfigFile
};

const defaultOptions = {
    // does look for `package.json`
    packageJSON: false,
    // treat default(no ext file) as some extension
    defaultExtension: [".json", ".yaml", ".yml", ".js"],
    cwd: process.cwd()
};

export interface rcConfigLoaderOption {
    // does look for `package.json`
    packageJSON?:
        | boolean
        | {
              fieldName: string;
          };
    // if config file name is not same with packageName, set the name
    configFileName?: string;
    // treat default(no ext file) as some extension
    defaultExtension?: string | string[];
    // where start to load
    cwd?: string;
}

type Loader = <R extends object>(fileName: string, suppress: boolean) => R;

const selectLoader = (defaultLoaderByExt: { [index: string]: Loader }, extension: string) => {
    if (![".json", ".yaml", ".yml", ".js"].includes(extension)) {
        throw new Error(`${extension} is not supported.`);
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
export function rcFile<R extends {}>(
    pkgName: string,
    opts: rcConfigLoaderOption = {}
):
    | {
          config: R;
          filePath: string;
      }
    | undefined {
    // path/to/config or basename of config file.
    const configFileName = opts.configFileName || `.${pkgName}rc`;
    const defaultExtension = opts.defaultExtension || defaultOptions.defaultExtension;
    const cwd = opts.cwd || defaultOptions.cwd;
    const packageJSON = opts.packageJSON || defaultOptions.packageJSON;
    const packageJSONFieldName = typeof packageJSON === "object" ? packageJSON.fieldName : pkgName;

    const parts = splitPath(cwd);
    const loadersByOrder = Array.isArray(defaultExtension)
        ? defaultExtension.map(extension => selectLoader(defaultLoaderByExt, extension))
        : selectLoader(defaultLoaderByExt, defaultExtension);

    const loaderByExt = Object.assign({}, defaultLoaderByExt, {
        "": loadersByOrder
    });
    return findConfig<R>({
        parts,
        loaderByExt,
        loadersByOrder,
        configFileName,
        packageJSON,
        packageJSONFieldName
    });
}

/**
 *
 * @returns {{
 *  config: string,
 *  filePath: string
 * }}
 */
function findConfig<R extends {}>({
    parts,
    loaderByExt,
    loadersByOrder,
    configFileName,
    packageJSON,
    packageJSONFieldName
}: {
    parts: string[];
    loaderByExt: {
        [index: string]: Loader;
    };
    loadersByOrder: Loader | Loader[];
    configFileName: string;
    packageJSON: boolean | { fieldName: string };
    packageJSONFieldName: string;
}):
    | {
          config: R;
          filePath: string;
      }
    | undefined {
    const extensions = Object.keys(loaderByExt);
    while (extensions.length) {
        const ext = extensions.shift();
        // may be ext is "". if it .<product>rc
        const configLocation = join(parts, configFileName + ext);
        if (!fs.existsSync(configLocation)) {
            continue;
        }
        // if ext === ""(empty string):, use ordered loaders
        const loaders = ext ? loaderByExt[ext] : loadersByOrder;
        if (!Array.isArray(loaders)) {
            const loader = loaders;
            const result = loader<R>(configLocation, false);
            if (!result) {
                continue;
            }
            return {
                config: result,
                filePath: configLocation
            };
        }
        for (let i = 0; i < loaders.length; i++) {
            const loader = loaders[i];
            const result = loader<R>(configLocation, true);
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
        const pkgJSONLoc = join(parts, "package.json");
        if (fs.existsSync(pkgJSONLoc)) {
            const pkgJSON = require(pkgJSONLoc);
            if (pkgJSON[packageJSONFieldName]) {
                return {
                    config: pkgJSON[packageJSONFieldName],
                    filePath: pkgJSONLoc
                };
            }
        }
    }
    if (parts.pop()) {
        return findConfig({ parts, loaderByExt, loadersByOrder, configFileName, packageJSON, packageJSONFieldName });
    }
    return;
}

function splitPath(x: string): string[] {
    return path.resolve(x || "").split(path.sep);
}

function join(parts: string[], filename: string) {
    return path.resolve(parts.join(path.sep) + path.sep, filename);
}

function loadJSConfigFile(filePath: string, suppress: boolean) {
    debug(`Loading JavaScript config file: ${filePath}`);
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        return requireFromString(content, filePath);
    } catch (error) {
        debug(`Error reading JavaScript file: ${filePath}`);
        if (!suppress) {
            error.message = `Cannot read config file: ${filePath}\nError: ${error.message}`;
            throw error;
        }
    }
}

function loadJSONConfigFile(filePath: string, suppress: boolean) {
    debug(`Loading JSON config file: ${filePath}`);

    try {
        return JSON5.parse(readFile(filePath));
    } catch (error) {
        debug(`Error reading JSON file: ${filePath}`);
        if (!suppress) {
            error.message = `Cannot read config file: ${filePath}\nError: ${error.message}`;
            throw error;
        }
    }
}

function readFile(filePath: string) {
    return fs.readFileSync(filePath, "utf8");
}

function loadYAMLConfigFile(filePath: string, suppress: boolean) {
    debug(`Loading YAML config file: ${filePath}`);

    // lazy load YAML to improve performance when not used
    const yaml = require("js-yaml");

    try {
        // empty YAML file can be null, so always use
        return yaml.safeLoad(readFile(filePath)) || {};
    } catch (error) {
        debug(`Error reading YAML file: ${filePath}`);
        if (!suppress) {
            error.message = `Cannot read config file: ${filePath}\nError: ${error.message}`;
            throw error;
        }
    }
}
