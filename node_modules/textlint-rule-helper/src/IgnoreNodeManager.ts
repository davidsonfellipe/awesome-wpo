// LICENSE : MIT
"use strict";
import visit from "unist-util-visit";
import { TxtNode, TxtNodeRange, TxtNodeType, TxtParentNode } from "@textlint/ast-node-types"

/**
 * Ignore node manager that manager ignored ranges.
 *
 */
export default class IgnoreNodeManager {
    private _ignoredRangeList: TxtNodeRange[];

    constructor() {
        /**
         * @type {[number,number][]}
         * @private
         */
        this._ignoredRangeList = []
    }

    /**
     * @returns {(number)[][]}
     */
    get ignoredRanges() {
        return this._ignoredRangeList;
    }

    /**
     * |.......|
     * ^       ^
     * Ignored Range
     *
     *    |........|
     *    ^
     *  index
     * @param {number} index
     * @returns {boolean}
     */
    isIgnoredIndex(index: number) {
        return this._ignoredRangeList.some(range => {
            const [start, end] = range;
            return start <= index && index < end;
        })
    }

    /**
     * @param {[number, number]} aRange
     * @returns {boolean}
     * @deprecated This method will be removed
     */
    isIgnoredRange(aRange: TxtNodeRange) {
        return this.isIgnoredIndex(aRange[0]) || this.isIgnoredIndex(aRange[1]);
    }

    /**
     * @param {Object} node
     * @returns {boolean}
     */
    isIgnored(node: TxtNode | TxtParentNode) {
        return this.isIgnoredRange(node.range);
    }

    /**
     * add node to ignore range list
     * @param {TxtNode} node
     */
    ignore(node: TxtNode | TxtParentNode) {
        this.ignoreRange(node.range);
    }

    /**
     * add range to ignore range list
     * @param {[number, number]} range
     */
    ignoreRange(range: TxtNodeRange) {
        this._ignoredRangeList.push(range);
    }

    /**
     * ignore children node of `node`,
     * if the children node has the type that is included in `ignoredNodeTypes`.
     * @param {TxtNode} targetNode
     * @param {string[]} ignoredNodeTypes
     */
    ignoreChildrenByTypes(targetNode: TxtNode | TxtParentNode, ignoredNodeTypes: TxtNodeType[]) {
        visit(targetNode, (visitedNode) => {
            // @ts-expect-error: type is TxtNodeType
            if (ignoredNodeTypes.includes(visitedNode.type)) {
                this.ignore(visitedNode as TxtNode | TxtParentNode);
            }
        });
    }
}
