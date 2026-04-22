import { AbstractBacker } from "./execute-file-backers/abstruct-backer";
import { TextlintResult } from "@textlint/kernel";

export class ExecuteFileBackerManager {
    _backers: AbstractBacker[];

    /**
     * create MessageProcessManager with backers
     * @param {AbstractBacker[]} backers
     */
    constructor(backers: AbstractBacker[] = []) {
        this._backers = backers;
    }

    /**
     * @param {AbstractBacker} backer
     */
    add(backer: AbstractBacker) {
        this._backers.push(backer);
    }

    /**
     * @param {AbstractBacker} backer
     */
    remove(backer: AbstractBacker) {
        const index = this._backers.indexOf(backer);
        if (index !== -1) {
            this._backers.splice(index, 1);
        }
    }

    /**
     * process `messages` with registered processes
     */
    process(files: string[], executeFile: (filePath: string) => Promise<TextlintResult>): Promise<TextlintResult[]> {
        const unExecutedResults: Array<Promise<TextlintResult>> = [];
        const resultPromises = files
            .filter((filePath) => {
                const shouldExecute = this._backers.every((backer) => {
                    return backer.shouldExecute({ filePath });
                });
                // add fake unExecutedResults for un-executed file.
                if (!shouldExecute) {
                    unExecutedResults.push(this._createFakeResult(filePath));
                }
                return shouldExecute;
            })
            .map((filePath) => {
                return executeFile(filePath).then((result) => {
                    this._backers.forEach((backer) => {
                        backer.didExecute({ result });
                    });
                    return result;
                });
            })
            .concat(unExecutedResults);
        // wait all resolved, and call afterAll
        return Promise.all(resultPromises).then((results: TextlintResult[]) => {
            this._backers.forEach((backer) => {
                backer.afterAll();
            });
            return results;
        });
    }

    /**
     * create fake result object
     */
    private _createFakeResult(filePath: string): Promise<TextlintResult> {
        return Promise.resolve({
            filePath,
            messages: []
        });
    }
}
