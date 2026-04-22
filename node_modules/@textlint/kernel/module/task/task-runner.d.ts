import { default as TextLintCoreTask, IgnoreReportedMessage, LintReportedMessage } from "./textlint-core-task";
export default class TaskRunner {
    /**
     * Task and return promise
     * @param {TextLintCoreTask} task
     * @returns {Promise}
     */
    static process(task: TextLintCoreTask): Promise<Array<LintReportedMessage | IgnoreReportedMessage>>;
}
