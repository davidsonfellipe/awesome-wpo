// LICENSE : MIT
"use strict";
import type { TextlintRuleOptions, TextlintRuleSeverityLevel } from "@textlint/types";
import { TextlintRuleSeverityLevelKeys } from "../context/TextlintRuleSeverityLevelKeys";

const isSeverityLevelValue = (type: any): type is TextlintRuleSeverityLevel => {
    if (type === undefined) {
        throw new Error(`Please set following value to severity:
"rule-key": {
    "severity": "<warning|error>"
}`);
    }
    return true;
};

/**
 * get severity level from ruleConfig.
 * @param {Object|boolean|undefined} ruleConfig
 * @returns {number}
 */
export function getSeverity(ruleConfig?: TextlintRuleOptions): TextlintRuleSeverityLevel {
    if (ruleConfig === undefined) {
        return TextlintRuleSeverityLevelKeys.error;
    }
    // rule:<true|false>
    if (typeof ruleConfig === "boolean") {
        return ruleConfig ? TextlintRuleSeverityLevelKeys.error : TextlintRuleSeverityLevelKeys.none;
    }
    if (ruleConfig.severity) {
        const severityValue = TextlintRuleSeverityLevelKeys[ruleConfig.severity];
        if (!isSeverityLevelValue(severityValue)) {
            throw new Error(`Please set following value to severity:
"rule-key": {
    "severity": "<warning|error>"
}`);
        }
        return severityValue;
    }
    return TextlintRuleSeverityLevelKeys.error;
}
