// LICENSE : MIT
"use strict";
import CoreTask from "./textlint-core-task";
import { TextlintKernelConstructorOptions } from "../textlint-kernel-interface";
import { TextlintFilterRuleDescriptors, TextlintRuleDescriptors } from "../descriptor";
import type { TextlintSourceCode } from "@textlint/types";
import { getSeverity } from "../shared/rule-severity";
import { TextlintRuleContextImpl } from "../context/TextlintRuleContextImpl";
import { TextlintFilterRuleContextImpl } from "../context/TextlintFilterRuleContextImpl";

export interface TextLintCoreTaskArgs {
    config: TextlintKernelConstructorOptions;
    ruleDescriptors: TextlintRuleDescriptors;
    filterRuleDescriptors: TextlintFilterRuleDescriptors;
    sourceCode: TextlintSourceCode;
    configBaseDir?: string;
}

export default class TextLintCoreTask extends CoreTask {
    config: TextlintKernelConstructorOptions;
    ruleDescriptors: TextlintRuleDescriptors;
    filterRuleDescriptors: TextlintFilterRuleDescriptors;
    sourceCode: TextlintSourceCode;
    configBaseDir?: string;

    constructor({
        config,
        configBaseDir,
        ruleDescriptors,
        filterRuleDescriptors: filterRuleDescriptors,
        sourceCode
    }: TextLintCoreTaskArgs) {
        super();
        this.config = config;
        this.configBaseDir = configBaseDir;
        this.ruleDescriptors = ruleDescriptors;
        this.filterRuleDescriptors = filterRuleDescriptors;
        this.sourceCode = sourceCode;
        this._setupRules();
    }

    start() {
        this.startTraverser(this.sourceCode);
    }

    private _setupRules() {
        // rule
        const sourceCode = this.sourceCode;
        const report = this.createReporter(sourceCode);
        const ignoreReport = this.createShouldIgnore();
        // setup "rules" field
        // filter duplicated rules for improving experience
        // see https://github.com/textlint/textlint/issues/219
        this.ruleDescriptors.lintableDescriptors.forEach((ruleDescriptor) => {
            const ruleOptions = ruleDescriptor.normalizedOptions;
            const ruleContext = new TextlintRuleContextImpl({
                ruleId: ruleDescriptor.id,
                severityLevel: getSeverity(ruleOptions),
                sourceCode,
                report,
                configBaseDir: this.configBaseDir
            });
            this.tryToAddListenRule(ruleDescriptor.linter, ruleContext, ruleOptions);
        });
        // setup "filters" field
        this.filterRuleDescriptors.descriptors.forEach((filterDescriptor) => {
            const ruleContext = new TextlintFilterRuleContextImpl({
                ruleId: filterDescriptor.id,
                sourceCode,
                ignoreReport,
                configBaseDir: this.configBaseDir,
                severityLevel: getSeverity(filterDescriptor.normalizedOptions)
            });
            this.tryToAddListenRule(filterDescriptor.filter, ruleContext, filterDescriptor.normalizedOptions);
        });
    }
}
