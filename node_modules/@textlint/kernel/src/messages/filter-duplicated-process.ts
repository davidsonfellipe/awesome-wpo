// LICENSE : MIT
"use strict";
import type { TextlintMessage } from "@textlint/types";

/**
 * @param {TextlintMessage} aMessage
 * @param {TextlintMessage} bMessage
 */
const isEqualMessage = (aMessage: TextlintMessage, bMessage: TextlintMessage) => {
    return (
        aMessage.index === bMessage.index &&
        aMessage.severity === bMessage.severity &&
        aMessage.message === bMessage.message
    );
};
/**
 * filter duplicated messages
 * @param {TextlintMessage[]} messages
 * @returns {TextlintMessage[]} filtered messages
 */
export default function filterDuplicatedMessages(messages: TextlintMessage[] = []) {
    return messages.filter((message, index) => {
        const restMessages = messages.slice(index + 1);
        return !restMessages.some((restMessage) => {
            return isEqualMessage(message, restMessage);
        });
    });
}
