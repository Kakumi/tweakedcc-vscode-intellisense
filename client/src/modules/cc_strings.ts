import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class cc_stringsModule extends BaseModule {
  constructor() {
    super(`cc_strings`, `Various utilities for working with strings and text.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"wrap","detail":"wrap(text: string, width?: number): {","parameters":["text: string","width?: number"],"documentation":"Wraps a block of text, so that each line fits within the given width.\n\n**Parameters:**\n- **text: string** The string to wrap.\n- **width?: number** The width to constrain to, defaults to the width of\nthe terminal.\n\n**Returns:**\n- { string... } The wrapped input string as a list of lines.\n\n**Usage:**\n\nWrap a string and write it to the terminal.\n\n```\n\nterm.clear()\n\nlocal lines = require \"cc.strings\".wrap(\"This is a long piece of text\", 10)\n\nfor i = 1, #lines do\n\n  term.setCursorPos(1, i)\n\n  term.write(lines[i])\n\nend\n\n```"},{"label":"ensure_width","detail":"ensure_width(line: string, width?: number): string","parameters":["line: string","width?: number"],"documentation":"Makes the input string a fixed width. This either truncates it, or pads it\nwith spaces.\n\n**Parameters:**\n- **line: string** The string to normalise.\n- **width?: number** The width to constrain to, defaults to the width of\nthe terminal.\n\n**Returns:**\n- string The string with a specific width.\n\n**Usage:**\n\nrequire \"cc.strings\".ensure_width(\"a short string\", 20)\n\n```\n\nrequire \"cc.strings\".ensure_width(\"a rather long string which is truncated\", 20)\n\n```"},{"label":"split","detail":"split(str: string, deliminator: string, plain?: boolean, limit?: number): {","parameters":["str: string","deliminator: string","plain?: boolean","limit?: number"],"documentation":"Split a string into parts, each separated by a deliminator.\n\n**Parameters:**\n- **str: string** The string to split.\n- **deliminator: string** The pattern to split this string on.\n- **plain?: boolean** = false Treat the deliminator as a plain string, rather than a pattern.\n- **limit?: number** The maximum number of elements in the returned list.\n\n**Returns:**\n- { string... } The list of split strings.\n\n**Usage:**\n\nSplit a string into words.\n\n```\n\nrequire \"cc.strings\".split(\"This is a sentence.\", \"%s+\")\n\nSplit a string by \"-\" into at most 3 elements.\n\nrequire \"cc.strings\".split(\"a-separated-string-of-sorts\", \"-\", true, 3)\n\n```"}];
  }
}
