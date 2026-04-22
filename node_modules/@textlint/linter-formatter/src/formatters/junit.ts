/**
 * @fileoverview jUnit Reporter
 * @author Jamund Ferguson
 */
"use strict";
import type { TextlintResult } from "@textlint/types";

const lodash = require("lodash");

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
    let output = "";

    output += '<?xml version="1.0" encoding="utf-8"?>\n';
    output += "<testsuites>\n";

    results.forEach(function (result) {
        const messages = result.messages;

        if (messages.length) {
            output +=
                '<testsuite package="org.eslint" time="0" tests="' +
                messages.length +
                '" errors="' +
                messages.length +
                '" name="' +
                result.filePath +
                '">\n';
        }

        messages.forEach(function (message) {
            const type = (message as any).fatal ? "error" : "failure";
            output += '<testcase time="0" name="org.eslint.' + (message.ruleId || "unknown") + '">';
            output += "<" + type + ' message="' + lodash.escape(message.message || "") + '">';
            output += "<![CDATA[";
            output += "line " + (message.line || 0) + ", col ";
            output += (message.column || 0) + ", " + getMessageType(message);
            output += " - " + lodash.escape(message.message || "");
            output += message.ruleId ? " (" + message.ruleId + ")" : "";
            output += "]]>";
            output += "</" + type + ">";
            output += "</testcase>\n";
        });

        if (messages.length) {
            output += "</testsuite>\n";
        }
    });

    output += "</testsuites>\n";

    return output;
}

export default formatter;
