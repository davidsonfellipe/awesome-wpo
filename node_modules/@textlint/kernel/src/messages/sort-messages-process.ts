// LICENSE : MIT
"use strict";
import type { TextlintMessage } from "@textlint/types";

/**
 * sort messages by line and column
 * @param {TextlintMessage[]} messages
 * @returns {TextlintMessage[]}
 */
export default function sortByLineColumn(messages: TextlintMessage[]) {
    // sort by line and column
    return messages.sort(function (a, b) {
        const lineDiff = a.line - b.line;
        if (lineDiff === 0) {
            return a.column - b.column;
        } else {
            return lineDiff;
        }
    });
}
