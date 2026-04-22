// LICENSE : MIT
"use strict";
import * as fs from "fs";
import { createFormatter, getFormatterList } from "./index";

module.exports = function run(argv: string[], text: string) {
    return new Promise(function (resolve) {
        let format;
        const optionator = require("optionator")({
            prepend: "Usage: textlint-formatter [options]",
            options: [
                {
                    option: "help",
                    alias: "h",
                    type: "Boolean",
                    description: "displays help"
                },
                {
                    option: "formatter",
                    alias: "f",
                    type: "String",
                    description: "formatter name",
                    example: "textlint -f json README.md | textlint-formatter -f pretty-error"
                },
                {
                    option: "list",
                    alias: "l",
                    type: "Boolean",
                    description: "print available formatters"
                },
                {
                    option: "stdin",
                    type: "Boolean",
                    default: "false",
                    description: "Format text provided on <STDIN>."
                }
            ]
        });
        const options = optionator.parseArgv(argv);
        const files = options._;
        if (options.list) {
            return resolve(
                "Available formatters:\n" +
                    getFormatterList()
                        .map((formatter: { name: string }) => {
                            return `- ${formatter.name}`;
                        })
                        .join("\n")
            );
        }
        if (options.help || (!files.length && !text)) {
            return resolve(optionator.generateHelp());
        }
        const content = text ? text : fs.readFileSync(files[0], "utf-8");
        let jsonContent;
        try {
            jsonContent = JSON.parse(content);
        } catch (error) {
            return new Error("Content should be json. " + error.message);
        }
        if (options.formatter) {
            format = createFormatter({
                formatterName: options.formatter
            });
            return resolve(format(jsonContent));
        } else {
            // default: use stylish
            format = createFormatter({
                formatterName: "stylish"
            });
            return resolve(format(jsonContent));
        }
    });
};
