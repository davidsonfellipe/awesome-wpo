// LICENSE : MIT
"use strict";
import { AnyTxtNode, TxtNode, TxtParentNode } from "@textlint/ast-node-types";

/**
 * is TxtNode?
 */
function isNode(node: any): node is TxtNode {
    if (node == null) {
        return false;
    }
    return typeof node === "object" && (typeof node.type === "string" || typeof node.t === "string");
}

export class TxtElement {
    constructor(public node: AnyTxtNode | null) {}
}

const BREAK = {};
const SKIP = {};
const VisitorOption = {
    Break: BREAK,
    Skip: SKIP
};

class Controller {
    private __worklist!: TxtElement[];
    private __leavelist!: TxtElement[];
    private __current!: null | TxtElement;

    private __willStartTraverse() {
        this.__current = null;
        this.__worklist = [];
        this.__leavelist = [];
    }

    private __execute(
        callback: ((this: Controller, current: AnyTxtNode, parent: TxtParentNode) => any) | undefined,
        element: TxtElement
    ) {
        let result = undefined;

        const previous = this.__current;
        this.__current = element;
        if (callback) {
            const parentNode = this.__leavelist[this.__leavelist.length - 1].node as TxtParentNode;
            // ignore null element
            if (!element.node) {
                return;
            }
            result = callback.call(this, element.node, parentNode);
        }
        this.__current = previous;

        return result;
    }

    /**
     * Gets parent nodes of current node.
     * The parent nodes are returned in order from the closest parent to the outer ones.
     * Current node is {@link current}.
     * @returns {Array}
     * @public
     */
    parents(): TxtNode[] {
        let i, iz;
        // first node is sentinel
        const result: TxtNode[] = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            const txtElement = this.__leavelist[i];
            const node = txtElement.node;
            if (node) {
                result.push(node);
            }
        }
        return result;
    }

    /**
     * Gets current node during traverse.
     * @returns {TxtNode|null}
     * @public
     */
    current(): TxtNode | null {
        if (!this.__current) {
            return null;
        }
        return this.__current.node;
    }

    /**
     * Traverse AST with visitor
     * @param {TxtParentNode} root
     * @param {Visitor} visitor
     */
    traverse(root: TxtParentNode, visitor: Visitor) {
        // Note: This is based https://github.com/estools/estraverse
        // Avoid recursive call by design
        let ret;
        this.__willStartTraverse();

        // Stop object
        const sentinel = new TxtElement(null);

        // reference
        const worklist = this.__worklist;
        const leavelist = this.__leavelist;

        // initialize
        worklist.push(new TxtElement(root));
        leavelist.push(new TxtElement(null));

        while (worklist.length) {
            let element = worklist.pop();
            if (element === undefined) {
                continue;
            }
            if (element === sentinel) {
                element = leavelist.pop();
                if (element === undefined) {
                    continue;
                }
                ret = this.__execute(visitor.leave, element);

                if (ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {
                ret = this.__execute(visitor.enter, element);

                if (ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (ret === SKIP) {
                    continue;
                }

                const node = element.node;
                const candidates = Object.keys(node);

                let current = candidates.length;
                while ((current -= 1) >= 0) {
                    const key = candidates[current];
                    const candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (Array.isArray(candidate)) {
                        let current2 = candidate.length;
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue;
                            }
                            if (isNode(candidate[current2])) {
                                element = new TxtElement(candidate[current2]);
                            } else {
                                continue;
                            }
                            if (element) {
                                worklist.push(element);
                            }
                        }
                    } else if (isNode(candidate)) {
                        worklist.push(new TxtElement(candidate));
                    }
                }
            }
        }
    }
}

export interface Visitor {
    enter?(node: TxtNode, parent?: TxtParentNode): any | void;

    leave?(node: TxtNode, parent?: TxtParentNode): any | void;
}

function traverse(root: TxtParentNode, visitor: Visitor) {
    const controller = new Controller();
    return controller.traverse(root, visitor);
}

export { Controller, traverse, VisitorOption };
