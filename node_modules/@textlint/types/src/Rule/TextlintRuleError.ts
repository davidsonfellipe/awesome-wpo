// LICENSE : MIT
"use strict";
import { TextlintRuleContextFixCommand } from "./TextlintRuleContextFixCommand";

/**
 * Object version of RuleError
 * It is undocument way. Please dont use it.
 *
 * report(node, {
 *   message: ""
 * })
 */
export interface TextlintRuleReportedObject {
    line?: number;
    column?: number;
    index?: number;
    fix?: TextlintRuleContextFixCommand;
    message: string;
    severity?: number;

    [index: string]: any;
}

export interface TextlintRuleErrorPadding {
    line?: number;
    column?: number;
    index?: number;
    fix?: TextlintRuleContextFixCommand;
}

export interface TextlintRuleErrorConstructor {
    new (message: string, paddingLocation?: number | TextlintRuleErrorPadding): TextlintRuleError;
}

export interface TextlintRuleError {
    readonly message: string;
    readonly line?: number;
    readonly column?: number;
    readonly index?: number;
    readonly fix?: TextlintRuleContextFixCommand;
}
