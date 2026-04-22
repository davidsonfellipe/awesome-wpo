// LICENSE : MIT
"use strict";
import { TextlintKernelRule } from "../textlint-kernel-interface";
import { TextlintLintableRuleDescriptor } from "./TextlintLintableRuleDescriptor";
import { filterDuplicateDescriptor } from "./DescriptorUtil";
import { TextlintFixableRuleDescriptor } from "./TextlintFixableRuleDescriptor";

export type TextlintRuleAllRuleDescriptor = TextlintLintableRuleDescriptor | TextlintFixableRuleDescriptor;

/**
 * The collection class of TextlintRuleDescriptor
 */
export class TextlintRuleDescriptors {
    constructor(private ruleDescriptorList: TextlintRuleAllRuleDescriptor[] = []) {}

    /**
     * Convert this to TextlintKernel rules format
     * @returns {Array}
     */
    toKernelRulesFormat(): Array<TextlintKernelRule> {
        return this.withoutDuplicated().lintableDescriptors.map((descriptor) => {
            return descriptor.toKernel();
        });
    }

    /**
     * Return enabled lintable descriptors
     */
    get lintableDescriptors(): TextlintLintableRuleDescriptor[] {
        return this.descriptors.filter((descriptor) => {
            // fixable is also lintable
            return descriptor instanceof TextlintLintableRuleDescriptor;
        });
    }

    /**
     * Return enabled fixable descriptors
     */
    get fixableDescriptors(): TextlintFixableRuleDescriptor[] {
        return this.descriptors.filter((descriptor) => {
            return descriptor instanceof TextlintFixableRuleDescriptor;
        }) as TextlintFixableRuleDescriptor[];
    }

    /**
     * Return enabled descriptors
     */
    get descriptors(): TextlintRuleAllRuleDescriptor[] {
        return this.ruleDescriptorList.filter((descriptor) => descriptor.enabled);
    }

    /**
     * Return all descriptors that include disabled descriptors
     */
    get allDescriptors(): TextlintRuleAllRuleDescriptor[] {
        return this.ruleDescriptorList;
    }

    /**
     * filter duplicated descriptors
     */
    withoutDuplicated() {
        const newDescriptorList = filterDuplicateDescriptor(this.ruleDescriptorList);
        return new TextlintRuleDescriptors(newDescriptorList);
    }
}
