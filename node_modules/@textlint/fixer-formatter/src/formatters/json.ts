// LICENSE : MIT
"use strict";
import type { TextlintFixResult } from "@textlint/types";
export default function (results: TextlintFixResult[]) {
    return JSON.stringify(results);
}
