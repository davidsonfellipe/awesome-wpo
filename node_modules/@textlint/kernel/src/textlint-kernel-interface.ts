// rule config
import type {
    TextlintFilterRuleOptions,
    TextlintFilterRuleReporter,
    TextlintPluginCreator,
    TextlintPluginOptions,
    TextlintRuleModule,
    TextlintRuleOptions
} from "@textlint/types";

export interface TextlintKernelConstructorOptions {
    /**
     * Suppress messages of severity:warning and severity:info
     */
    quiet?: boolean;
}

// config
export interface TextlintConfigObject {
    // rule directories path
    rulePaths?: string[];
    // filter by file extensions
    extensions?: string[];
    // formatter file name
    // e.g.) stylish.js => set "stylish"
    formatterName?: string;
    // plugin package names
    plugins?: string[];
    // base directory for loading {rule, config, plugin} modules
    rulesBaseDirectory?: string;
    // ".textlint" file path
    configFile?: string;
    // disabled rule package names
    // always should start with empty
    disabledRules?: string[];
    // preset package names
    // e.g.) ["preset-foo"]
    presets?: string[];
    // rules config object
    rulesConfig?: Object;
    /**
     * quite options
     */
    quiet?: boolean;
}

export interface TextlintKernelPlugin {
    // plugin name as key
    // this key should be normalized
    pluginId: string;
    // plugin module
    // For example, `plugin: require("@textlint/textlint-plugin-markdown")`
    plugin: TextlintPluginCreator;
    // plugin options
    options?: TextlintPluginOptions | boolean;
}

export interface TextlintKernelRule {
    // rule name as key
    // this key should be normalized
    ruleId: string;
    // rule module
    // For example, `rule: require("textlint-rule-example")`
    rule: TextlintRuleModule;
    // rule options
    // Often rule option is written in .textlintrc
    options?: TextlintRuleOptions | boolean;
}

export interface TextlintKernelFilterRule {
    // filter rule name as key
    // this key should be normalized
    ruleId: string;
    // filter rule module instance
    rule: TextlintFilterRuleReporter;
    // filter rule options
    // Often rule option is written in .textlintrc
    options?: TextlintFilterRuleOptions | boolean;
}

export interface TextlintKernelOptions {
    // file type
    // For example) .md
    ext: string;
    // file path
    filePath?: string;
    // plugins
    plugins?: TextlintKernelPlugin[];
    // rules
    rules?: TextlintKernelRule[];
    // filterRules
    filterRules?: TextlintKernelFilterRule[];
    // config base directory
    // It is a value of context.getConfigBaseDir.
    configBaseDir?: string;
}
