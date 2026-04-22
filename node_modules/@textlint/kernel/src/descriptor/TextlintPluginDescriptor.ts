"use strict";
import { TextlintKernelPlugin } from "../textlint-kernel-interface";
import { Descriptor } from "./Descriptor";
import type {
    TextlintPluginOptions,
    TextlintPluginProcessor,
    TextlintPluginProcessorConstructor
} from "@textlint/types";
import deepEqual from "deep-equal";

/**
 * Get instance/static `availableExtensions()` from TextlintPluginProcessor
 */
const getAvailableExtensions = (pluginProcessor: TextlintPluginProcessor): string[] => {
    if (typeof pluginProcessor.availableExtensions === "function") {
        return pluginProcessor.availableExtensions();
    }
    // It is compatible for textlint@10<=
    // Recommended: `availableExtensions()` should be defined as instance method.
    // https://github.com/textlint/textlint/issues/531
    const PluginProcessorConstructor = pluginProcessor.constructor as TextlintPluginProcessorConstructor;
    if (typeof PluginProcessorConstructor.availableExtensions === "function") {
        return PluginProcessorConstructor.availableExtensions();
    }
    throw new Error(`Plugin(${pluginProcessor}) should implement availableExtensions() method`);
};

/**
 * Textlint Plugin Descriptor
 */
export class TextlintPluginDescriptor implements Descriptor<TextlintKernelPlugin> {
    public processor: TextlintPluginProcessor;

    constructor(private plugin: TextlintKernelPlugin) {
        this.plugin = plugin;
        if (!this.plugin.plugin.Processor) {
            throw new Error(`Plugin should have Processor property.
module.exports = {
  Processor: class Processor{ ... }
}
`);
        }
        this.processor = new plugin.plugin.Processor(this.normalizedOptions);
    }

    get id() {
        return this.plugin.pluginId;
    }

    /**
     * Return true if this rule is enabled.
     */
    get enabled(): boolean {
        return this.rawOptions !== false;
    }

    /**
     * Return available extension of this plugin
     */
    get availableExtensions(): string[] {
        return getAvailableExtensions(this.processor);
    }

    get normalizedOptions(): TextlintPluginOptions {
        // default: { ruleName: true }
        const DefaultPluginOption = {};
        if (typeof this.plugin.options === "boolean" || this.plugin.options === undefined) {
            return DefaultPluginOption;
        } else {
            return this.plugin.options;
        }
    }

    get rawOptions() {
        return this.plugin.options;
    }

    toKernel() {
        return this.plugin;
    }

    equals(target: this): boolean {
        return (
            this.plugin.plugin === target.plugin.plugin &&
            deepEqual(this.plugin.options, target.plugin.options, {
                strict: true
            })
        );
    }
}
