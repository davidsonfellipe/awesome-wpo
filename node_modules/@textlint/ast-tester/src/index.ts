// LICENSE : MIT
"use strict";
import * as assert from "assert";
import { TxtNode } from "@textlint/ast-node-types";
import { test as UnistTest } from "./unist-test";

export function isTxtAST(node: any): node is TxtNode {
    try {
        test(node);
    } catch (error) {
        return false;
    }
    return true;
}

export function test(node: any) {
    // test unist that is weak.
    UnistTest(node);
    assert.strictEqual(typeof node, "object");
    assert.strictEqual(typeof node.type, "string");
    assert.ok(node.type.length >= 1);

    assert.doesNotThrow(function () {
        JSON.parse(JSON.stringify(node));
    });

    // children
    if (node.children !== null && node.children !== undefined) {
        assert.ok(Array.isArray(node.children));
        node.children.forEach(test);
    }

    // value
    if (node.value !== null && node.value !== undefined) {
        assert.strictEqual(typeof node.value, "string");
    }
    // raw
    assert.ok(node.raw !== null && node.raw !== undefined);
    assert.strictEqual(typeof node.raw, "string");
    // loc
    const loc = node.loc;
    assert.ok(loc !== null && loc !== undefined);
    assert.strictEqual(typeof loc, "object");
    const start = loc.start;
    const end = loc.end;
    if (start !== null && start !== undefined) {
        assert.strictEqual(typeof start, "object");

        if (start.line !== null && start.line !== undefined) {
            assert.strictEqual(typeof start.line, "number");
            assert.ok(start.line >= 0); // allow `0` for `null`.
        }

        if (start.column !== null && start.column !== undefined) {
            assert.strictEqual(typeof start.column, "number");
            assert.ok(start.column >= 0); // allow `0` for `null`.
        }

        if (start.offset !== null && start.offset !== undefined) {
            assert.strictEqual(typeof start.offset, "number");
            assert.ok(start.offset >= 0);
        }
    }

    if (end !== null && end !== undefined) {
        assert.strictEqual(typeof end, "object");

        if (end.line !== null && end.line !== undefined) {
            assert.strictEqual(typeof end.line, "number");
            assert.ok(end.line >= 0); // allow `0` for `null`.
        }

        if (end.column !== null && end.column !== undefined) {
            assert.strictEqual(typeof end.column, "number");
            assert.ok(end.column >= 0); // allow `0` for `null`.
        }

        if (end.offset !== null && end.offset !== undefined) {
            assert.strictEqual(typeof end.offset, "number");
            assert.ok(end.offset >= 0);
        }
    }
    // range
    const range = node.range;
    assert.ok(range !== null && range !== undefined);
    assert.ok(Array.isArray(range));
    range.forEach(function (index: number) {
        assert.strictEqual(typeof index, "number");
        assert.ok(index >= 0);
    });
    assert.ok(range[0] <= range[1]);
}
