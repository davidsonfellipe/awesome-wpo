// LICENSE : MIT
"use strict";
import { StructuredSource } from "structured-source";
import type { TextlintRuleErrorDetails } from "@textlint/types";
import { AnyTxtNode } from "@textlint/ast-node-types";

export class SourceLocation {
    private source: StructuredSource;

    constructor(text: string) {
        this.source = new StructuredSource(text);
    }

    toAbsoluteLocation(node: AnyTxtNode, padding: TextlintRuleErrorDetails) {
        const nodeRange = node.range;
        const line = node.loc.start.line;
        const column = node.loc.start.column;

        // when use {index}
        if (padding.index !== undefined) {
            const paddingIndex = padding.index;
            return nodeRange[0] + paddingIndex;
        }
        // when use {line, column}
        if (padding.line !== undefined && padding.column !== undefined) {
            const addedLine = line + padding.line;
            // when report with padding {line, column}, message.column should be 0 + padding.column.
            // In other word, padding line > 0 and message.column start with 0.
            if (padding.column > 0) {
                return this.source.positionToIndex({
                    line: addedLine,
                    column: padding.column
                });
            } else {
                return this.source.positionToIndex({
                    line: addedLine,
                    column: column
                });
            }
        }
        // when use { line } only
        if (padding.line !== undefined && padding.line > 0) {
            const addedLine = line + padding.line;
            return this.source.positionToIndex({
                line: addedLine,
                column: column
            });
        }
        return nodeRange[0];
    }
}
