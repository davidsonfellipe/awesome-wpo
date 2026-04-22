// LICENSE : MIT
"use strict";
import CoreTask from "./textlint-core-task";
import { TextlintKernelConstructorOptions } from "../textlint-kernel-interface";
import { TextlintFilterRuleDescriptors, TextlintFixableRuleDescriptor } from "../descriptor";
import type { TextlintSourceCode } from "@textlint/types";
import { getSeverity } from "../shared/rule-severity";
import { TextlintFilterRuleContextImpl } from "../context/TextlintFilterRuleContextImpl";
import { TextlintRuleContextImpl } from "../context/TextlintRuleContextImpl";
import _debug from "debug";

const debug = _debug("textlint:TextLintCoreTask");

export interface TextLintCoreTaskArgs {
    config: TextlintKernelConstructorOptions;
    fixableRuleDescriptor: TextlintFixableRuleDescriptor;
    filterRuleDescriptors: TextlintFilterRuleDescriptors;
    sourceCode: TextlintSourceCode;
    configBaseDir?: string;
}

export default class TextLintCoreTask extends CoreTask {
    config: TextlintKernelConstructorOptions;
    fixableRuleDescriptor: TextlintFixableRuleDescriptor;
    filterRuleDescriptors: TextlintFilterRuleDescriptors;
    sourceCode: TextlintSourceCode;
    configBaseDir?: string;

    constructor({
        config,
        configBaseDir,
        fixableRuleDescriptor,
        filterRuleDescriptors,
        sourceCode
    }: TextLintCoreTaskArgs) {
        super();
        this.config = config;
        this.configBaseDir = configBaseDir;
        this.fixableRuleDescriptor = fixableRuleDescriptor;
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
        // setup "rules" field by using a single fixerRule
        debug("fixerRule", this.fixableRuleDescriptor);
        const ruleContext = new TextlintRuleContextImpl({
            ruleId: this.fixableRuleDescriptor.id,
            severityLevel: getSeverity(this.fixableRuleDescriptor.normalizedOptions),
            sourceCode,
            report,
            configBaseDir: this.configBaseDir
        });
        this.tryToAddListenRule(
            this.fixableRuleDescriptor.fixer,
            ruleContext,
            this.fixableRuleDescriptor.normalizedOptions
        );
        // setup "filters" field
        debug("filterRules", this.filterRuleDescriptors);
        this.filterRuleDescriptors.descriptors.forEach((filterRuleDescriptor) => {
            const ruleContext = new TextlintFilterRuleContextImpl({
                ruleId: filterRuleDescriptor.id,
                severityLevel: getSeverity(filterRuleDescriptor.normalizedOptions),
                sourceCode,
                ignoreReport,
                configBaseDir: this.configBaseDir
            });
            this.tryToAddListenRule(filterRuleDescriptor.filter, ruleContext, filterRuleDescriptor.normalizedOptions);
        });
    }
}
