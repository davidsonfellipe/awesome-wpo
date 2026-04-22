// LICENSE : MIT
"use strict";
import { isPluginRuleKey, isPresetRuleKey } from "./config-util";
export interface RuleOf {
    presetNames: string[];
    enabledRuleNames: string[];
    disabledRuleNames: string[];
}
/**
 * Get rule keys from `.textlintrc` config object.
 * @param {Object} [rulesConfig]
 * @returns {{available: string[], disabledRuleNames: string[]}}
 */
export function separateEnabledOrDisabled(rulesConfig: any): RuleOf {
    const ruleOf: RuleOf = {
        presetNames: [],
        enabledRuleNames: [],
        disabledRuleNames: []
    };
    if (!rulesConfig) {
        return ruleOf;
    }
    Object.keys(rulesConfig).forEach((key) => {
        // `<plugin>/<rule-key>` should ignored
        if (isPluginRuleKey(key)) {
            return;
        }
        // `textlint-rule-preset-XXX`
        if (isPresetRuleKey(key)) {
            if (typeof rulesConfig[key] === "object" || rulesConfig[key] === true) {
                ruleOf.presetNames.push(key);
            }
            return;
        }
        // ignore `false` value
        if (typeof rulesConfig[key] === "object" || rulesConfig[key] === true) {
            ruleOf.enabledRuleNames.push(key);
        } else {
            ruleOf.disabledRuleNames.push(key);
        }
    });
    return ruleOf;
}
