import * as assert from "assert";
import { TxtNode } from "@textlint/ast-node-types";
import type { TextlintRuleContextFixCommandGenerator, TextlintSourceCodeRange } from "@textlint/types";

/**
 * Creates a fix command that inserts text at the specified index in the source text.
 * @param {number} index The 0-based index at which to insert the new text.
 * @param {string} text The text to insert.
 * @returns {IntermediateFixCommand} The fix command.
 * @private
 */
function insertTextAt(index: number, text: string) {
    assert.ok(text, "text must be string");
    return {
        range: [index, index],
        text,
        isAbsolute: false
    };
}

/**
 * Creates a fix command that inserts text at the specified index in the source text.
 * @param {number} index The 0-based index at which to insert the new text.
 * @param {string} text The text to insert.
 * @returns {IntermediateFixCommand} The fix command.
 * @private
 */
function insertTextAtAbsolute(index: number, text: string) {
    assert.ok(text, "text must be string");
    return {
        range: [index, index],
        text,
        isAbsolute: true
    };
}

/**
 * Creates code fixing commands for rules.
 * It create command for fixing texts.
 * The `range` arguments of these command is should be **relative** value from reported node.
 * See {@link SourceLocation} class for more detail.
 * @constructor
 */
export class TextlintRuleContextFixCommandGeneratorImpl implements TextlintRuleContextFixCommandGenerator {
    /**
     * Creates a fix command that inserts text after the given node or token.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtNode} node The node or token to insert after.
     * @param {string} text The text to insert.
     * @returns {IntermediateFixCommand} The fix command.
     */
    insertTextAfter(node: TxtNode, text: string) {
        return insertTextAtAbsolute(node.range[1], text);
    }

    /**
     * Creates a fix command that inserts text after the specified range in the source text.
     * The fix is not applied until applyFixes() is called.
     * @param {number[]} range The range to replace, first item is start of range, second
     *      is end of range.
     *      The `range` should be **relative** value from reported node.
     * @param {string} text The text to insert.
     * @returns {IntermediateFixCommand} The fix command.
     */
    insertTextAfterRange(range: TextlintSourceCodeRange, text: string) {
        return insertTextAt(range[1], text);
    }

    /**
     * Creates a fix command that inserts text before the given node or token.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtNode} node The node or token to insert before.
     * @param {string} text The text to insert.
     * @returns {IntermediateFixCommand} The fix command.
     */
    insertTextBefore(node: TxtNode, text: string) {
        return insertTextAtAbsolute(node.range[0], text);
    }

    /**
     * Creates a fix command that inserts text before the specified range in the source text.
     * The fix is not applied until applyFixes() is called.
     * @param {number[]} range The range to replace, first item is start of range, second
     *      is end of range.
     *      The `range` should be **relative** value from reported node.
     * @param {string} text The text to insert.
     * @returns {IntermediateFixCommand} The fix command.
     */
    insertTextBeforeRange(range: TextlintSourceCodeRange, text: string) {
        return insertTextAt(range[0], text);
    }

    /**
     * Creates a fix command that replaces text at the node or token.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtNode} node The node or token to remove.
     * @param {string} text The text to insert.
     * @returns {IntermediateFixCommand} The fix command.
     */
    replaceText(node: TxtNode, text: string) {
        return {
            range: node.range,
            text,
            isAbsolute: true
        };
    }

    /**
     * Creates a fix command that replaces text at the specified range in the source text.
     * The fix is not applied until applyFixes() is called.
     * @param {number[]} range The range to replace, first item is start of range, second
     *      is end of range.
     *      The `range` should be **relative** value from reported node.
     * @param {string} text The text to insert.
     * @returns {IntermediateFixCommand} The fix command.
     */
    replaceTextRange(range: TextlintSourceCodeRange, text: string) {
        return {
            range,
            text,
            isAbsolute: false
        };
    }

    /**
     * Creates a fix command that removes the node or token from the source.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtNode} node The node or token to remove.
     * @returns {IntermediateFixCommand} The fix command.
     */
    remove(node: TxtNode) {
        return this.replaceText(node, "");
    }

    /**
     * Creates a fix command that removes the specified range of text from the source.
     * The fix is not applied until applyFixes() is called.
     * @param {number[]} range The range to remove, first item is start of range, second
     *      is end of range.
     *      The `range` should be **relative** value from reported node.
     * @returns {IntermediateFixCommand} The fix command.
     */
    removeRange(range: TextlintSourceCodeRange) {
        return this.replaceTextRange(range, "");
    }
}
