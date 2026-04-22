import { TextlintFixResult } from "@textlint/kernel";

const fs = require("fs");

function overWriteResult(result: TextlintFixResult): Promise<TextlintFixResult> {
    return new Promise((resolve, reject) => {
        const targetFilePath = result.filePath;
        const output = result.output;
        fs.writeFile(targetFilePath, output, (error: any, result: TextlintFixResult) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

export class TextLintFixer {
    /**
     * write output to each files and return promise
     * @param textFixMessages
     * @returns {Promise}
     */
    write(textFixMessages: TextlintFixResult[]) {
        const promises = textFixMessages.map(overWriteResult);
        return Promise.all(promises);
    }
}
