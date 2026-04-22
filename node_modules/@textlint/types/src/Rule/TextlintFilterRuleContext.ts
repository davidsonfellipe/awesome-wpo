// LICENSE : MIT
"use strict";
import { TextlintSourceCode } from "../Source/TextlintSourceCode";
import { BaseRuleContext } from "./BaseRuleContext";
import { TextlintRuleSeverityLevel } from "./TextlintRuleSeverityLevel";

/**
 * Message of ignoring
 * @typedef {Object} ReportIgnoreMessage
 * @property {string} ruleId
 * @property {number[]} range
 * @property {string} ignoringRuleId to ignore ruleId
 * "*" is special case, it match all ruleId(work as wildcard).
 */
export interface TextlintFilterRuleShouldIgnoreFunctionArgs {
    ruleId: string;
    range: [number, number];
    optional: {
        ruleId?: string;
    };
}

export declare type TextlintFilterRuleShouldIgnoreFunction = (args: TextlintFilterRuleShouldIgnoreFunctionArgs) => void;

/**
 * Rule context object is passed to each rule as `context`
 * @param {string} ruleId
 * @param {TextlintSourceCode} sourceCode
 * @param {ReportCallback} report
 * @param {Object|boolean|undefined} ruleOptions
 * @param {string} [configBaseDir]
 * @constructor
 */
export interface TextlintFilterRuleContextArgs {
    ruleId: string;
    ignoreReport: TextlintFilterRuleShouldIgnoreFunction;
    sourceCode: TextlintSourceCode;
    configBaseDir?: string;
    severityLevel: TextlintRuleSeverityLevel;
}

/**
 * Rule context object is passed to each rule as `context`
 * @param ruleId
 * @param sourceCode
 * @param ignoreReport shouldIgnore function
 * @constructor
 */
export interface TextlintFilterRuleContext extends BaseRuleContext {
    shouldIgnore(range: [number, number], optional: {}): void;
}
