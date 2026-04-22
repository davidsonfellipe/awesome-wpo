import { parentPort, threadId, isMainThread, workerData } from "worker_threads";
import { Config } from "../config/config";
import { TextLintEngine } from "../textlint-engine";
import { TextFixEngine } from "../textfix-engine";
import type { TextlintFixResult, TextlintResult } from "@textlint/types";

const debug = require("debug")("textlint:parallel/lint-worker");

export interface LintWorkerData {
    files: string[];
    config: Config;
    type: "lint" | "fix";
}

export type LintWorkerResults<type extends LintWorkerData["type"]> = type extends "lint"
    ? TextlintResult[]
    : TextlintFixResult[];
const { config, type, files } = workerData as LintWorkerData;
debug("Worker(%s) Start", threadId);

// Worker Main
if (isMainThread) {
    throw new Error("Worker should not be worked in mainThread");
}
const engine = type === "lint" ? new TextLintEngine(config) : new TextFixEngine(config);
engine
    .executeOnFiles(files)
    .then((results) => {
        debug("Worker(%s) Done", threadId);
        if (parentPort) {
            parentPort.postMessage(results);
        }
    })
    .catch((error) => {
        debug("Worker(%s) Error", error.stack);
        process.exitCode = 1;
    });
