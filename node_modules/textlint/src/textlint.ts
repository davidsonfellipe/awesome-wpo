// LICENSE : MIT
"use strict";
/*
    Api is an implemented of linting text.


    # Usage

    First, register rules by `api.setupRules`.
    Second, lint text and get `TextlintResult` by `api.lint*`.
    Finally, cleanup by `api.resetRules`.

    ## Concept

    `textlint.js` intended to lint for a single file.

    `textlint.js` is Core API. So, carefully use it.
    You should manage `setupRules` and `resetRules` by the hand.

    ## FAQ?

    Q. How to handle multiple files?

    A. Use `cli-engine` which is wrapped `textlint.js`.

    ## More detail workflow

    - load rules
    - addEventLister each **event** of rule {@link api.setupRules}
    - parse text to AST(TxtNode)
    - traverse ast -> emit **event**
        - report(push message)
    - display messages with formatter


 */
import { TextLintCore } from "./textlint-core";
// singleton instance
export const textlint = new TextLintCore();
