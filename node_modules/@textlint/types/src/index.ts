/**
 * @fileoverview
 * Public function and interface should be included `Textlint` prefix or postfix.
 * It aim to avoid conflict naming on user land code.
 */

// SourceCode
export type {
    TextlintSourceCode,
    TextlintSourceCodeArgs,
    TextlintSourceCodeLocation,
    TextlintSourceCodePosition,
    TextlintSourceCodeRange,
} from "./Source/TextlintSourceCode";
// RuleContext
export type { TextlintRuleContextFixCommand } from "./Rule/TextlintRuleContextFixCommand";
export type { TextlintRuleContextFixCommandGenerator } from "./Rule/TextlintRuleContextFixCommandGenerator";
export type {
    TextlintRuleError,
    TextlintRuleErrorConstructor,
    TextlintRuleErrorPadding,
    TextlintRuleReportedObject,
} from "./Rule/TextlintRuleError";
export type { TextlintRuleSeverityLevel } from "./Rule/TextlintRuleSeverityLevel";
// Rule
export type {
    TextlintRuleContext,
    TextlintRuleContextArgs,
    TextlintRuleContextReportFunction,
    TextlintRuleContextReportFunctionArgs,
} from "./Rule/TextlintRuleContext";
export type { TextlintRuleOptions } from "./Rule/TextlintRuleOptions";
export type {
    TextlintRuleReporter,
    TextlintFixableRuleModule,
    TextlintRuleModule,
    TextlintRuleReportHandler,
} from "./Rule/TextlintRuleModule";
// Filter Rule
export type {
    TextlintFilterRuleContext,
    TextlintFilterRuleContextArgs,
    TextlintFilterRuleShouldIgnoreFunction,
    TextlintFilterRuleShouldIgnoreFunctionArgs,
} from "./Rule/TextlintFilterRuleContext";
export type {
    TextlintFilterRuleModule,
    TextlintFilterRuleOptions,
    TextlintFilterRuleReporter,
    TextlintFilterRuleReportHandler,
} from "./Rule/TextlintFilterRuleModule";
// Plugin
export type {
    TextlintPluginCreator,
    TextlintPluginOptions,
    TextlintPluginProcessor,
    TextlintPluginProcessorConstructor,
} from "./Plugin/TextlintPluginModule";
// Output message from textlint
// This types is come from output of textlint lint results
export type {
    TextlintResult,
    TextlintFixResult,
    TextlintMessage,
    TextlintMessageFixCommand,
} from "./Message/TextlintResult";
