// LICENSE : MIT
"use strict";
import { TextlintKernelFilterRule, TextlintKernelPlugin, TextlintKernelRule } from "../textlint-kernel-interface";
import { TextlintFilterRuleDescriptor } from "./TextlintFilterRuleDescriptor";
import { TextlintFilterRuleDescriptors } from "./TextlintFilterRuleDescriptors";
import { TextlintRuleDescriptors } from "./TextlintRuleDescriptors";
import { TextlintLintableRuleDescriptor } from "./TextlintLintableRuleDescriptor";
import { TextlintPluginDescriptors } from "./TextlintPluginDescriptors";
import { TextlintPluginDescriptor } from "./TextlintPluginDescriptor";
import { hasFixer } from "./rule-creator-helper";
import { TextlintFixableRuleDescriptor } from "./TextlintFixableRuleDescriptor";

export const createTextlintRuleDescriptors = (rules: TextlintKernelRule[]) => {
    const ruleOrFixableRuleDescriptorList = rules.map((rule) => {
        if (hasFixer(rule.rule)) {
            return new TextlintFixableRuleDescriptor(rule);
        } else {
            return new TextlintLintableRuleDescriptor(rule);
        }
    });
    return new TextlintRuleDescriptors(ruleOrFixableRuleDescriptorList);
};

export const createTextlintFilterRuleDescriptors = (rules: TextlintKernelFilterRule[]) => {
    return new TextlintFilterRuleDescriptors(rules.map((rule) => new TextlintFilterRuleDescriptor(rule)));
};

export const createTextlintPluginDescriptors = (rules: TextlintKernelPlugin[]) => {
    return new TextlintPluginDescriptors(rules.map((rule) => new TextlintPluginDescriptor(rule)));
};
