import { TextlintRuleErrorConstructor } from "./TextlintRuleError";
import { ASTNodeTypes, TxtNode } from "@textlint/ast-node-types";
import { TextlintRuleSeverityLevel } from "./TextlintRuleSeverityLevel";

/**
 * This Base class is internal.
 * @internal
 */
export interface BaseRuleContext {
    /**
     * Return rule id
     */
    id: string;

    /**
     * Node's type values
     * @type {TextLintNodeType}
     */
    Syntax: typeof ASTNodeTypes;

    /**
     * Return rule "severity" level
     */
    severity: TextlintRuleSeverityLevel;

    /**
     * CustomError object
     * @type {RuleError}
     */
    RuleError: TextlintRuleErrorConstructor;

    /**
     * get file path current processing.
     * if process text like stdin, return undefined
     */
    getFilePath(): string | undefined;

    /**
     * Gets the source code for the given node.
     * @param {TxtNode=} node The AST node to get the text for.
     * @param {int=} beforeCount The number of characters before the node to retrieve.
     * @param {int=} afterCount The number of characters after the node to retrieve.
     * @returns {string|null} The text representing the AST node.
     */
    getSource(node: TxtNode, beforeCount?: number, afterCount?: number): string;

    /**
     * get config base directory path
     * config base directory path often is the place of .textlintrc
     *
     * e.g.) /path/to/dir/.textlintrc
     * `getConfigBaseDir()` return `"/path/to/dir/"`.
     *
     * When using textlint as module, it is specified by `configBaseDir`
     * If not found the value, return undefined.
     *
     * You can use it for resolving relative path from config dir.
     * @returns {string|undefined}
     */
    getConfigBaseDir(): string | undefined;
}
