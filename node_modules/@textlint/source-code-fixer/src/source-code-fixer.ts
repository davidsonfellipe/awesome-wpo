import type { TextlintMessage, TextlintMessageFixCommand } from "@textlint/types";
import _debug from "debug";
const debug = _debug("textlint:source-code-fixer");

const BOM = "\uFEFF";

/**
 * Compares items in a messages array by line and column.
 * @param {TextlintMessage} a The first message.
 * @param {TextlintMessage} b The second message.
 * @returns {int} -1 if a comes before b, 1 if a comes after b, 0 if equal.
 * @private
 */
function compareMessagesByLocation(a: TextlintMessage, b: TextlintMessage) {
    const lineDiff = a.line - b.line;

    if (lineDiff === 0) {
        return a.column - b.column;
    } else {
        return lineDiff;
    }
}

function clone<T extends { [index: string]: any }>(object: T): T {
    return JSON.parse(JSON.stringify(object));
}

type TextLintMessageFixable = TextlintMessage & {
    fix: TextlintMessageFixCommand;
};

/**
 * It is limited version of TextlintSourceCode
 */
export type SimpleTextSourceCode = {
    text: string;
    hasBOM: boolean;
};
export type SourceCodeFixerResult = {
    fixed: boolean;
    messages: TextlintMessage[]; // have order
    applyingMessages: TextlintMessage[]; // have order
    remainingMessages: TextlintMessage[]; // have not order
    output: string;
};

/**
 * Applies the fixes to text and return string
 * use applyFixes If you want to use primitive function,
 */
export function applyFixesToText(text: string, messages: TextlintMessage[]): string {
    const hasBOM = text.charCodeAt(0) === 0xfeff;
    return applyFixesToSourceCode(
        {
            text,
            hasBOM
        },
        messages
    ).output;
}

/**
 * Applies the fixes specified by the messages to the given text. Tries to be
 * smart about the fixes and won't apply fixes over the same area in the text.
 * @param sourceCode The source code to apply the changes to.
 * @param messages The array of messages reported by textlint.
 * @returns An object containing the fixed text and any unfixed messages.
 */
export function applyFixesToSourceCode(
    sourceCode: SimpleTextSourceCode,
    messages: TextlintMessage[]
): SourceCodeFixerResult {
    debug("Applying fixes");
    const text = sourceCode.text;
    // As as result, show diff
    const remainingMessages: TextlintMessage[] = [];
    const applyingMessages: TextlintMessage[] = [];
    const cloneMessages = messages.slice();
    const fixes: TextLintMessageFixable[] = [];
    let lastFixPos = text.length;
    let prefix = sourceCode.hasBOM ? BOM : "";
    cloneMessages.forEach((problem) => {
        if (problem && problem.fix !== undefined) {
            fixes.push(problem as TextLintMessageFixable);
        } else {
            remainingMessages.push(problem);
        }
    });

    if (fixes.length) {
        debug("Found fixes to apply");

        // sort in reverse order of occurrence
        fixes.sort((a: TextLintMessageFixable, b: TextLintMessageFixable) => {
            return b.fix.range[1] - a.fix.range[1] || b.fix.range[0] - a.fix.range[0];
        });

        // split into array of characters for easier manipulation
        const chars = text.split(""); // range is code-unit based

        fixes.forEach((problem) => {
            // pickup fix range
            const fix = problem.fix;
            let start = fix.range[0];
            const end = fix.range[1];
            let insertionText = fix.text;

            if (end <= lastFixPos) {
                if (start < 0) {
                    // Remove BOM.
                    prefix = "";
                    start = 0;
                }
                if (start === 0 && insertionText[0] === BOM) {
                    // Set BOM.
                    prefix = BOM;
                    insertionText = insertionText.slice(1);
                }

                const replacedChars = chars.splice(start, end - start, insertionText);
                lastFixPos = start;
                const copyOfMessage = clone(problem);
                copyOfMessage.fix = {
                    range: [start, start + insertionText.length],
                    text: replacedChars.join("")
                };
                applyingMessages.push(copyOfMessage);
            } else {
                remainingMessages.push(problem);
            }
        });

        return {
            fixed: true,
            messages: cloneMessages, // have order
            applyingMessages: applyingMessages.reverse(), // have order
            remainingMessages: remainingMessages.sort(compareMessagesByLocation), // have not order
            output: prefix + chars.join("")
        };
    } else {
        debug("No fixes to apply");
        return {
            fixed: false,
            messages: cloneMessages,
            applyingMessages,
            remainingMessages,
            output: prefix + text
        };
    }
}

/**
 * revert text using applyingMessages
 * @param sourceCode The source code to apply the changes to.
 * @param applyingMessages The array of TextLintMessage reported by SourceCodeFixer#applyFixes
 * @returns An object containing the fixed text and any unfixed messages.
 */
export function revertSourceCode(sourceCode: SimpleTextSourceCode, applyingMessages: TextlintMessage[]): string {
    debug("Restore applied fixes");
    let text = sourceCode.text;
    applyingMessages.forEach((message) => {
        const newSource: SimpleTextSourceCode = {
            text,
            hasBOM: sourceCode.hasBOM
        };
        const result = applyFixesToSourceCode(newSource, [message]);
        text = result.output;
    });
    return text;
}
