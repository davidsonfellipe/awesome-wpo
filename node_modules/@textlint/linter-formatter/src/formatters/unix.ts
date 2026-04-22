/**
 * @fileoverview unix-style formatter.
 * @author oshi-shinobu
 * @copyright 2015 oshi-shinobu. All rights reserved.
 */

"use strict";
import type { TextlintResult } from "@textlint/types";

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns a canonical error level string based upon the error message passed in.
 * @param {object} message Individual error message provided by eslint
 * @returns {String} Error level string
 */
function getMessageType(message: any): string {
    if (message.fatal || message.severity === 2) {
        return "Error";
    } else {
        return "Warning";
    }
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function formatter(results: TextlintResult[]) {
    let output = "",
        total = 0;

    results.forEach(function (result) {
        const messages = result.messages;
        total += messages.length;

        messages.forEach(function (message) {
            output += result.filePath + ":";
            output += (message.line || 0) + ":";
            output += (message.column || 0) + ":";
            output += " " + message.message + " ";
            output += "[" + getMessageType(message) + (message.ruleId ? "/" + message.ruleId : "") + "]";
            output += "\n";
        });
    });

    if (total > 0) {
        output += "\n" + total + " problem" + (total !== 1 ? "s" : "");
    }

    return output;
}

export default formatter;
