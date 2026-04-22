// MIT © 2017- azu
import * as assert from "assert";
// sequence
import FixerProcessor from "./fixer/fixer-processor";
// parallel
import LinterProcessor from "./linter/linter-processor";
// message process manager
import MessageProcessManager from "./messages/MessageProcessManager";
import filterIgnoredProcess from "./messages/filter-ignored-process";
import filterDuplicatedProcess from "./messages/filter-duplicated-process";
import filterSeverityProcess from "./messages/filter-severity-process";
import sortMessageProcess from "./messages/sort-messages-process";
import { TextlintKernelConstructorOptions, TextlintKernelOptions } from "./textlint-kernel-interface";
import type { TextlintFixResult, TextlintResult } from "@textlint/types";
import { TextlintKernelDescriptor } from "./descriptor";
import { TextlintSourceCodeImpl } from "./context/TextlintSourceCodeImpl";
import { isTxtAST } from "@textlint/ast-tester";
import _debug from "debug";

const debug = _debug("textlint:kernel");

/**
 * add fileName to trailing of error message
 * @param {string|undefined} fileName
 * @param {string} message
 * @returns {string}
 */
function addingAtFileNameToError(fileName: string | undefined, message: string) {
    if (!fileName) {
        return message;
    }
    return `${message}
at ${fileName}`;
}

/**
 * TextlintKernel is core logic written by pure JavaScript.
 *
 * Pass
 *
 * - config
 * - plugins
 * - rules
 * - filterRules
 * - messageProcessor
 *
 */
export class TextlintKernel {
    private readonly config: TextlintKernelConstructorOptions;
    private readonly messageProcessManager: MessageProcessManager;

    /**
     * @param config
     */
    constructor(config: TextlintKernelConstructorOptions = {}) {
        // this.config often is undefined.
        this.config = config;
        // Initialize Message Processor
        // Now, It it built-in process only
        // filter `shouldIgnore()` results
        this.messageProcessManager = new MessageProcessManager([filterIgnoredProcess]);
        // filter duplicated messages
        this.messageProcessManager.add(filterDuplicatedProcess);
        // filter by severity
        this.messageProcessManager.add(filterSeverityProcess(this.config));
        this.messageProcessManager.add(sortMessageProcess);
    }

    /**
     * lint text by registered rules.
     * The result contains target filePath and error messages.
     * @param {string} text
     * @param {Object} options linting options
     * @returns {Promise.<TextlintResult>}
     */
    lintText(text: string, options: TextlintKernelOptions): Promise<TextlintResult> {
        return Promise.resolve().then(() => {
            const descriptor = new TextlintKernelDescriptor({
                rules: options.rules || [],
                filterRules: options.filterRules || [],
                plugins: options.plugins || []
            });
            return this._parallelProcess({
                descriptor,
                text,
                options
            });
        });
    }

    /**
     * fix texts and return fix result object
     * @param {string} text
     * @param {Object} options lint options
     * @returns {Promise.<TextlintFixResult>}
     */
    fixText(text: string, options: TextlintKernelOptions): Promise<TextlintFixResult> {
        return Promise.resolve().then(() => {
            const descriptor = new TextlintKernelDescriptor({
                rules: options.rules || [],
                filterRules: options.filterRules || [],
                plugins: options.plugins || []
            });
            return this._sequenceProcess({
                descriptor,
                options,
                text
            });
        });
    }

    /**
     * process text in parallel for Rules and return {Promise.<TextLintResult>}
     * In other word, parallel flow process.
     * @param {*} processor
     * @param {string} text
     * @param {Object} options
     * @returns {Promise.<TextlintResult>}
     * @private
     */
    private _parallelProcess({
        descriptor,
        text,
        options
    }: {
        descriptor: TextlintKernelDescriptor;
        text: string;
        options: TextlintKernelOptions;
    }) {
        const { ext, filePath, configBaseDir } = options;
        const plugin = descriptor.findPluginDescriptorWithExt(ext);
        debug("available extensions: %o", descriptor.availableExtensions);
        if (plugin === undefined) {
            throw new Error(`Not found available plugin for ${ext}`);
        }
        debug("use plugin: %s", plugin.id);
        const processor = plugin.processor;
        const { preProcess, postProcess } = processor.processor(ext);
        assert.ok(
            typeof preProcess === "function" && typeof postProcess === "function",
            "processor should implements {preProcess, postProcess}"
        );
        const preProcessResult = preProcess(text, filePath);
        const isPluginReturnAnAST = isTxtAST(preProcessResult);
        const textForAST = isPluginReturnAnAST ? text : preProcessResult.text;
        const ast = isPluginReturnAnAST ? preProcessResult : preProcessResult.ast;
        const sourceCode = new TextlintSourceCodeImpl({
            text: textForAST,
            ast,
            ext,
            filePath
        });
        const linterProcessor = new LinterProcessor(processor, this.messageProcessManager);
        return linterProcessor
            .process({
                config: this.config,
                ruleDescriptors: descriptor.rule,
                filterRuleDescriptors: descriptor.filterRule,
                sourceCode,
                configBaseDir
            })
            .catch((error) => {
                error.message = addingAtFileNameToError(filePath, error.message);
                return Promise.reject(error);
            });
    }

    /**
     * process text in series for Rules and return {Promise.<TextlintFixResult>}
     * In other word, sequence flow process.
     * @param {*} processor
     * @param {string} text
     * @param {TextlintKernelOptions} options
     * @returns {Promise.<TextlintFixResult>}
     * @private
     */
    private _sequenceProcess({
        descriptor,
        text,
        options
    }: {
        descriptor: TextlintKernelDescriptor;
        text: string;
        options: TextlintKernelOptions;
    }): Promise<TextlintFixResult> {
        const { ext, filePath, configBaseDir } = options;
        const plugin = descriptor.findPluginDescriptorWithExt(ext);
        debug("available extensions: %o", descriptor.availableExtensions);
        if (plugin === undefined) {
            throw new Error(`Not found available plugin for ${ext}`);
        }
        debug("use plugin: %s", plugin.id);
        const processor = plugin.processor;
        const { preProcess, postProcess } = processor.processor(ext);
        assert.ok(
            typeof preProcess === "function" && typeof postProcess === "function",
            "processor should implements {preProcess, postProcess}"
        );
        const preProcessResult = preProcess(text, filePath);
        const isPluginReturnAnAST = isTxtAST(preProcessResult);
        const textForAST = isPluginReturnAnAST ? text : preProcessResult.text;
        const ast = isPluginReturnAnAST ? preProcessResult : preProcessResult.ast;
        const sourceCode = new TextlintSourceCodeImpl({
            text: textForAST,
            ast,
            ext,
            filePath
        });
        const fixerProcessor = new FixerProcessor(processor, this.messageProcessManager);
        return fixerProcessor
            .process({
                config: this.config,
                ruleDescriptors: descriptor.rule,
                filterRules: descriptor.filterRule,
                sourceCode,
                configBaseDir
            })
            .catch((error) => {
                error.message = addingAtFileNameToError(filePath, error.message);
                return Promise.reject(error);
            });
    }
}
