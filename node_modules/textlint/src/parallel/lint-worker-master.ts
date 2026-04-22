import os from "os";
import { LintWorkerData, LintWorkerResults } from "./lint-worker";
import { Config } from "../config/config";
import { findFiles, pathsToGlobPatterns } from "../util/find-util";
import { TextlintKernelDescriptor } from "@textlint/kernel";
import { pluginsObjectToKernelRule } from "../util/object-to-kernel-format";
import { TextLintModuleLoader } from "../engine/textlint-module-loader";
import { PluginMap } from "../engine/processor-map";

type Worker = import("worker_threads").Worker;
const debug = require("debug")("textlint:parallel/lint-worker-master");

const workerPath = require.resolve("./lint-worker");

export interface lintParallelOptions<T extends "lint" | "fix"> {
    type: T;
    config: Config;
    concurrency?: number;
}

const getPluginObject = (config: Config) => {
    const pluginMap = new PluginMap();
    const moduleLoader = new TextLintModuleLoader(config);
    moduleLoader.on(TextLintModuleLoader.Event.plugin, ([pluginName, plugin]) => {
        pluginMap.set(pluginName, plugin);
    });
    // load plugin
    moduleLoader.loadFromConfig(config);
    return pluginMap.toJSON();
};
// TODO: Temporal config
const MAX_CHUNK_SIZE = 256;
export const lintParallel = <T extends "lint" | "fix">(
    files: string[],
    options: lintParallelOptions<T>
): Promise<LintWorkerResults<T>> => {
    // TODO: avoid error on Node.js 12<
    const Worker = require("worker_threads").Worker;
    const descriptor = new TextlintKernelDescriptor({
        rules: [],
        plugins: pluginsObjectToKernelRule(getPluginObject(options.config), options.config.pluginsConfig),
        filterRules: []
    });
    const patterns = pathsToGlobPatterns(files, {
        extensions: descriptor.availableExtensions
    });
    const targetFiles = findFiles(patterns, { ignoreFilePath: options.config.ignoreFile });
    const concurrency = options.concurrency !== undefined ? options.concurrency : os.cpus().length;
    const chunkSize = Math.min(MAX_CHUNK_SIZE, Math.ceil(targetFiles.length / concurrency));
    const promises: Promise<LintWorkerResults<typeof options["type"]>>[] = [];

    debug("Worker concurrency: %s, chunk size: %s, target files", concurrency, chunkSize, targetFiles.length);
    for (let i = 0; i < targetFiles.length; i += chunkSize) {
        promises.push(
            new Promise((resolve, reject) => {
                const workerData: LintWorkerData = {
                    config: options.config,
                    type: options.type,
                    files: targetFiles.slice(i, i + chunkSize)
                };
                const worker: Worker = new Worker(workerPath, { workerData });
                const startDate = Date.now();
                worker.on("message", (results) => {
                    debug("Worker(%s) taken time: %s(ms)", worker.threadId, Date.now() - startDate);
                    resolve(results);
                });
                worker.on("error", reject);
                worker.on("exit", (exitCode) => {
                    if (exitCode) {
                        reject(new Error(`Worker(${worker.threadId}) stopped with exit code ${exitCode}`));
                    } else {
                        resolve();
                    }
                });
            })
        );
    }
    debug("Worker count: %s", promises.length);
    return Promise.all(promises).then((resultsInList) => {
        return resultsInList.flat();
    }) as Promise<LintWorkerResults<typeof options["type"]>>;
};
