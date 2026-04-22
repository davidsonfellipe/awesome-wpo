/**
 * @fileoverview JSLint XML reporter
 * @author Ian Christian Myers
 */
"use strict";

import type { TextlintResult } from "@textlint/types";

const lodash = require("lodash");

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function formatter(results: TextlintResult[]) {
    let output = "";

    output += '<?xml version="1.0" encoding="utf-8"?>';
    output += "<jslint>";

    results.forEach(function (result) {
        var messages = result.messages;

        output += '<file name="' + result.filePath + '">';

        messages.forEach(function (message) {
            output +=
                '<issue line="' +
                message.line +
                '" ' +
                'char="' +
                message.column +
                '" ' +
                // TODO: evidence is always empty string
                // See: https://github.com/textlint/textlint/issues/400
                'evidence="" ' +
                'reason="' +
                lodash.escape(message.message || "") +
                (message.ruleId ? " (" + message.ruleId + ")" : "") +
                '" />';
        });

        output += "</file>";
    });

    output += "</jslint>";

    return output;
}

export default formatter;
