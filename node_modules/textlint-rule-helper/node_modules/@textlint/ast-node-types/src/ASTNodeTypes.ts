// Notes: Add new Node types
// 1. Add new Node type to ASTNodeTypes
// 2. Update txtnode.md
// 3. Add test to packages/@textlint/types/test/Rule/TxtNode-test.ts

/**
 * ASTNodeTypes is a list of ASTNode type.
 */
export enum ASTNodeTypes {
    Document = "Document",
    DocumentExit = "Document:exit",
    Paragraph = "Paragraph",
    ParagraphExit = "Paragraph:exit",
    BlockQuote = "BlockQuote",
    BlockQuoteExit = "BlockQuote:exit",
    ListItem = "ListItem",
    ListItemExit = "ListItem:exit",
    List = "List",
    ListExit = "List:exit",
    Header = "Header",
    HeaderExit = "Header:exit",
    CodeBlock = "CodeBlock",
    CodeBlockExit = "CodeBlock:exit",
    /**
     * @deprecated use Html instead of it
     */
    HtmlBlock = "HtmlBlock",
    HtmlBlockExit = "HtmlBlock:exit",
    HorizontalRule = "HorizontalRule",
    HorizontalRuleExit = "HorizontalRule:exit",
    Comment = "Comment",
    CommentExit = "Comment:exit",
    /**
     * @deprecated
     */
    ReferenceDef = "ReferenceDef",
    /**
     * @deprecated
     */
    ReferenceDefExit = "ReferenceDef:exit",
    // inline
    Str = "Str",
    StrExit = "Str:exit",
    Break = "Break", // well-known Hard Break
    BreakExit = "Break:exit", // well-known Hard Break
    Emphasis = "Emphasis",
    EmphasisExit = "Emphasis:exit",
    Strong = "Strong",
    StrongExit = "Strong:exit",
    Html = "Html",
    HtmlExit = "Html:exit",
    Link = "Link",
    LinkExit = "Link:exit",
    LinkReference = "LinkReference",
    LinkReferenceExit = "LinkReference:exit",
    Image = "Image",
    ImageExit = "Image:exit",
    ImageReference = "ImageReference",
    ImageReferenceExit = "ImageReference:exit",
    Definition = "Definition",
    DefinitionExit = "Definition:exit",
    Code = "Code",
    CodeExit = "Code:exit",
    Delete = "Delete",
    DeleteExit = "Delete:exit",
    // Table is supported in textlint v13+
    Table = "Table",
    TableExit = "Table:exit",
    TableRow = "TableRow",
    TableRowExit = "TableRow:exit",
    TableCell = "TableCell",
    TableCellExit = "TableCell:exit"
}
