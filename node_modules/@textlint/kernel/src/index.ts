// Kernel
export { TextlintKernel } from "./textlint-kernel";
// Kernel Descriptor
export * from "./descriptor/index";
// Kernel rule/filter/plugin format
export { TextlintKernelRule, TextlintKernelFilterRule, TextlintKernelPlugin } from "./textlint-kernel-interface";

/**
 * Types of textlint lint/fix result
 */
export type { TextlintResult, TextlintFixResult, TextlintMessageFixCommand, TextlintMessage } from "@textlint/types";
/**
 * @deprecated These types will removed in the future. Use @textlint/types instead of it
 * If you use these types in your rule, you should use @textlint/types for your rule.
 * Related changes: https://github.com/textlint/textlint/pull/562
 */
export type {
    // textlint rule interface
    TextlintRuleReporter,
    TextlintRuleModule,
    TextlintRuleOptions,
    TextlintRuleSeverityLevel,
    // textlint filter rule interface
    TextlintFilterRuleReporter,
    TextlintFilterRuleOptions,
    // textlint plugin interface
    TextlintPluginCreator,
    TextlintPluginOptions,
    TextlintPluginProcessor,
    TextlintPluginProcessorConstructor
} from "@textlint/types";
// TextlintRuleSeverityLevel Key
export { TextlintRuleSeverityLevelKeys } from "./context/TextlintRuleSeverityLevelKeys";
