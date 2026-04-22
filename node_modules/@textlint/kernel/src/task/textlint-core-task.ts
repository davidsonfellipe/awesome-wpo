// LICENSE : MIT
"use strict";
import { TextlintRuleErrorImpl } from "../context/TextlintRuleErrorImpl";
import { PromiseEventEmitter } from "./promise-event-emitter";
import SourceLocation from "../core/source-location";
import timing from "../util/timing";
import MessageType from "../shared/type/MessageType";
import { EventEmitter } from "events";
import * as assert from "assert";
import { AnyTxtNode, TxtParentNode } from "@textlint/ast-node-types";
import type {
    TextlintFilterRuleContext,
    TextlintFilterRuleOptions,
    TextlintFilterRuleReporter,
    TextlintFilterRuleShouldIgnoreFunction,
    TextlintFilterRuleShouldIgnoreFunctionArgs,
    TextlintMessageFixCommand,
    TextlintRuleContext,
    TextlintRuleContextReportFunction,
    TextlintRuleContextReportFunctionArgs,
    TextlintRuleOptions,
    TextlintRuleReporter,
    TextlintSourceCode
} from "@textlint/types";
import { normalizeTextlintKeyPath } from "@textlint/utils";
import { TextlintRuleContextImpl } from "../context/TextlintRuleContextImpl";
import _debug from "debug";
import { Controller as TraverseController } from "@textlint/ast-traverse";

const traverseController = new TraverseController();
const debug = _debug("textlint:core-task");

class RuleTypeEmitter extends PromiseEventEmitter {}

export interface IgnoreReportedMessage {
    ruleId: string;
    type: typeof MessageType.ignore;
    // location info
    // TODO: compatible with TextLintMessage
    // line: number; // start with 1
    // column: number;// start with 1
    // // indexed-location
    // index: number;// start with 0
    range: [number, number];

    ignoringRuleId: string;
}

export interface LintReportedMessage {
    type: typeof MessageType.lint;
    ruleId: string;
    message: string;
    index: number;
    // See https://github.com/textlint/textlint/blob/master/typing/textlint.d.ts
    line: number; // start with 1(1-based line number)
    column: number; // start with 1(1-based column number)
    severity: number; // it's for compatible ESLint formatter
    fix?: TextlintMessageFixCommand;
}

/**
 * CoreTask receive AST and prepare, traverse AST, emit nodeType event!
 * You can observe task and receive "message" event that is TextLintMessage.
 */
export default abstract class TextLintCoreTask extends EventEmitter {
    private ruleTypeEmitter: RuleTypeEmitter;

    static get events() {
        return {
            // receive start event
            start: "start",
            // receive message from each rules
            message: "message",
            // receive complete event
            complete: "complete",
            // receive error event
            error: "error"
        };
    }

    constructor() {
        super();
        this.ruleTypeEmitter = new RuleTypeEmitter();
    }

    abstract start(): void;

    createShouldIgnore(): TextlintFilterRuleShouldIgnoreFunction {
        const shouldIgnore = (args: TextlintFilterRuleShouldIgnoreFunctionArgs) => {
            const { ruleId, range, optional } = args;
            assert.ok(
                typeof range[0] !== "undefined" && typeof range[1] !== "undefined" && range[0] >= 0 && range[1] >= 0,
                "ignoreRange should have actual range: " + range
            );
            // FIXME: should have index, loc
            // should be compatible with LintReportedMessage?
            const message: IgnoreReportedMessage = {
                type: MessageType.ignore,
                ruleId: ruleId,
                range: range,
                // ignoring target ruleId - default: filter all messages
                // This ruleId should be normalized, because the user can report any value
                ignoringRuleId: optional.ruleId ? normalizeTextlintKeyPath(optional.ruleId) : "*"
            };
            this.emit(TextLintCoreTask.events.message, message);
        };
        return shouldIgnore;
    }

    createReporter(sourceCode: TextlintSourceCode): TextlintRuleContextReportFunction {
        const sourceLocation = new SourceLocation(sourceCode);
        /**
         * push new RuleError to results
         * @param {ReportMessage} reportArgs
         */
        const reportFunction = (reportArgs: TextlintRuleContextReportFunctionArgs) => {
            const { ruleId, severity, ruleError } = reportArgs;
            debug("%s pushReport %s", ruleId, ruleError);
            const { line, column, fix } = sourceLocation.adjust(reportArgs);
            const index = sourceCode.positionToIndex({ line, column });
            // add TextLintMessage
            const message: LintReportedMessage = {
                type: MessageType.lint,
                ruleId: ruleId,
                message: ruleError.message,
                index,
                // See https://github.com/textlint/textlint/blob/master/typing/textlint.d.ts
                line: line, // start with 1(1-based line number)
                column: column + 1, // start with 1(1-based column number)
                severity: severity, // it's for compatible ESLint formatter
                fix: fix !== undefined ? fix : undefined
            };
            if (!(ruleError instanceof TextlintRuleErrorImpl)) {
                // FIXME: RuleReportedObject should be removed
                // `error` is a any data.
                const data = ruleError;
                (message as any).data = data;
            }
            this.emit(TextLintCoreTask.events.message, message);
        };
        return reportFunction;
    }

    /**
     * start process and emitting events.
     * You can listen message by `task.on("message", message => {})`
     * @param {SourceCode} sourceCode
     */
    startTraverser(sourceCode: TextlintSourceCode) {
        this.emit(TextLintCoreTask.events.start);
        const promiseQueue: Array<Promise<Array<void>>> = [];
        const ruleTypeEmitter = this.ruleTypeEmitter;
        traverseController.traverse(sourceCode.ast as TxtParentNode, {
            enter(node: AnyTxtNode, parent?: AnyTxtNode) {
                const type = node.type;
                Object.defineProperty(node, "parent", { value: parent });
                if (ruleTypeEmitter.listenerCount(type) > 0) {
                    const promise = ruleTypeEmitter.emit(type, node);
                    promiseQueue.push(promise);
                }
            },
            leave(node: AnyTxtNode) {
                const type = `${node.type}:exit`;
                if (ruleTypeEmitter.listenerCount(type) > 0) {
                    const promise = ruleTypeEmitter.emit(type, node);
                    promiseQueue.push(promise);
                }
            }
        });
        Promise.all(promiseQueue)
            .then(() => {
                this.emit(TextLintCoreTask.events.complete);
            })
            .catch((error) => {
                this.emit(TextLintCoreTask.events.error, error);
            });
    }

    /**
     * try to get rule object
     */
    tryToGetRuleObject(
        ruleCreator: TextlintRuleReporter,
        ruleContext: Readonly<TextlintRuleContext>,
        ruleOptions?: TextlintRuleOptions
    ) {
        try {
            return ruleCreator(ruleContext, ruleOptions);
        } catch (error) {
            error.message = `Error while loading rule '${ruleContext.id}': ${error.message}`;
            throw error;
        }
    }

    /**
     * try to get filter rule object
     */
    tryToGetFilterRuleObject(
        ruleCreator: TextlintFilterRuleReporter,
        ruleContext: Readonly<TextlintFilterRuleContext>,
        ruleOptions?: TextlintFilterRuleOptions
    ) {
        try {
            return ruleCreator(ruleContext, ruleOptions);
        } catch (error) {
            error.message = `Error while loading filter rule '${ruleContext.id}': ${error.message}`;
            throw error;
        }
    }

    /**
     * add all the node types as listeners of the rule
     * @param {Function} ruleCreator
     * @param {Readonly<RuleContext>|Readonly<FilterRuleContext>} ruleContext
     * @param {Object|boolean|undefined} ruleOptions
     * @returns {Object}
     */
    tryToAddListenRule(
        ruleCreator: TextlintRuleReporter | TextlintFilterRuleReporter,
        ruleContext: Readonly<TextlintRuleContext> | Readonly<TextlintFilterRuleContext>,
        ruleOptions?: TextlintRuleOptions | TextlintFilterRuleOptions
    ): void {
        const ruleObject =
            ruleContext instanceof TextlintRuleContextImpl
                ? this.tryToGetRuleObject(
                      ruleCreator as TextlintRuleReporter,
                      ruleContext as Readonly<TextlintRuleContext>,
                      ruleOptions
                  )
                : this.tryToGetFilterRuleObject(
                      ruleCreator as TextlintFilterRuleReporter,
                      ruleContext as Readonly<TextlintFilterRuleContext>,
                      ruleOptions
                  );
        const types = Object.keys(ruleObject);
        types.forEach((nodeType) => {
            this.ruleTypeEmitter.on(
                nodeType,
                timing.enabled ? timing.time(ruleContext.id, ruleObject[nodeType] as Function) : ruleObject[nodeType]!
            );
        });
    }
}
