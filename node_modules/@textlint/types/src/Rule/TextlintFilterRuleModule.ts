/**
 * Filter rule reporter function
 */
import { TextlintFilterRuleContext } from "./TextlintFilterRuleContext";
import { ASTNodeTypes, TypeofTxtNode } from "@textlint/ast-node-types";
/**
 * textlint filter rule option values is object or boolean.
 * if this option value is false, disable the filter rule.
 */
export type TextlintFilterRuleOptions = {
    [index: string]: any;
};

/**
 * Rule Reporter Handler object define handler for each TxtNode type.
 */
export type TextlintFilterRuleReportHandler = {
    [P in ASTNodeTypes]?: (node: TypeofTxtNode<P>) => void | Promise<any>;
} & {
    [index: string]: (node: any) => void | Promise<any>;
};

/**
 * textlint filter rule report function
 */
export type TextlintFilterRuleReporter = (
    context: Readonly<TextlintFilterRuleContext>,
    options?: TextlintFilterRuleOptions
) => TextlintFilterRuleReportHandler;
/**
 * textlint filter module exports
 * Currently, module.exports = reporter;
 */
export type TextlintFilterRuleModule = TextlintFilterRuleReporter;
