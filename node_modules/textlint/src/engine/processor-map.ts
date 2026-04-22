// LICENSE : MIT
"use strict";
import { MapLike } from "map-like";

/**
 * Processor Map object
 */
export class PluginMap extends MapLike<string, Function> {
    toJSON() {
        const object = {};
        this.forEach((value, key) => {
            (object as any)[key] = value;
        });
        return object;
    }
}
