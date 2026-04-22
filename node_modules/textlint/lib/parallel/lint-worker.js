"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var textlint_engine_1 = require("../textlint-engine");
var textfix_engine_1 = require("../textfix-engine");
var debug = require("debug")("textlint:parallel/lint-worker");
var _a = worker_threads_1.workerData, config = _a.config, type = _a.type, files = _a.files;
debug("Worker(%s) Start", worker_threads_1.threadId);
// Worker Main
if (worker_threads_1.isMainThread) {
    throw new Error("Worker should not be worked in mainThread");
}
var engine = type === "lint" ? new textlint_engine_1.TextLintEngine(config) : new textfix_engine_1.TextFixEngine(config);
engine
    .executeOnFiles(files)
    .then(function (results) {
    debug("Worker(%s) Done", worker_threads_1.threadId);
    if (worker_threads_1.parentPort) {
        worker_threads_1.parentPort.postMessage(results);
    }
})
    .catch(function (error) {
    debug("Worker(%s) Error", error.stack);
    process.exitCode = 1;
});
//# sourceMappingURL=lint-worker.js.map