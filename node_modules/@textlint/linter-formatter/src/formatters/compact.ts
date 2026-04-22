/**
 * @fileoverview Compact reporter
 * @author Nicholas C. Zakas
 */

"use strict";
import type { TextlintResult } from "@textlint/types";

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

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
            output += result.filePath + ": ";
            output += "line " + (message.line || 0);
            output += ", col " + (message.column || 0);
            output += ", " + getMessageType(message);
            output += " - " + message.message;
            output += message.ruleId ? " (" + message.ruleId + ")" : "";
            output += "\n";
        });
    });

    if (total > 0) {
        output += "\n" + total + " problem" + (total !== 1 ? "s" : "");
    }

    return output;
}

export default formatter;
