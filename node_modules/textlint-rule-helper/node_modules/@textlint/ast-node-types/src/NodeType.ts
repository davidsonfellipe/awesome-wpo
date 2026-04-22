// ================================================================================
// Node Abstract Syntax Tree
// ================================================================================
/**
 * AST Node types list on TxtNode.
 * Constant value of types
 * @see https://github.com/textlint/textlint/blob/master/docs/txtnode.md
 */
import type { ASTNodeTypes } from "./ASTNodeTypes.js";

/**
 * Key of ASTNodeTypes or any string
 * For example, TxtNodeType is "Document".
 */
export type TxtNodeType = keyof typeof ASTNodeTypes;

/**
 * Any TxtNode types
 */
export type AnyTxtNode = TxtNode | TxtTextNode | TxtParentNode;

/**
 * Position's line start with 1.
 * Position's column start with 0.
 * This is for compatibility with JavaScript AST.
 * https://gist.github.com/azu/8866b2cb9b7a933e01fe
 */
export type TxtNodePosition = {
    line: number; // start with 1
    column: number; // start with 0
};

/**
 * Location
 */
export type TxtNodeLocation = {
    start: TxtNodePosition;
    end: TxtNodePosition;
};

/**
 * Range starts with 0
 */
export type TxtNodeRange = readonly [startIndex: number, endIndex: number];

/**
 * TxtNode is abstract interface of AST Node.
 * Probably, Real TxtNode implementation has more properties.
 */
export interface TxtNode {
    type: TxtNodeType;
    raw: string;
    range: TxtNodeRange;
    loc: TxtNodeLocation;
    // `parent` is created by runtime
    parent?: TxtParentNode;
}

/**
 * Text Node.
 * Text Node has inline value.
 * For example, `Str` Node is an TxtTextNode.
 */
export interface TxtTextNode extends TxtNode {
    value: string;
}

/**
 * Parent Node.
 * Parent Node has children that are consist of TxtParentNode or TxtTextNode
 */
export interface TxtParentNode extends TxtNode {
    children: Content[];
}

// ================================================================================
// Node types
// ================================================================================
export type AlignType = "left" | "right" | "center" | null;
export type ReferenceType = "shortcut" | "collapsed" | "full";

export type Content = TopLevelContent | ListContent | TableContent | RowContent | PhrasingContent;

/**
 * All node definition types.
 */
export type TopLevelContent = BlockContent;
/**
 * All node types that may be used where markdown block content is accepted.
 * These types are accepted inside block quotes, list items, and roots.
 */
export type BlockContent =
    | TxtParagraphNode
    | TxtHeaderNode
    | TxtHorizontalRuleNode
    | TxtBlockQuoteNode
    | TxtListNode
    | TxtTableNode
    | TxtHtmlNode
    | TxtCodeBlockNode;
/**
 * All node types that are acceptable inside lists.
 */
export type ListContent = TxtListItemNode;
/**
 * All node types that are acceptable inside tables (not table cells).
 */
export type TableContent = TxtTableRowNode;
/**
 * All node types that are acceptable inside tables rows (not table cells)
 */
export type RowContent = TxtTableCellNode;
/**
 * All node types that are acceptable in a (interactive) phrasing context (so not in links).
 */
export type PhrasingContent = TxtLinkNode | StaticPhrasingContent;
/**
 * All node types that are acceptable in a static phrasing context.
 */
export type StaticPhrasingContent =
    | TxtStrNode
    | TxtEmphasisNode
    | TxtStrongNode
    | TxtDeleteNode
    | TxtHtmlNode
    | TxtCodeNode
    | TxtBreakNode
    | TxtImageNode
    | TxtCommentNode;

export interface TxtDocumentNode extends TxtParentNode {
    type: "Document";
}

export interface TxtParagraphNode extends TxtParentNode {
    type: "Paragraph";
    children: PhrasingContent[];
}

export interface TxtHeaderNode extends TxtParentNode {
    type: "Header";
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    children: PhrasingContent[];
}

export interface TxtHorizontalRuleNode extends TxtNode {
    type: "HorizontalRule";
}

export interface TxtBlockQuoteNode extends TxtParentNode {
    type: "BlockQuote";
    children: BlockContent[];
}

export interface TxtListNode extends TxtParentNode {
    type: "List";
    ordered?: boolean | null | undefined;
    start?: number | null | undefined;
    spread?: boolean | null | undefined;
    children: ListContent[];
}

export interface TxtListItemNode extends TxtParentNode {
    type: "ListItem";
    checked?: boolean | null | undefined;
    spread?: boolean | null | undefined;
    children: BlockContent[];
}

export interface TxtTableNode extends TxtParentNode {
    type: "Table";
    align?: AlignType[] | null | undefined;
    children: TableContent[];
}

export interface TxtTableRowNode extends TxtParentNode {
    type: "TableRow";
    children: RowContent[];
}

export interface TxtTableCellNode extends TxtParentNode {
    type: "TableCell";
    children: PhrasingContent[];
}

export interface TxtHtmlNode extends TxtTextNode {
    type: "Html";
}

export interface TxtCommentNode extends TxtTextNode {
    type: "Comment";
}

export interface TxtCodeBlockNode extends TxtTextNode {
    type: "CodeBlock";
    lang?: string | null | undefined;
    meta?: string | null | undefined;
}

export interface TxtStrNode extends TxtTextNode {
    type: "Str";
}

export interface TxtEmphasisNode extends TxtParentNode {
    type: "Emphasis";
    children: PhrasingContent[];
}

export interface TxtStrongNode extends TxtParentNode {
    type: "Strong";
    children: PhrasingContent[];
}

export interface TxtDeleteNode extends TxtParentNode {
    type: "Delete";
    children: PhrasingContent[];
}

// Inline Code
export interface TxtCodeNode extends TxtTextNode {
    type: "Code";
}

export interface TxtBreakNode extends TxtNode {
    type: "Break";
}

export interface TxtLinkNode extends TxtParentNode, TxtResource {
    type: "Link";
    children: StaticPhrasingContent[];
}

export interface TxtLinkReferenceNode extends TxtParentNode, TxtReference {
    type: "LinkReference";
    children: StaticPhrasingContent[];
    referenceType: ReferenceType;
}

export interface TxtImageNode extends TxtNode, TxtResource, TxtAlternative {
    type: "Image";
}

export interface TxtImageReferenceNode extends TxtNode, TxtAlternative, TxtReference {
    type: "ImageReference";
    referenceType: ReferenceType;
}

export interface TxtDefinitionNode extends TxtNode, TxtResource, TxtReference {
    type: "Definition";
}

// Mixin
export interface TxtResource {
    url: string;
    title?: string | null | undefined;
}

export interface TxtAlternative {
    alt?: string | null | undefined;
}

export interface TxtReference {
    identifier: string;
    label: string;
}
