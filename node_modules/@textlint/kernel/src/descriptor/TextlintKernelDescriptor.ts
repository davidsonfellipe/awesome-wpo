import { TextlintKernelFilterRule, TextlintKernelPlugin, TextlintKernelRule } from "../textlint-kernel-interface";
import { TextlintRuleDescriptors } from "./TextlintRuleDescriptors";
import { TextlintPluginDescriptors } from "./TextlintPluginDescriptors";
import { TextlintFilterRuleDescriptors } from "./TextlintFilterRuleDescriptors";
import {
    createTextlintFilterRuleDescriptors,
    createTextlintPluginDescriptors,
    createTextlintRuleDescriptors
} from "./DescriptorsFactory";
import { TextlintPluginDescriptor } from "./TextlintPluginDescriptor";

export interface TextlintKernelDescriptorArgs {
    rules: TextlintKernelRule[];
    filterRules: TextlintKernelFilterRule[];
    plugins: TextlintKernelPlugin[];
}

export class TextlintKernelDescriptor {
    rule: TextlintRuleDescriptors;
    filterRule: TextlintFilterRuleDescriptors;
    plugin: TextlintPluginDescriptors;

    constructor(private args: TextlintKernelDescriptorArgs) {
        this.rule = createTextlintRuleDescriptors(args.rules);
        this.filterRule = createTextlintFilterRuleDescriptors(args.filterRules);
        this.plugin = createTextlintPluginDescriptors(args.plugins);
    }

    /**
     * Return available extensions of plugins
     */
    get availableExtensions() {
        return this.plugin.availableExtensions;
    }

    /**
     * Merge constructor args and partialArgs
     * It shallow merge partialArgs.
     * It means that overwrite root properties by partialArgs.
     */
    shallowMerge(partialArgs: Partial<TextlintKernelDescriptorArgs>) {
        return new TextlintKernelDescriptor({
            ...this.args,
            ...partialArgs
        });
    }

    /**
     * find PluginDescriptor with extension.
     * This is forward match.
     *
     * If following config of textlint, this method prefer to select MarkdownA for markdown.
     *
     * {
     *     "plugins": [MarkdownA, MarkdownB]
     * }
     */
    findPluginDescriptorWithExt(ext: string): TextlintPluginDescriptor | undefined {
        return this.plugin.findPluginDescriptorWithExt(ext);
    }
}
