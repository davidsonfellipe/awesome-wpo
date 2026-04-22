// LICENSE : MIT
"use strict";
import { TextlintKernelRule } from "../textlint-kernel-interface";
import { assertRuleShape, getLinter } from "./rule-creator-helper";
import type { TextlintRuleModule, TextlintRuleOptions, TextlintRuleReporter } from "@textlint/types";
import deepEqual from "deep-equal";

/**
 * Textlint Rule Descriptor.
 * It handle RuleCreator and RuleOption.
 */
export class TextlintLintableRuleDescriptor {
    constructor(private textlintKernelRule: TextlintKernelRule) {
        assertRuleShape(textlintKernelRule.rule, textlintKernelRule.ruleId);
    }

    get id() {
        return this.textlintKernelRule.ruleId;
    }

    /**
     * Rule module-self
     */
    get rule(): TextlintRuleModule {
        return this.textlintKernelRule.rule;
    }

    /**
     * Return true if this rule is enabled.
     */
    get enabled(): boolean {
        return this.rawOptions !== false;
    }

    /**
     * Return linter function
     * You should check hasLiner before call this.
     */
    get linter(): TextlintRuleReporter {
        return getLinter(this.rule);
    }

    /**
     * Return normalized rule option object.
     * If the rule have not option, return `true` by default.
     */
    get normalizedOptions(): TextlintRuleOptions {
        // default: { ruleName: true }
        const DefaultRuleConfigValue = {};
        if (typeof this.textlintKernelRule.options === "boolean" || this.textlintKernelRule.options === undefined) {
            return DefaultRuleConfigValue;
        } else {
            return this.textlintKernelRule.options;
        }
    }

    get rawOptions(): boolean | undefined | TextlintRuleOptions {
        return this.textlintKernelRule.options;
    }

    /**
     * Return true if descriptor is same
     */
    equals(descriptor: TextlintLintableRuleDescriptor): boolean {
        return (
            this.rule === descriptor.rule &&
            deepEqual(this.normalizedOptions, descriptor.normalizedOptions, {
                strict: true
            })
        );
    }

    toKernel(): TextlintKernelRule {
        return this.textlintKernelRule;
    }
}
