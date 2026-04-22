import { TextlintPackageNamePrefix } from "./TextlintPackagePrefix";
import { removePrefixFromPackageName, splitKeyToPresetSubRule } from "./KeyPathUtil";

/**
 * normalize `keyPath` that is specific path for rule
 * This normalize function handle ambiguity `key`
 * `keyPath` is one of "preset/rule` key, or "rule" key
 *
 * Note: `textlint-rule-textlint-rule-x`(twice!) is normalized at once.
 * It is edge case and this function can not treat it.
 * @param keyPath
 */
export const normalizeTextlintKeyPath = (keyPath: string) => {
    const { preset, rule } = splitKeyToPresetSubRule(keyPath);
    if (!preset) {
        return normalizeTextlintRuleKey(rule);
    }
    return `${normalizeTextlintRulePresetKey(preset)}/${normalizeTextlintRuleKey(rule)}`;
};
/**
 * Normalize to preset-name/rule-name
 */
export const normalizeTextlintPresetSubRuleKey = (names: { preset: string; rule: string }) => {
    const { preset, rule } = names;
    return `${normalizeTextlintRulePresetKey(preset)}/${normalizeTextlintRuleKey(rule)}`;
};
/**
 * Normalize rule key
 * @param name
 */
export const normalizeTextlintRuleKey = (name: string) => {
    return removePrefixFromPackageName([TextlintPackageNamePrefix.rule], name);
};
/**
 * Normalize filter rule key
 * @param name
 */
export const normalizeTextlintFilterRuleKey = (name: string) => {
    return removePrefixFromPackageName([TextlintPackageNamePrefix.filterRule], name);
};
/**
 * Normalize rule preset key
 * @param name
 */
export const normalizeTextlintRulePresetKey = (name: string) => {
    // "preset-<name>" and "textlint-rule-preset-"
    return removePrefixFromPackageName([TextlintPackageNamePrefix.rulePreset, "preset-"], name);
};
/**
 * Normalize plugin key
 * @param name
 */
export const normalizeTextlintPluginKey = (name: string) => {
    return removePrefixFromPackageName([TextlintPackageNamePrefix.plugin], name);
};
