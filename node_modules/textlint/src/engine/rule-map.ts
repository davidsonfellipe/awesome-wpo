// LICENSE : MIT
"use strict";
import { MapLike } from "map-like";

/**
 * @typedef {{key: Function}} RulesObject
 */
export class RuleMap extends MapLike<string, Function> {
    /**
     * has rule at least one > 0
     * @returns {boolean}
     */
    hasRuleAtLeastOne() {
        return this.keys().length > 0;
    }

    getAllRuleNames() {
        return this.keys();
    }

    getRule(ruleKey: string) {
        return this.get(ruleKey);
    }

    /**
     * @returns {RulesObject}
     */
    getAllRules() {
        return this.toJSON();
    }

    isDefinedRule(ruleKey: string) {
        return this.has(ruleKey);
    }

    /**
     * @param {string} ruleKey
     * @param ruleHandler
     */
    defineRule(ruleKey: string, ruleHandler: Function | undefined) {
        this.set(ruleKey, ruleHandler);
    }

    /**
     * reset defined rules
     */
    resetRules() {
        this.clear();
    }

    toJSON() {
        const object: { [index: string]: any } = {};
        this.forEach((value, key) => {
            object[key] = value;
        });
        return object;
    }
}
