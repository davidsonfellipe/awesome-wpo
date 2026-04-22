"use strict";
// Notes: Add new Node types
// 1. Add new Node type to ASTNodeTypes
// 2. Update txtnode.md
// 3. Add test to packages/@textlint/types/test/Rule/TxtNode-test.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNodeTypes = void 0;
/**
 * ASTNodeTypes is a list of ASTNode type.
 */
var ASTNodeTypes;
(function (ASTNodeTypes) {
    ASTNodeTypes["Document"] = "Document";
    ASTNodeTypes["DocumentExit"] = "Document:exit";
    ASTNodeTypes["Paragraph"] = "Paragraph";
    ASTNodeTypes["ParagraphExit"] = "Paragraph:exit";
    ASTNodeTypes["BlockQuote"] = "BlockQuote";
    ASTNodeTypes["BlockQuoteExit"] = "BlockQuote:exit";
    ASTNodeTypes["ListItem"] = "ListItem";
    ASTNodeTypes["ListItemExit"] = "ListItem:exit";
    ASTNodeTypes["List"] = "List";
    ASTNodeTypes["ListExit"] = "List:exit";
    ASTNodeTypes["Header"] = "Header";
    ASTNodeTypes["HeaderExit"] = "Header:exit";
    ASTNodeTypes["CodeBlock"] = "CodeBlock";
    ASTNodeTypes["CodeBlockExit"] = "CodeBlock:exit";
    /**
     * @deprecated use Html instead of it
     */
    ASTNodeTypes["HtmlBlock"] = "HtmlBlock";
    ASTNodeTypes["HtmlBlockExit"] = "HtmlBlock:exit";
    ASTNodeTypes["HorizontalRule"] = "HorizontalRule";
    ASTNodeTypes["HorizontalRuleExit"] = "HorizontalRule:exit";
    ASTNodeTypes["Comment"] = "Comment";
    ASTNodeTypes["CommentExit"] = "Comment:exit";
    /**
     * @deprecated
     */
    ASTNodeTypes["ReferenceDef"] = "ReferenceDef";
    /**
     * @deprecated
     */
    ASTNodeTypes["ReferenceDefExit"] = "ReferenceDef:exit";
    // inline
    ASTNodeTypes["Str"] = "Str";
    ASTNodeTypes["StrExit"] = "Str:exit";
    ASTNodeTypes["Break"] = "Break";
    ASTNodeTypes["BreakExit"] = "Break:exit";
    ASTNodeTypes["Emphasis"] = "Emphasis";
    ASTNodeTypes["EmphasisExit"] = "Emphasis:exit";
    ASTNodeTypes["Strong"] = "Strong";
    ASTNodeTypes["StrongExit"] = "Strong:exit";
    ASTNodeTypes["Html"] = "Html";
    ASTNodeTypes["HtmlExit"] = "Html:exit";
    ASTNodeTypes["Link"] = "Link";
    ASTNodeTypes["LinkExit"] = "Link:exit";
    ASTNodeTypes["LinkReference"] = "LinkReference";
    ASTNodeTypes["LinkReferenceExit"] = "LinkReference:exit";
    ASTNodeTypes["Image"] = "Image";
    ASTNodeTypes["ImageExit"] = "Image:exit";
    ASTNodeTypes["ImageReference"] = "ImageReference";
    ASTNodeTypes["ImageReferenceExit"] = "ImageReference:exit";
    ASTNodeTypes["Definition"] = "Definition";
    ASTNodeTypes["DefinitionExit"] = "Definition:exit";
    ASTNodeTypes["Code"] = "Code";
    ASTNodeTypes["CodeExit"] = "Code:exit";
    ASTNodeTypes["Delete"] = "Delete";
    ASTNodeTypes["DeleteExit"] = "Delete:exit";
    // Table is supported in textlint v13+
    ASTNodeTypes["Table"] = "Table";
    ASTNodeTypes["TableExit"] = "Table:exit";
    ASTNodeTypes["TableRow"] = "TableRow";
    ASTNodeTypes["TableRowExit"] = "TableRow:exit";
    ASTNodeTypes["TableCell"] = "TableCell";
    ASTNodeTypes["TableCellExit"] = "TableCell:exit";
})(ASTNodeTypes || (exports.ASTNodeTypes = ASTNodeTypes = {}));
//# sourceMappingURL=ASTNodeTypes.js.map