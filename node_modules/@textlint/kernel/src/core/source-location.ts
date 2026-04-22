import type {
    TextlintMessageFixCommand,
    TextlintRuleContextReportFunctionArgs,
    TextlintRuleError,
    TextlintRuleErrorPadding,
    TextlintSourceCode
} from "@textlint/types";
import { TxtNode } from "@textlint/ast-node-types";
import assert from "assert";
import { throwIfTesting } from "@textlint/feature-flag";

export interface ReportMessage {
    ruleId: string;
    node: any;
    severity: number;
    ruleError: TextlintRuleError;
}

export default class SourceLocation {
    private source: TextlintSourceCode;

    constructor(source: TextlintSourceCode) {
        this.source = source;
    }

    /**
     * adjust node's location with error's padding location.
     */
    adjust(
        reportArgs: TextlintRuleContextReportFunctionArgs
    ): { line: number; column: number; fix?: TextlintMessageFixCommand } {
        const { node, ruleError, ruleId } = reportArgs;
        const errorPrefix = `[${ruleId}]` || "";
        const padding = ruleError;
        /*
         FIXME: It is old and un-document way
         new RuleError("message", index);
         */
        let _backwardCompatibleIndexValue;
        if (typeof padding === "number") {
            _backwardCompatibleIndexValue = padding;
            throwIfTesting(`${errorPrefix} This is un-document way:
report(node, new RuleError("message", index);

Please use { index }: 

report(node, new RuleError("message", {
    index: paddingLineColumn
});
`);
        }
        // when running from textlint-tester, assert
        if (padding.line === undefined && padding.column !== undefined) {
            // FIXME: Backward compatible <= textlint.5.5
            throwIfTesting(`${errorPrefix} Have to use a sets with "line" and "column".
See FAQ: https://github.com/textlint/textlint/blob/master/docs/faq/line-column-or-index.md            

report(node, new RuleError("message", {
    line: paddingLineNumber,
    column: paddingLineColumn
});

OR use "index" property insteadof only "column".

report(node, new RuleError("message", {
    index: paddingLineColumn
});
`);
        }

        // When either one of {column, line} or {index} is not used, throw error
        if ((padding.line !== undefined || padding.column !== undefined) && padding.index !== undefined) {
            // Introduced textlint 5.6
            // https://github.com/textlint/textlint/releases/tag/5.6.0
            // Always throw Error
            throw new Error(`${errorPrefix} Have to use one of {line, column} or {index}.
You should use either one:

use "line" and "column" property

report(node, new RuleError("message", {
    line: paddingLineNumber,
    column: paddingLineColumn
});

OR 

use "index" property

report(node, new RuleError("message", {
    index: paddingIndexValue
});
`);
        }

        const adjustedLoc = this.toAbsoluteLocation(node, padding, _backwardCompatibleIndexValue);
        const adjustedFix = this.toAbsolutePositionFix(node, padding);
        /*
         {
         line,
         column
         fix?
         }
         */
        return Object.assign({}, adjustedLoc, adjustedFix) as {
            line: number;
            column: number;
            fix?: TextlintMessageFixCommand;
        };
    }

    private toAbsoluteLocation(node: any, padding: TextlintRuleErrorPadding, _paddingIndex?: number) {
        const nodeRange = node.range;
        const line = node.loc.start.line;
        const column = node.loc.start.column;

        // when use {index}
        if (padding.index !== undefined || _paddingIndex !== undefined) {
            const startNodeIndex = nodeRange[0];
            const paddingIndex = _paddingIndex || padding.index;
            const position = this.source.indexToPosition(startNodeIndex + paddingIndex);
            return {
                column: position.column,
                line: position.line
            };
        }
        // when use {line, column}
        if (padding.line !== undefined && padding.column !== undefined) {
            if (padding.line > 0) {
                const addedLine = line + padding.line;
                // when report with padding {line, column}, message.column should be 0 + padding.column.
                // In other word, padding line > 0 and message.column start with 0.
                if (padding.column > 0) {
                    return {
                        line: addedLine,
                        column: padding.column
                    };
                } else {
                    return {
                        line: addedLine,
                        column
                    };
                }
            }
        }
        // when use { line } only
        if (padding.line !== undefined && padding.line > 0) {
            const addedLine = line + padding.line;
            return {
                line: addedLine,
                column
            };
        }
        // when use { column } only
        // FIXME: backward compatible @ un-document
        // Remove next version 6?
        /*
         new RuleError({
            column: index
         });
         */
        if (padding.column !== undefined && padding.column > 0) {
            const addedColumn = column + padding.column;
            return {
                line,
                column: addedColumn
            };
        }

        return {
            column,
            line
        };
    }

    /**
     * Adjust `fix` command range
     * if `fix.isAbsolute` is not absolute position, adjust the position from the `node`.
     */
    private toAbsolutePositionFix(node: TxtNode, ruleErrorObject: TextlintRuleError) {
        const nodeRange = node.range;
        // if not found `fix`, return empty object
        if (ruleErrorObject.fix === undefined) {
            return {};
        }
        assert.ok(typeof ruleErrorObject.fix === "object", "fix should be FixCommand object");
        // if absolute position return self
        if (ruleErrorObject.fix.isAbsolute) {
            return {
                // remove other property that is not related `fix`
                // the return object will be merged by `Object.assign`
                fix: {
                    range: ruleErrorObject.fix.range,
                    text: ruleErrorObject.fix.text
                }
            };
        }
        // if relative position return adjusted position
        return {
            // fix(command) is relative from node's range
            fix: {
                range: [
                    nodeRange[0] + ruleErrorObject.fix.range[0],
                    nodeRange[0] + ruleErrorObject.fix.range[1]
                ] as const,
                text: ruleErrorObject.fix.text
            }
        };
    }
}
