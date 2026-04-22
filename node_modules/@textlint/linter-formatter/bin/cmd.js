#!/usr/bin/env node
var concat = require("concat-stream");
var fs = require("fs");
var run = require("../lib/linter-formatter/src/cli");
var useStdIn = process.argv.indexOf("--stdin") > -1;
if (useStdIn) {
    process.stdin.pipe(
        concat({ encoding: "string" }, function (text) {
            run(process.argv, text).then(
                function (result) {
                    console.log(result);
                    process.exit(0);
                },
                function (error) {
                    console.error(error.message);
                    console.error(error.stack);
                    process.exit(1);
                }
            );
        })
    );
} else {
    run(process.argv).then(
        function (result) {
            console.log(result);
            process.exit(0);
        },
        function (error) {
            console.error(error.message);
            console.error(error.stack);
            process.exit(1);
        }
    );
}
