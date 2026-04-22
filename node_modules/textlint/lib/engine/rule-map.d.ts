import { MapLike } from "map-like";
/**
 * @typedef {{key: Function}} RulesObject
 */
export declare class RuleMap extends MapLike<string, Function> {
    /**
     * has rule at least one > 0
     * @returns {boolean}
     */
    hasRuleAtLeastOne(): boolean;
    getAllRuleNames(): string[];
    getRule(ruleKey: string): Function | undefined;
    /**
     * @returns {RulesObject}
     */
    getAllRules(): {
        [index: string]: any;
    };
    isDefinedRule(ruleKey: string): boolean;
    /**
     * @param {string} ruleKey
     * @param ruleHandler
     */
    defineRule(ruleKey: string, ruleHandler: Function | undefined): void;
    /**
     * reset defined rules
     */
    resetRules(): void;
    toJSON(): {
        [index: string]: any;
    };
}
