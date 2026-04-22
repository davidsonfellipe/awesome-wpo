// LICENSE : MIT

// Original code is https://github.com/azer/prettify-error
// Author : azer
"use strict";
import type { TextlintMessage, TextlintResult } from "@textlint/types";
import { FormatterOptions } from "../FormatterOptions";

const format = require("@azu/format-text");
const chalk = require("chalk");
const style = require("@azu/style-format");
const stripAnsi = require("strip-ansi");
const pluralize = require("pluralize");
// width is 2
const widthOfString = require("string-width");
// color set
let summaryColor = "yellow";
let greenColor = "green";
const template = style(
    "{grey}{ruleId}: {red}{title}{reset}\n" +
        "{grey}{filename}{reset}\n" +
        "    {red}{paddingForLineNo}  {v}{reset}\n" +
        "    {grey}{previousLineNo}. {previousLine}{reset}\n" +
        "    {reset}{failingLineNo}. {failingLine}{reset}\n" +
        "    {grey}{nextLineNo}. {nextLine}{reset}\n" +
        "    {red}{paddingForLineNo}  {^}{reset}\n" +
        ""
);

/**
 *
 * @param {string} code
 * @param {TextLintMessage} message
 * @returns {*}
 */
function failingCode(code: string, message: TextlintMessage): any {
    let result = [];
    const lines = code.split("\n");
    let i = message.line - 3;
    while (++i < message.line + 1) {
        if (i + 1 !== message.line) {
            result.push({
                line: message.line - (message.line - i - 1),
                code: lines[i]
            });
            continue;
        }

        result.push({
            line: message.line,
            col: message.column,
            code: lines[i],
            failed: true
        });
    }

    return result;
}

function showColumn(codes: string, ch: string): string {
    let result = "";
    const codeObject: any = codes[1];
    const sliced = codeObject.code.slice(0, codeObject.col);
    const width = widthOfString(sliced);
    if (width <= 0) {
        return "";
    }
    let i = width - 1;

    while (i--) {
        result += " ";
    }

    return result + ch;
}

/**
 *
 * @param {string} code
 * @param {string} filePath
 * @param {TextLintMessage} message
 * @returns {*}
 */
function prettyError(code: string, filePath: string, message: TextlintMessage): any {
    if (!code) {
        return;
    }
    const parsed = failingCode(code, message);
    const previousLineNo = String(parsed[0].line);
    const failingLineNo = String(parsed[1].line);
    const nextLineNo = String(parsed[2].line);
    const linumlen = Math.max(previousLineNo.length, failingLineNo.length, nextLineNo.length);
    return format(template, {
        ruleId: message.ruleId,
        title: message.message,
        filename: filePath + ":" + message.line + ":" + message.column,
        previousLine: parsed[0].code ? parsed[0].code : "",
        previousLineNo: previousLineNo.padStart(linumlen),
        previousColNo: parsed[0].col,
        failingLine: parsed[1].code,
        failingLineNo: failingLineNo.padStart(linumlen),
        failingColNo: parsed[1].col,
        nextLine: parsed[2].code ? parsed[2].code : "",
        nextLineNo: nextLineNo.padStart(linumlen),
        nextColNo: parsed[2].col,
        paddingForLineNo: "".padStart(linumlen),
        "^": showColumn(parsed, "^"),
        v: showColumn(parsed, "v")
    });
}

/**
 *
 * @param {TextLintResult[]} results
 * @param {TextLintFormatterOption} options
 * @returns {string}
 */
function formatter(results: TextlintResult[], options: FormatterOptions) {
    // default: true
    const useColor = options.color !== undefined ? options.color : true;
    let output = "";
    let total = 0;
    let errors = 0;
    let warnings = 0;
    let totalFixable = 0;
    results.forEach(function (result) {
        const code = require("fs").readFileSync(result.filePath, "utf-8");
        const messages = result.messages;
        if (messages.length === 0) {
            return;
        }
        total += messages.length;
        messages.forEach(function (message) {
            // fixable
            const fixableIcon = message.fix ? chalk[greenColor].bold("\u2713 ") : "";
            if (message.fix) {
                totalFixable++;
            }
            if ((message as any).fatal || message.severity === 2) {
                errors++;
            } else {
                warnings++;
            }
            const r = fixableIcon + prettyError(code, result.filePath, message);
            if (r) {
                output += r + "\n";
            }
        });
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

    if (!useColor) {
        return stripAnsi(output);
    }
    return output;
}

export default formatter;
export { prettyError };
