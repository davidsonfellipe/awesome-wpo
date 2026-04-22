import type { TextlintRuleContext } from "@textlint/types"
import { ASTNodeTypes, TxtNode } from "@textlint/ast-node-types"

/**
 * RuleHelper is helper class for textlint.
 * @class RuleHelper
 */
export default class RuleHelper {
    // @ts-expect-error
    private _ruleContext: Readonly<TextlintRuleContext>;

    /**
     * Initialize RuleHelper with RuleContext object.
     * @param ruleContext the ruleContext is context object of the rule.
     */
    constructor(ruleContext: Readonly<TextlintRuleContext>) {
        this._ruleContext = ruleContext;
    }

    /**
     * Get parents of node.
     * The parent nodes are returned in order from the closest parent to the outer ones.
     * {@link node} is not contained in the results.
     * @param {TxtNode} node the node is start point.
     */
    getParents(node: TxtNode) {
        const result = [];
        let parent = node.parent;
        while (parent != null) {
            result.push(parent);
            parent = parent.parent;
        }
        return result;
    }

    /**
     * Return true if `node` is wrapped any one of node {@link types}.
     * @param {TxtNode} node is target node
     * @param {string[]} types are wrapped target node
     * @returns {boolean}
     */
    isChildNode(node: TxtNode, types: string[]) {
        const parents = this.getParents(node);
        const parentsTypes = parents.map(function (parent) {
            return parent.type;
        });
        return types.some(function (type) {
            return parentsTypes.some(function (parentType) {
                return parentType === type;
            });
        });
    }

    /**
     * Return true if the node is Str node and fill following conditions
     *
     * - the node is Str node
     * - the node is under the Paragraph node
     * - the node is not under the BlockQuote
     *
     * This function is useful for common use-case.
     * If you want to lint Str node, but you not want to lint styled node, this function is useful.
     * styled node is Link, Strong, BlockQuote, Header etc...
     * Opposite of it, plain str node is just under the Paragraph node.
     *
     * @example
     *
     * Return true
     *
     * ---
     * str str str
     * - list text
     * ---
     *
     * Return false
     *
     * ----
     * # Header
     * ![alt text](https://example.com)
     * [link title](https://example.com)
     * > BlockQuote
     * **Strong**
     * [^footnote]: text text
     * ----
     *
     * Summary:
     *
     * Return true if the node is plain text.
     * In other words, return false if the node is styled
     *
     * @param node
     */
    isPlainStrNode(node: TxtNode): boolean {
        if (node.type !== ASTNodeTypes.Str) {
            return false;
        }
        if (node.parent?.type !== ASTNodeTypes.Paragraph) {
            return false;
        }

        const isInUncontrollableNode = this.isChildNode(node, [
            // <blockquote> is Block node in html. It can has Pragaraph node as children
            ASTNodeTypes.BlockQuote
        ]);
        return !isInUncontrollableNode
    }
}
