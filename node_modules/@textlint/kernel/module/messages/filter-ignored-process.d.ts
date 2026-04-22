import { IgnoreReportedMessage, LintReportedMessage } from "../task/textlint-core-task";
/**
 * filter messages by ignore messages
 * @param {Object[]} messages
 * @returns {Object[]} filtered messages
 */
export default function filterMessages(messages?: ReadonlyArray<LintReportedMessage | IgnoreReportedMessage>): LintReportedMessage[];
