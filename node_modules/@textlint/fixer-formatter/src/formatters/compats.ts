// LICENSE : MIT
"use strict";
import type { TextlintFixResult } from "@textlint/types";
function getMessageType(message: any) {
    if (message.fatal || message.severity === 2) {
        return "Error";
    } else {
        return "Warning";
    }
}

export function format(results: TextlintFixResult[]) {
    let output = "";
    let total = 0;

    results.forEach((result) => {
        const messages = result.applyingMessages;
        total += messages.length;

        messages.forEach((message) => {
            output += "Fixed✔ ";
            output += `${result.filePath}: `;
            output += `line ${message.line || 0}`;
            output += `, col ${message.column || 0}`;
            output += `, ${getMessageType(message)}`;
            output += ` - ${message.message}`;
            output += message.ruleId ? ` (${message.ruleId})` : "";
            output += "\n";
        });
    });

    if (total > 0) {
        output += `\n\nFixed ${total} problem${total !== 1 ? "s" : ""}`;
    }

    return output;
}
