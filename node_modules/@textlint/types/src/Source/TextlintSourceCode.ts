import { AnyTxtNode, ASTNodeTypes } from "@textlint/ast-node-types";

export interface TextlintSourceCodePosition {
    line: number;
    column: number;
}

/**
 * Line number starts with 1.
 * Column number starts with 0.
 */
export interface TextlintSourceCodeLocation {
    start: TextlintSourceCodePosition;
    end: TextlintSourceCodePosition;
}

export type TextlintSourceCodeRange = [number, number];
export type TextlintSourceCodeArgs = { text: string; ast: AnyTxtNode; ext: string; filePath?: string };

/**
 * This class represent of source code.
 */
export interface TextlintSourceCode {
    readonly hasBOM: boolean;
    readonly text: string;
    readonly ast: AnyTxtNode;
    readonly filePath: string | undefined;
    readonly ext: string;

    /**
     * @returns {ASTNodeTypes}
     */
    getSyntax(): typeof ASTNodeTypes;

    /**
     * get filePath
     * @returns {string|undefined}
     */
    getFilePath(): string | undefined;

    /**
     * Gets the source code for the given node.
     * @param {AnyTxtNode=} node The AST node to get the text for.
     * @param {int=} beforeCount The number of characters before the node to retrieve.
     * @param {int=} afterCount The number of characters after the node to retrieve.
     * @returns {string} The text representing the AST node.
     */
    getSource(node?: AnyTxtNode, beforeCount?: number, afterCount?: number): string;

    // StructuredSource wrapper
    /**
     * @param {TextlintSourceCodeLocation} loc - location indicator.
     * @return {[ number, number ]} range.
     */
    locationToRange(loc: TextlintSourceCodeLocation): TextlintSourceCodeRange;

    /**
     * @param {[ number, number ]} range - pair of indice.
     * @return {TextlintSourceCodeLocation} location.
     */
    rangeToLocation(range: TextlintSourceCodeRange): TextlintSourceCodeLocation;

    /**
     * @param {Position} pos - position indicator.
     * @return {number} index.
     */
    positionToIndex(pos: TextlintSourceCodePosition): number;

    /**
     * @param {number} index - index to the source code.
     * @return {Position} position.
     */
    indexToPosition(index: number): TextlintSourceCodePosition;
}
