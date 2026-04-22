// LICENSE : MIT
"use strict";
import { getFormatterList, FormatterDetail } from "@textlint/linter-formatter";
import { getFixerFormatterList, FixerFormatterDetail } from "@textlint/fixer-formatter";

const optionator = require("optionator");

const concatFormatterList = (formatterList: FormatterDetail[] | FixerFormatterDetail[]) => {
    return formatterList
        .map((formatter) => {
            return formatter.name;
        })
        .join(", ");
};

export const options = optionator({
    prepend: "textlint [options] file.md [file|dir|glob*]",
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
    options: [
        { heading: "Options" },
        {
            option: "help",
            alias: "h",
            type: "Boolean",
            description: "Show help."
        },
        {
            option: "config",
            alias: "c",
            type: "path::String",
            description: "Use configuration from this file or sharable config.",
            example: "--config /path/to/.textlintrc"
        },
        {
            option: "ignore-path",
            type: "path::String",
            description: "Specify path to a file containing patterns that describes files to ignore.",
            default: ".textlintignore",
            example: "--ignore-path /path/to/.textlintignore"
        },
        {
            option: "init",
            type: "Boolean",
            default: "false",
            description: "Create the config file if not existed."
        },
        {
            option: "fix",
            type: "Boolean",
            default: false,
            description: "Automatically fix problems",
            example: "--fix"
        },
        {
            option: "dry-run",
            type: "Boolean",
            default: false,
            description: "Enable dry-run mode for --fix. Only show result, don't change the file.",
            example: "--fix --dry-run"
        },
        {
            option: "debug",
            type: "Boolean",
            default: false,
            description: "Outputs debugging information"
        },
        {
            option: "version",
            alias: "v",
            type: "Boolean",
            description: "Outputs the version number."
        },
        {
            heading: "Using stdin"
        },
        {
            option: "stdin",
            type: "Boolean",
            default: "false",
            description: "Lint text provided on <STDIN>."
        },
        {
            option: "stdin-filename",
            type: "String",
            description: "Specify filename to process STDIN as",
            example: "cat ./README.md | textlint --stdin --stdin-filename README.md"
        },
        {
            heading: "Output"
        },
        {
            option: "output-file",
            alias: "o",
            type: "path::String",
            description: "Enable report to be written to a file."
        },
        {
            option: "format",
            alias: "f",
            type: "String",
            description: `Use a specific output format.
                             Available formatter          : ${concatFormatterList(getFormatterList())}
                             Available formatter for --fix: ${concatFormatterList(getFixerFormatterList())}`,
            example: "--format pretty-error"
        },
        {
            option: "color",
            type: "Boolean",
            default: "true",
            description: "Disable color in piped output.",
            example: "textlint --no-color"
        },
        {
            option: "quiet",
            type: "Boolean",
            default: "false",
            description: "Report errors only."
        },
        {
            heading: "Specifying rules and plugins"
        },
        {
            option: "textlintrc",
            type: "Boolean",
            default: "true",
            description: "Disable .textlintrc",
            example: "textlint --no-textlintrc --rule textlint-no-todo README.md"
        },
        {
            option: "plugin",
            type: "[String]",
            description: "Set plugin package name",
            example: "--plugin plugin-name"
        },
        {
            option: "rule",
            type: "[String]",
            description: "Set rule package name"
        },
        {
            option: "preset",
            type: "[String]",
            description: "Set preset package name and load rules from preset package."
        },
        {
            option: "rulesdir",
            type: "[path::String]",
            description: "Use additional rules from this directory"
        },
        {
            heading: "Caching"
        },
        {
            option: "cache",
            type: "Boolean",
            default: "false",
            description: "Only check changed files",
            example: "textlint --cache docs/"
        },
        {
            option: "cache-location",
            type: "path::String",
            description: "Path to the cache file or directory",
            example: 'textlint --cache --cache-location "/Users/user/.textlintcache" docs/'
        },
        {
            heading: "Experimental"
        },
        {
            option: "experimental",
            type: "Boolean",
            default: false,
            description: "Enable experimental flag.Some feature use on experimental.",
            example: "--experimental"
        },
        {
            option: "rules-base-directory",
            type: "path::String",
            description:
                "Set module base directory. textlint load modules(rules/presets/plugins) from the base directory.",
            example: 'textlint --rules-base-directory "/path/to/other/project/node_modules/"'
        },
        {
            option: "parallel",
            type: "Boolean",
            description: "Lint files in parallel",
            example: 'textlint --experimental --parallel "*.md"'
        },
        {
            option: "max-concurrency",
            type: "Number",
            description: "maxConcurrency for --parallel",
            example: "textlint --experimental --parallel --maxConcurrency 4"
        }
    ]
});
