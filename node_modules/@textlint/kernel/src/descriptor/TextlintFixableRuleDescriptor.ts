// LICENSE : MIT
"use strict";
import { getFixer } from "./rule-creator-helper";
import { TextlintLintableRuleDescriptor } from "./TextlintLintableRuleDescriptor";
import type { TextlintRuleReporter } from "@textlint/types";

/**
 * Textlint Fixable Rule Descriptor.
 * It is inherit **Rule** Descriptor and add fixer() method.
 * It handle RuleCreator and RuleOption.
 */
export class TextlintFixableRuleDescriptor extends TextlintLintableRuleDescriptor {
    /**
     * Return fixer function
     * You should check hasFixer before call this.
     */
    get fixer(): TextlintRuleReporter {
        return getFixer(this.rule);
    }
}
