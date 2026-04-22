/**
 * @fileoverview Stylish reporter
 * @author Sindre Sorhus
 */

"use strict";
import type { TextlintResult } from "@textlint/types";
import { FormatterOptions } from "../FormatterOptions";

const chalk = require("chalk");
const table = require("text-table");
const widthOfString = require("string-width");
const stripAnsi = require("strip-ansi");
//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Given a word and a count, append an s if count is not one.
 * @param {string} word A word in its singular form.
 * @param {int} count A number controlling whether word should be pluralized.
 * @returns {string} The original word with an s on the end if count is not one.
 */
function pluralize(word: string, count: number): string {
    return count === 1 ? word : word + "s";
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function formatter(results: TextlintResult[], options: FormatterOptions) {
    // default: true
    const useColor = options.color !== undefined ? options.color : true;

    let output = "\n";
    let total = 0;
    let totalFixable = 0;
    let errors = 0;
    let warnings = 0;
    let summaryColor = "yellow";
    let greenColor = "green";

    results.forEach(function (result) {
        const messages = result.messages;

        if (messages.length === 0) {
            return;
        }

        total += messages.length;
        output += chalk.underline(result.filePath) + "\n";

        output +=
            table(
                messages.map(function (message) {
                    let messageType;
                    // fixable
                    const fixableIcon = message.fix ? chalk[greenColor].bold("\u2713 ") : "";
                    if (message.fix) {
                        totalFixable++;
                    }
                    if ((message as any).fatal || message.severity === 2) {
                        messageType = fixableIcon + chalk.red("error");
                        summaryColor = "red";
                        errors++;
                    } else {
                        messageType = fixableIcon + chalk.yellow("warning");
                        warnings++;
                    }

                    return [
                        "",
                        message.line || 0,
                        message.column || 0,
                        messageType,
                        message.message.replace(/\.$/, ""),
                        chalk.gray(message.ruleId || "")
                    ];
                }),
                {
                    align: ["", "r", "l"],
                    stringLength: function (str: string) {
                        const lines = chalk.stripColor(str).split("\n");
                        return Math.max.apply(
                            null,
                            lines.map(function (line: string) {
                                return widthOfString(line);
                            })
                        );
                    }
                }
            )
                .split("\n")
                .map(function (el: string) {
                    return el.replace(/(\d+)\s+(\d+)/, function (_, p1, p2) {
                        return chalk.gray(p1 + ":" + p2);
                    });
                })
                .join("\n") + "\n\n";
    });

    if (total > 0) {
        output += chalk[summaryColor].bold(
            [
                "\u2716 ",
                total,
                pluralize(" problem", total),
                " (",
                errors,
                pluralize(" error", errors),
                ", ",
                warnings,
                pluralize(" warning", warnings),
                ")\n"
            ].join("")
        );
    }

    if (totalFixable > 0) {
        output += chalk[greenColor].bold(
            "✓ " + totalFixable + " fixable " + pluralize("problem", totalFixable) + ".\n"
        );
        output += "Try to run: $ " + chalk.underline("textlint --fix [file]") + "\n";
    }

    const finalOutput = total > 0 ? output : "";
    if (!useColor) {
        return stripAnsi(finalOutput);
    }
    return finalOutput;
}

export default formatter;
