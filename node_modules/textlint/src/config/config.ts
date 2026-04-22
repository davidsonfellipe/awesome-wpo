// LICENSE : MIT
"use strict";
import crypto from "crypto";
import { loadConfig } from "./config-loader";
import { createFlatRulesConfigFromRawRulesConfig, loadRulesConfigFromPresets } from "./preset-loader";
import { getPluginConfig, getPluginNames } from "./plugin-loader";
import { TextLintModuleResolver } from "../engine/textlint-module-resolver";
import { separateEnabledOrDisabled } from "./separate-by-config-option";
import {
    normalizeTextlintFilterRuleKey,
    normalizeTextlintPluginKey,
    normalizeTextlintRuleKey,
    normalizeTextlintRulePresetKey
} from "@textlint/utils";
import { Logger } from "../util/logger";

const md5 = require("md5");
const fs = require("fs");
const assert = require("assert");
const concat = require("unique-concat");
const path = require("path");
const pkgConf = require("read-pkg-up");

function applyNormalizerToList(normalizer: (name: string) => string, names: string[]) {
    return names.map((name) => {
        return normalizer(name);
    });
}

function applyNormalizerToConfig(normalizer: (name: string) => string, config: { [index: string]: string }) {
    return Object.keys(config).reduce((results, key) => {
        const shortPluginName = normalizer(key);
        results[shortPluginName] = config[key];
        return results;
    }, {} as { [index: string]: any });
}

/**
 * @type {TextlintConfig}
 */
const defaultOptions = Object.freeze({
    // rule package names
    rules: [],
    // disabled rule package names
    // always should start with empty
    disabledRules: [],
    // rules config object
    rulesConfig: {},
    // filter rule package names
    filterRules: [],
    disabledFilterRules: [],
    // rules config object
    filterRulesConfig: {},
    // preset package names
    // e.g.) ["preset-foo"]
    presets: [],
    // plugin package names
    plugins: [],
    // plugin config
    pluginsConfig: {},
    // base directory for loading {rule, config, plugin} modules
    rulesBaseDirectory: undefined,
    // ".textlint" file path
    configFile: undefined,
    // rule directories
    rulePaths: [],
    // formatter file name
    // e.g.) stylish.js => set "stylish"
    // NOTE: default formatter is defined in Engine,
    // because There is difference between TextLintEngine and TextFixEngine.
    formatterName: undefined,
    // --quiet
    quiet: false,
    // --no-color
    color: true,
    // --no-textlintrc
    textlintrc: true,
    // --cache : enable or disable
    cache: false,
    // --cache-location: cache file path
    cacheLocation: path.resolve(process.cwd(), ".textlintcache"),
    // --ignore-path: ".textlintignore" file path
    ignoreFile: path.resolve(process.cwd(), ".textlintignore")
});

export interface ConfigStatics {
    CONFIG_PACKAGE_PREFIX: string;
    FILTER_RULE_NAME_PREFIX: string;
    RULE_NAME_PREFIX: string;
    RULE_PRESET_NAME_PREFIX: string;
    PLUGIN_NAME_PREFIX: string;
}

export interface ConfigAutoLoadingOptions {
    // rule package names
    rules?: string[];
    // disabled rule package names
    // always should start with empty
    disabledRules?: string[];
    // rules config object
    rulesConfig?: { [index: string]: boolean | {} };
    filterRules?: string[];
    disabledFilterRules?: string[];
    filterRulesConfig?: { [index: string]: boolean | {} };
    // preset package names
    // e.g.) ["preset-foo"]
    presets?: string[];
    // plugin package names
    plugins?: string[];
    // plugin config
    pluginsConfig?: { [index: string]: boolean | {} };
    // base directory for loading {rule, config, plugin} modules
    rulesBaseDirectory?: string;
    // ".textlint" file path
    configFile?: string;
    // rule directories
    rulePaths?: string[];
    // formatter file name
    // e.g.) stylish.js => set "stylish"
    // NOTE: default formatter is defined in Engine,
    // because There is difference between TextLintEngine and TextFixEngine.
    formatterName?: string;
    // --quiet
    quiet?: boolean;
    // --no-color
    color?: boolean;
    // --no-textlintrc
    textlintrc?: boolean;
    // --cache : enable or disable
    cache?: boolean;
    // --cache-location: cache file path
    cacheLocation?: string;
    // FIXME: current working dir
    // It does not cover all working dir
    cwd?: string;
    // ".textlintignore" file path
    ignoreFile?: string | undefined;
}

// Priority: CLI > Code options > config file
export class Config {
    rules: any;
    rulesBaseDirectory: string | undefined;
    configFile: string | undefined;
    disabledRules: string[];
    filterRules: string[];
    disabledFilterRules: string[];
    presets: string[];
    plugins: string[];
    pluginsConfig: { [index: string]: any };
    rulesConfig: { [index: string]: any };
    filterRulesConfig: { [index: string]: any };
    rulePaths: string[];
    formatterName: string | undefined;
    quiet: boolean;
    color: boolean;
    cache: boolean;
    cacheLocation: string;
    ignoreFile: string | undefined;

    /**
     * @return {string} rc config filename
     * it's name use as `.<name>rc`
     */
    static get CONFIG_FILE_NAME() {
        return "textlint";
    }

    /**
     * Create config object form command line options
     * See options.js
     * @param {object} cliOptions the options is command line option object. @see options.js
     * @returns {Config}
     */
    static initWithCLIOptions(cliOptions: any) {
        const options: { [index: string]: any } = {};
        options.rules = cliOptions.rule ? cliOptions.rule : defaultOptions.rules;
        // TODO: CLI --filter <rule>?
        options.filterRules = defaultOptions.filterRules;
        options.disabledFilterRules = defaultOptions.disabledFilterRules;
        // TODO: CLI --disable <rule>?
        options.disabledRules = defaultOptions.disabledRules;
        options.presets = cliOptions.preset ? cliOptions.preset : defaultOptions.presets;
        options.plugins = cliOptions.plugin ? cliOptions.plugin : defaultOptions.plugins;
        options.configFile = cliOptions.config ? cliOptions.config : defaultOptions.configFile;
        options.rulePaths = cliOptions.rulesdir ? cliOptions.rulesdir : defaultOptions.rulePaths;
        options.formatterName = cliOptions.format ? cliOptions.format : defaultOptions.formatterName;
        options.quiet = cliOptions.quiet !== undefined ? cliOptions.quiet : defaultOptions.quiet;
        options.color = cliOptions.color !== undefined ? cliOptions.color : defaultOptions.color;
        // --no-textlintrc: disable textlint
        options.textlintrc = cliOptions.textlintrc !== undefined ? cliOptions.textlintrc : defaultOptions.textlintrc;
        // --cache
        options.cache = cliOptions.cache !== undefined ? cliOptions.cache : defaultOptions.cache;
        // --cache-location="path/to/file"
        options.cacheLocation =
            cliOptions.cacheLocation !== undefined
                ? path.resolve(process.cwd(), cliOptions.cacheLocation)
                : defaultOptions.cacheLocation;
        // --rules-base-directory "other/node_modules"
        options.rulesBaseDirectory = cliOptions.rulesBaseDirectory || defaultOptions.rulesBaseDirectory;
        // --ignore-path="path/to/file"
        options.ignoreFile =
            cliOptions.ignorePath !== undefined
                ? path.resolve(process.cwd(), cliOptions.ignorePath)
                : defaultOptions.ignoreFile;
        return this.initWithAutoLoading(options);
    }

    /* eslint-disable complexity */
    /**
     * load config and merge options.
     * These config is user defined options.
     * These config is prefer than preset packages's config that is defined by package author.
     * @param options
     */
    static initWithAutoLoading(options: ConfigAutoLoadingOptions = {}) {
        // Base directory
        const rulesBaseDirectory = options.rulesBaseDirectory
            ? options.rulesBaseDirectory
            : defaultOptions.rulesBaseDirectory;
        // Create resolver
        const moduleResolver = new TextLintModuleResolver({
            rulesBaseDirectory
        });
        // => ConfigFile
        // configFile is optional
        // => load .textlintrc
        const loadedResult =
            typeof options.textlintrc === "undefined" || options.textlintrc
                ? loadConfig({
                      configFileName: this.CONFIG_FILE_NAME,
                      configFilePath: options.configFile,
                      moduleResolver,
                      cwd: options.cwd
                  })
                : {
                      config: {},
                      filePath: undefined
                  };
        const configFileRaw = loadedResult.config;
        const configFilePath = loadedResult.filePath;
        // => Load options from .textlintrc
        const configRuleNamesObject = separateEnabledOrDisabled(configFileRaw.rules);
        const configFilterRuleNamesObject = separateEnabledOrDisabled(configFileRaw.filters);
        const configPresetNames = configRuleNamesObject.presetNames;
        const configFilePlugins = getPluginNames(configFileRaw);
        const configFilePluginConfig = getPluginConfig(configFileRaw);
        // Notes: vs. loadRulesConfigFromPresets
        // loadRulesConfigFromPresets load rules config from **preset package**. (It is not user defined config. It is defined by package author)
        // In other hands, this line load rules config from .textlintrc. (It is user defined config)
        const configFileRulesConfig = createFlatRulesConfigFromRawRulesConfig(configFileRaw.rules);
        const configFileFilterRulesConfig = createFlatRulesConfigFromRawRulesConfig(configFileRaw.filters);
        // => User specified Options
        const optionRules = options.rules || [];
        const optionFilterRules = options.filterRules || [];
        const optionDisabledRules = options.disabledRules || [];
        const optionDisabledFilterRules = options.disabledFilterRules || [];
        const optionRulesConfig = options.rulesConfig || {};
        const optionFilterRulesConfig = options.filterRulesConfig || {};
        const optionPlugins = options.plugins || [];
        const optionPresets = options.presets || [];
        const optionPluginsConfig = options.pluginsConfig || {};
        // => Merge options and configFileOptions
        // Priority options > configFile
        const rules = concat(optionRules, configRuleNamesObject.enabledRuleNames);
        const disabledRules = concat(optionDisabledRules, configRuleNamesObject.disabledRuleNames);
        const filterRules = concat(optionFilterRules, configFilterRuleNamesObject.enabledRuleNames);
        const disabledFilterRules = concat(optionDisabledFilterRules, configFilterRuleNamesObject.disabledRuleNames);
        const rulesConfig = Object.assign({}, configFileRulesConfig, optionRulesConfig);
        const filterRulesConfig = Object.assign({}, configFileFilterRulesConfig, optionFilterRulesConfig);
        const plugins = concat(optionPlugins, configFilePlugins);
        const pluginsConfig = Object.assign({}, configFilePluginConfig, optionPluginsConfig);
        const presets = concat(optionPresets, configPresetNames);
        const mergedOptions = Object.assign({}, options, {
            rules,
            disabledRules,
            rulesConfig,
            filterRules,
            disabledFilterRules,
            filterRulesConfig,
            plugins,
            pluginsConfig,
            presets,
            configFile: configFilePath
        });
        return new this(mergedOptions);
    }

    /**
     * Return hash string of the config and textlint version
     * @returns {string}
     */
    get hash() {
        try {
            const version = pkgConf.sync({ cwd: __dirname }).pkg.version;
            const toString = JSON.stringify(this.toJSON());
            return md5(`${version}-${toString}`);
        } catch (error) {
            // Fallback for some env
            // https://github.com/textlint/textlint/issues/597
            Logger.warn("Use random value as hash because calculating hash value throw error", error);
            return crypto.randomBytes(20).toString("hex");
        }
    }

    /**
     * initialize with options.
     * @param {TextlintConfig} options the option object is defined as TextlintConfig.
     * @returns {Config}
     * @constructor
     */
    constructor(options: Partial<Config> = {}) {
        /**
         * @type {string|undefined} absolute path to .textlintrc file.
         * - If using .textlintrc, return path to .textlintrc
         * - If using npm config module, return path to main file of the module
         * - If not using config file, return undefined
         */
        this.configFile = options.configFile;
        if (this.configFile) {
            assert.ok(path.isAbsolute(this.configFile), `configFile should be absolute path: ${this.configFile}`);
        }
        this.rulesBaseDirectory = options.rulesBaseDirectory
            ? options.rulesBaseDirectory
            : defaultOptions.rulesBaseDirectory;
        // rule names that are defined in ,textlintrc
        const moduleResolver = new TextLintModuleResolver({
            rulesBaseDirectory: this.rulesBaseDirectory
        });
        /**
         * @type {string[]} rule key list
         * These rule is set `false` to options
         */
        this.disabledRules = applyNormalizerToList(
            normalizeTextlintRuleKey,
            options.disabledRules ? options.disabledRules : defaultOptions.disabledRules
        );
        /**
         * @type {string[]} rule key list
         * rules does not includes disabledRules
         */
        this.rules = applyNormalizerToList(
            normalizeTextlintRuleKey,
            options.rules ? options.rules : defaultOptions.rules
        ).filter((ruleName) => {
            return !this.disabledRules.includes(ruleName);
        });

        /**
         * @type {string[]} rule key list
         * These rule is set `false` to options
         */
        this.disabledFilterRules = applyNormalizerToList(
            normalizeTextlintFilterRuleKey,
            options.disabledFilterRules ? options.disabledFilterRules : defaultOptions.disabledFilterRules
        );

        /**
         * @type {string[]} filter rule key list
         */
        this.filterRules = applyNormalizerToList(
            normalizeTextlintFilterRuleKey,
            options.filterRules ? options.filterRules : defaultOptions.filterRules
        ).filter((ruleName) => {
            return !this.disabledFilterRules.includes(ruleName);
        });
        /**
         * @type {string[]} preset key list
         */
        this.presets = applyNormalizerToList(
            normalizeTextlintRulePresetKey,
            options.presets ? options.presets : defaultOptions.presets
        );
        // => load plugins
        // this.rules has not contain plugin rules
        // =====================
        this.plugins = applyNormalizerToList(
            normalizeTextlintPluginKey,
            options.plugins ? options.plugins : defaultOptions.plugins
        );
        this.pluginsConfig = applyNormalizerToConfig(
            normalizeTextlintPluginKey,
            options.pluginsConfig ? options.pluginsConfig : defaultOptions.pluginsConfig
        );
        // rulesConfig
        // load preset package's config and merge it to user defined rules config
        // user config > default preset config
        const presetRulesConfig = loadRulesConfigFromPresets(this.presets, moduleResolver);
        this.rulesConfig = applyNormalizerToConfig(
            normalizeTextlintRuleKey,
            Object.assign({}, presetRulesConfig, options.rulesConfig)
        );
        // filterRulesConfig
        this.filterRulesConfig = applyNormalizerToConfig(
            normalizeTextlintFilterRuleKey,
            options.filterRulesConfig || defaultOptions.filterRulesConfig
        );
        /**
         * @type {string[]}
         */
        this.rulePaths = options.rulePaths ? options.rulePaths : defaultOptions.rulePaths;
        /**
         * @type {string}
         */
        this.formatterName = options.formatterName ? options.formatterName : defaultOptions.formatterName;
        /**
         * @type {boolean}
         */
        this.quiet = options.quiet !== undefined ? options.quiet : defaultOptions.quiet;
        /**
         * @type {boolean}
         */
        this.color = options.color !== undefined ? options.color : defaultOptions.color;
        /**
         * @type {boolean}
         */
        this.cache = options.cache !== undefined ? options.cache : defaultOptions.cache;
        /**
         * @type {string}
         */
        this.cacheLocation = options.cacheLocation !== undefined ? options.cacheLocation : defaultOptions.cacheLocation;
        this._assertCacheLocation(this.cacheLocation);
        /**
         * @type {string}
         */
        this.ignoreFile = options.ignoreFile !== undefined ? options.ignoreFile : defaultOptions.ignoreFile;
    }

    private _assertCacheLocation(locationPath: string) {
        let fileStats;
        try {
            fileStats = fs.lstatSync(locationPath);
        } catch (ex) {
            fileStats = null;
        }
        if (!fileStats) {
            return;
        }
        // TODO: --cache-location does not support directory
        // We should defined what is default name.
        assert.ok(!fileStats.isDirectory(), "--cache-location doesn't support directory");
    }

    /* eslint-enable complexity */

    toJSON() {
        const r = Object.create(null);
        Object.keys(this).forEach((key) => {
            if (!this.hasOwnProperty(key)) {
                return;
            }
            const value = (this as any)[key];
            if (value == null) {
                return;
            }
            r[key] = typeof value.toJSON !== "undefined" ? value.toJSON() : value;
        });
        return r;
    }
}
