import type {
    TextlintFilterRuleShouldIgnoreFunction,
    TextlintRuleSeverityLevel,
    TextlintSourceCode,
    TextlintFilterRuleContextArgs,
    TextlintFilterRuleContext
} from "@textlint/types";
import { ASTNodeTypes, TxtNode } from "@textlint/ast-node-types";
import * as assert from "assert";
import { TextlintRuleErrorImpl } from "./TextlintRuleErrorImpl";

export class TextlintFilterRuleContextImpl implements TextlintFilterRuleContext {
    private _ruleId: string;
    private _ignoreReport: TextlintFilterRuleShouldIgnoreFunction;
    private _sourceCode: TextlintSourceCode;
    private _configBaseDir?: string;
    private _severityLevel: TextlintRuleSeverityLevel;

    constructor(args: TextlintFilterRuleContextArgs) {
        this._ruleId = args.ruleId;
        this._sourceCode = args.sourceCode;
        this._ignoreReport = args.ignoreReport;
        this._configBaseDir = args.configBaseDir;
        this._severityLevel = args.severityLevel;
        Object.freeze(this);
    }

    /**
     * Rule id
     * @returns {string}
     */
    get id() {
        return this._ruleId;
    }

    get severity() {
        return this._severityLevel;
    }

    /**
     * Node's type values
     * @type {TextLintNodeType}
     */
    get Syntax(): typeof ASTNodeTypes {
        return this._sourceCode.getSyntax();
    }

    /**
     * CustomError object
     * @type {RuleError}
     */
    get RuleError() {
        return TextlintRuleErrorImpl;
    }

    shouldIgnore = (range: [number, number], optional = {}) => {
        assert.ok(
            Array.isArray(range) && typeof range[0] === "number" && typeof range[1] === "number",
            "shouldIgnore([number, number]); accept range."
        );
        this._ignoreReport({ ruleId: this._ruleId, range, optional });
    };

    /**
     * Not use
     * @returns {() => void}
     */
    get report() {
        return () => {
            throw new Error("Filter rule can not report");
        };
    }

    /**
     * get file path current processing.
     */
    getFilePath = () => {
        return this._sourceCode.getFilePath();
    };

    /**
     * Gets the source code for the given node.
     * @param {TxtNode=} node The AST node to get the text for.
     * @param {int=} beforeCount The number of characters before the node to retrieve.
     * @param {int=} afterCount The number of characters after the node to retrieve.
     * @returns {string} The text representing the AST node.
     */
    getSource = (node?: TxtNode, beforeCount?: number, afterCount?: number): string => {
        return this._sourceCode.getSource(node, beforeCount, afterCount);
    };

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
    getConfigBaseDir = () => {
        return this._configBaseDir;
    };
}
