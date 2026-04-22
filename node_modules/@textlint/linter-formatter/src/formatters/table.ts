/**
 * @fileoverview "table reporter.
 * @author Gajus Kuizinas <gajus@gajus.com>
 * @copyright 2016 Gajus Kuizinas <gajus@gajus.com>. All rights reserved.
 */

"use strict";
import type { TextlintMessage } from "@textlint/types";
import { FormatterOptions } from "../FormatterOptions";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const chalk = require("chalk");
const table = require("table").default;
const pluralize = require("pluralize");
const stripAnsi = require("strip-ansi");
//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Draws text table.
 * @param {Array<Object>} messages Error messages relating to a specific file.
 * @returns {string} A text table.
 */
function drawTable(messages: TextlintMessage[]): string {
    let rows: any = [];

    if (messages.length === 0) {
        return "";
    }

    rows.push([
        chalk.bold("Line"),
        chalk.bold("Column"),
        chalk.bold("Type"),
        chalk.bold("Message"),
        chalk.bold("Rule ID")
    ]);

    messages.forEach(function (message: TextlintMessage) {
        let messageType;

        if ((message as any).fatal || message.severity === 2) {
            messageType = chalk.red("error");
        } else {
            messageType = chalk.yellow("warning");
        }

        rows.push([message.line || 0, message.column || 0, messageType, message.message, message.ruleId || ""]);
    });

    const output = table(rows, {
        columns: {
            0: {
                width: 8,
                wrapWord: true
            },
            1: {
                width: 8,
                wrapWord: true
            },
            2: {
                width: 8,
                wrapWord: true
            },
            3: {
                paddingRight: 5,
                width: 50,
                wrapWord: true
            },
            4: {
                width: 20,
                wrapWord: true
            }
        },
        drawHorizontalLine: function (index: number) {
            return index === 1;
        }
    });
    return output;
}

/**
 * Draws a report (multiple tables).
 * @param {Array} results Report results for every file.
 * @returns {string} A column of text tables.
 */
function drawReport(results: any): string {
    let files;

    files = results.map(function (result: any) {
        if (!result.messages.length) {
            return "";
        }

        return "\n" + result.filePath + "\n\n" + drawTable(result.messages);
    });

    files = files.filter(function (content: string) {
        return content.trim();
    });

    return files.join("");
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function formatter(report: any, options: FormatterOptions) {
    // default: true
    const useColor = options.color !== undefined ? options.color : true;
    let output = "";
    let errorCount = 0;
    let warningCount = 0;

    report.forEach(function (fileReport: any) {
        errorCount += fileReport.errorCount;
        warningCount += fileReport.warningCount;
    });

    if (errorCount || warningCount) {
        output = drawReport(report);
    }

    output +=
        "\n" +
        table(
            [
                [chalk.red(pluralize("Error", errorCount, true))],
                [chalk.yellow(pluralize("Warning", warningCount, true))]
            ],
            {
                columns: {
                    0: {
                        width: 110,
                        wrapWord: true
                    }
                },
                drawHorizontalLine: function () {
                    return true;
                }
            }
        );

    if (!useColor) {
        return stripAnsi(output);
    }
    return output;
}

export default formatter;
