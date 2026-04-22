// LICENSE : MIT
"use strict";

export function isPluginRuleKey(key: string) {
    // @<owner>/<plugin><>rule>
    if (key[0] === "@" && key.indexOf("/textlint-plugin") !== -1) {
        return true;
    }
    // not contain @, but contain /
    // <plugin>/<rule>
    return key[0] !== "@" && key.indexOf("/") !== -1;
}

export function isPresetRuleKey(key: string) {
    // "preset-name" is special pattern
    if (/^preset-/.test(key)) {
        return true;
    }
    if (/^textlint-rule-preset-/.test(key)) {
        return true;
    }
    // scoped module: @textlint/textlint-rule-preset-foo
    if (key[0] === "@") {
        if (key.indexOf("/preset-") !== -1 || key.indexOf("/textlint-rule-preset-") !== -1) {
            return true;
        }
    }
    return false;
}
