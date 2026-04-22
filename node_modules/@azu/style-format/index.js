var format = require("@azu/format-text");
var ansi = require("./ansi-codes");

module.exports = styleFormat;

function styleFormat (text) {
  return format(text, ansi);
}
