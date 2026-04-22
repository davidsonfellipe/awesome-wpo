// LICENSE : MIT
"use strict";
const fs = require("fs");
export function readFile<T = any>(filePath: string): Promise<T> {
    return new Promise((resolve: any, reject: any) => {
        fs.readFile(filePath, "utf-8", (error: any | undefined, result: any) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}
