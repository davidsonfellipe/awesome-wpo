/* eslint-disable no-unused-vars */
// LICENSE : MIT
"use strict";
import { parse } from "@textlint/text-to-ast";
import type { TextlintPluginProcessor, TextlintPluginOptions } from "@textlint/types";
import { TxtNode } from "@textlint/ast-node-types";

export class TextProcessor implements TextlintPluginProcessor {
    config: TextlintPluginOptions;
    extensions: Array<string>;
    constructor(config = {}) {
        this.config = config;
        // support "extension" option
        this.extensions = this.config.extensions ? this.config.extensions : [];
    }

    availableExtensions() {
        return [".txt", ".text"].concat(this.extensions);
    }

    processor(_ext: string) {
        return {
            preProcess(text: string, _filePath?: string): TxtNode | { text: string; ast: TxtNode } {
                return parse(text);
            },
            postProcess(messages: Array<any>, filePath?: string): { messages: Array<any>; filePath: string } {
                return {
                    messages,
                    filePath: filePath ? filePath : "<text>"
                };
            }
        };
    }
}
