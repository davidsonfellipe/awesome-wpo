// LICENSE : MIT
"use strict";
import * as path from "path";
import { createFullPackageName } from "./textlint-package-name-util";
import { PackageNamePrefix } from "../config/package-prefix";

const tryResolve = require("try-resolve");
const debug = require("debug")("textlint:module-resolver");

export interface ConfigModulePrefix {
    CONFIG_PACKAGE_PREFIX: string;
    FILTER_RULE_NAME_PREFIX: string;
    RULE_NAME_PREFIX: string;
    RULE_PRESET_NAME_PREFIX: string;
    PLUGIN_NAME_PREFIX: string;
}

/**
 * This class aim to resolve textlint's package name and get the module path.
 *
 * Define
 *
 * - `package` is npm package
 * - `module` is package's main module
 *
 * ## Support
 *
 * - textlint-rule-*
 * - textlint-preset-*
 * - textlint-plugin-*
 * - textlint-config-*
 */
export class TextLintModuleResolver {
    private baseDirectory: string;

    constructor(config: { rulesBaseDirectory?: string }) {
        /**
         * @type {string} baseDirectory for resolving
         */
        this.baseDirectory = config && config.rulesBaseDirectory ? config.rulesBaseDirectory : "";
    }

    /**
     * Take package name, and return path to module.
     * @param {string} packageName
     * @returns {string} return path to module
     */
    resolveRulePackageName(packageName: string): string {
        const baseDir = this.baseDirectory;
        const fullPackageName = createFullPackageName(PackageNamePrefix.rule, packageName);
        // <rule-name> or textlint-rule-<rule-name>
        const pkgPath = tryResolve(path.join(baseDir, fullPackageName)) || tryResolve(path.join(baseDir, packageName));
        if (!pkgPath) {
            debug(`rule fullPackageName: ${fullPackageName}`);
            throw new ReferenceError(`Failed to load textlint's rule module: "${packageName}" is not found.
See FAQ: https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md
`);
        }
        return pkgPath;
    }

    /**
     * Take package name, and return path to module.
     * @param {string} packageName
     * @returns {string} return path to module
     */
    resolveFilterRulePackageName(packageName: string): string {
        const baseDir = this.baseDirectory;
        const fullPackageName = createFullPackageName(PackageNamePrefix.filterRule, packageName);
        // <rule-name> or textlint-filter-rule-<rule-name> or @scope/<rule-name>
        const pkgPath = tryResolve(path.join(baseDir, fullPackageName)) || tryResolve(path.join(baseDir, packageName));
        if (!pkgPath) {
            debug(`filter rule fullPackageName: ${fullPackageName}`);
            throw new ReferenceError(`Failed to load textlint's filter rule module: "${packageName}" is not found.
See FAQ: https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md
`);
        }
        return pkgPath;
    }

    /**
     * Take package name, and return path to module.
     * @param {string} packageName
     * @returns {string} return path to module
     */
    resolvePluginPackageName(packageName: string): string {
        const baseDir = this.baseDirectory;
        const fullPackageName = createFullPackageName(PackageNamePrefix.plugin, packageName);
        // <plugin-name> or textlint-plugin-<rule-name>
        const pkgPath = tryResolve(path.join(baseDir, fullPackageName)) || tryResolve(path.join(baseDir, packageName));
        if (!pkgPath) {
            debug(`plugin fullPackageName: ${fullPackageName}`);
            throw new ReferenceError(`Failed to load textlint's plugin module: "${packageName}" is not found.
See FAQ: https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md
`);
        }
        return pkgPath;
    }

    /**
     * Take package name, and return path to module.
     * @param {string} packageName
     * The user must specify preset- prefix to these `packageName`.
     * @returns {string} return path to module
     */
    resolvePresetPackageName(packageName: string): string {
        const baseDir = this.baseDirectory;
        const PREFIX = PackageNamePrefix.rulePreset;
        /* Implementation Note

        preset name is defined in config file:
        In the case, `packageName` is "preset-gizmo"
        TextLintModuleResolver resolve "preset-gizmo" to "textlint-rule-preset-gizmo"
        {
            "rules": {
                "preset-gizmo": {
                    "ruleA": false
                }
            }
        }
         */
        // preset-<name> or textlint-rule-preset-<name>
        // @scope/preset-<name> or @scope/textlint-rule-preset-<name>
        const packageNameWithoutPreset = packageName
            .replace(/^preset-/, "")
            .replace(/^@([^/]+)\/preset-(.*)$/, `@$1/$2`);
        const fullPackageName = createFullPackageName(PREFIX, packageNameWithoutPreset);
        const fullFullPackageName = `${PREFIX}${packageNameWithoutPreset}`;
        const pkgPath =
            // textlint-rule-preset-<preset-name> or @scope/textlint-rule-preset-<preset-name>
            tryResolve(path.join(baseDir, fullFullPackageName)) ||
            // <preset-name>
            tryResolve(path.join(baseDir, packageNameWithoutPreset)) ||
            // <rule-name>
            tryResolve(path.join(baseDir, fullPackageName)) ||
            // <package-name>
            tryResolve(path.join(baseDir, packageName));
        if (!pkgPath) {
            debug(`preset fullPackageName: ${fullPackageName}`);
            debug(`preset fullFullPackageName: ${fullFullPackageName}`);
            throw new ReferenceError(`Failed to load textlint's preset module: "${packageName}" is not found.
See FAQ: https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md
`);
        }
        return pkgPath;
    }

    /**
     * Take Config package name, and return path to module.
     * @param {string} packageName
     * @returns {string} return path to module
     */
    resolveConfigPackageName(packageName: string): string {
        const baseDir = this.baseDirectory;
        const fullPackageName = createFullPackageName(PackageNamePrefix.config, packageName);
        // <plugin-name> or textlint-config-<rule-name>
        const pkgPath = tryResolve(path.join(baseDir, fullPackageName)) || tryResolve(path.join(baseDir, packageName));
        if (!pkgPath) {
            throw new ReferenceError(`Failed to load textlint's config module: "${packageName}" is not found.
See FAQ: https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md
`);
        }
        return pkgPath;
    }
}
