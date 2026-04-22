/**
 * @fileoverview Tracks performance of individual rules.
 * @author Brandon Mills
 * @copyright 2014 Brandon Mills. All rights reserved.
 */
"use strict";
import Logger from "./logger";

/* istanbul ignore next */
/**
 * Align the string to left
 * @param {string} str string to evaluate
 * @param {int} len length of the string
 * @param {string} [ch] delimiter character
 * @returns {string} modified string
 * @private
 */
function alignLeft(str: string, len: number, ch?: string) {
    return str + new Array(len - str.length + 1).join(ch || " ");
}

/* istanbul ignore next */
/**
 * Align the string to right
 * @param {string} str string to evaluate
 * @param {int} len length of the string
 * @param {string} [ch] delimiter character
 * @returns {string} modified string
 * @private
 */
function alignRight(str: string, len: number, ch?: string) {
    return new Array(len - str.length + 1).join(ch || " ") + str;
}

const enabled = Boolean(process.env.TIMING);

const HEADERS = ["Rule", "Time (ms)", "Relative"];
const ALIGN = [alignLeft, alignRight, alignRight];

/* istanbul ignore next */
/**
 * display the data
 * @param {object} data Data object to be displayed
 * @returns {string} modified string
 * @private
 */
function display(data: any) {
    let total = 0;
    const rows = Object.keys(data)
        .map(function (key) {
            const time = data[key];
            total += time;
            return [key, time] as any;
        })
        .sort(function (a: [string, number], b: [string, number]) {
            return b[1] - a[1];
        })
        .slice(0, 10);

    rows.forEach(function (row: any) {
        row.push(((row[1] * 100) / total).toFixed(1) + "%");
        row[1] = row[1].toFixed(3);
    });

    rows.unshift(HEADERS);

    const widths: Array<number> = [];
    rows.forEach(function (row) {
        for (let i = 0; i < row.length; i++) {
            const n = row[i].length;
            if (!widths[i] || n > widths[i]) {
                widths[i] = n;
            }
        }
    });

    const table = rows.map(function (row) {
        return row
            .map(function (cell: any, index: number) {
                return ALIGN[index](cell, widths[index]);
            })
            .join(" | ");
    });
    table.splice(
        1,
        0,
        widths
            .map(function (w, index) {
                if (index !== 0 && index !== widths.length - 1) {
                    w++;
                }

                return ALIGN[index](":", w + 1, "-");
            })
            .join("|")
    );

    Logger.log(table.join("\n"));
}

/* istanbul ignore next */
export default (function () {
    const data = Object.create(null);

    /**
     * Time the run
     * @param {*} key key from the data object
     * @param {Function} fn function to be called
     * @returns {Function} function to be executed
     * @private
     */
    function time(key: string, fn: Function) {
        if (typeof data[key] === "undefined") {
            data[key] = 0;
        }

        return function () {
            let t = process.hrtime();
            fn.apply(null, Array.prototype.slice.call(arguments));
            t = process.hrtime(t);
            data[key] += t[0] * 1e3 + t[1] / 1e6;
        };
    }

    if (enabled) {
        process.on("exit", function () {
            display(data);
        });
    }

    return {
        time: time,
        enabled: enabled
    };
})();
