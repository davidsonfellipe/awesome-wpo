// LICENSE : MIT
"use strict";
import * as assert from "assert";
import LinterTask from "../task/linter-task";
import TaskRunner from "../task/task-runner";
import { TextlintKernelConstructorOptions } from "../textlint-kernel-interface";

import MessageProcessManager from "../messages/MessageProcessManager";
import { TextlintFilterRuleDescriptors, TextlintRuleDescriptors } from "../descriptor";
import type { TextlintSourceCode, TextlintPluginProcessor, TextlintResult } from "@textlint/types";

export interface LinterProcessorArgs {
    config: TextlintKernelConstructorOptions;
    configBaseDir?: string;
    ruleDescriptors: TextlintRuleDescriptors;
    filterRuleDescriptors: TextlintFilterRuleDescriptors;
    sourceCode: TextlintSourceCode;
}

export default class LinterProcessor {
    private processor: TextlintPluginProcessor;
    private messageProcessManager: MessageProcessManager;

    /**
     * @param {Processor} processor
     * @param {MessageProcessManager} messageProcessManager
     */
    constructor(processor: TextlintPluginProcessor, messageProcessManager: MessageProcessManager) {
        this.processor = processor;
        this.messageProcessManager = messageProcessManager;
    }

    /**
     * Run linter process
     */
    process({
        config,
        configBaseDir,
        ruleDescriptors,
        filterRuleDescriptors,
        sourceCode
    }: LinterProcessorArgs): Promise<TextlintResult> {
        const { preProcess, postProcess } = this.processor.processor(sourceCode.ext);
        assert.ok(
            typeof preProcess === "function" && typeof postProcess === "function",
            "processor should implement {preProcess, postProcess}"
        );
        const task = new LinterTask({
            config,
            ruleDescriptors: ruleDescriptors,
            filterRuleDescriptors: filterRuleDescriptors,
            sourceCode,
            configBaseDir
        });
        return TaskRunner.process(task).then((messages) => {
            const result = postProcess(messages, sourceCode.filePath);
            result.messages = this.messageProcessManager.process(result.messages);
            if (result.filePath == null) {
                result.filePath = `<Unkown${sourceCode.ext}>`;
            }
            assert.ok(
                result.filePath && result.messages.length >= 0,
                "postProcess should return { messages, filePath } "
            );
            return result;
        });
    }
}
