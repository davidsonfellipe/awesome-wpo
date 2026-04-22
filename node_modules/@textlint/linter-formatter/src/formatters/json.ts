// LICENSE : MIT
"use strict";
import type { TextlintResult } from "@textlint/types";

function formatter(results: TextlintResult[]) {
    return JSON.stringify(results);
}

export default formatter;
