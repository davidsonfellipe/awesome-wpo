/**
 * `RuleReporterFixCommand` is intermediate object between Rule report and Kernel.
 * `IntermediateFixCommand` has also `isAbsolute` flag value.
 */
export interface TextlintRuleContextFixCommand {
    text: string;
    range: number[];
    isAbsolute: boolean;
}
