"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDocumentFormatEdits = buildDocumentFormatEdits;
exports.buildDocumentRangeFormatEdits = buildDocumentRangeFormatEdits;
const vscode_languageserver_1 = require("vscode-languageserver");
const lua_fmt_1 = require("lua-fmt");
const diff_1 = require("diff");
var EditAction;
(function (EditAction) {
    EditAction[EditAction["Replace"] = 0] = "Replace";
    EditAction[EditAction["Insert"] = 1] = "Insert";
    EditAction[EditAction["Delete"] = 2] = "Delete";
})(EditAction || (EditAction = {}));
class Edit {
    action;
    start;
    end;
    text = '';
    constructor(action, start) {
        this.action = action;
        this.start = start;
        this.end = vscode_languageserver_1.Position.create(0, 0);
    }
}
function getEditsFromFormattedText(documentUri, originalText, formattedText, startOffset = 0) {
    const diff = (0, lua_fmt_1.producePatch)(documentUri, originalText, formattedText);
    const unifiedDiffs = (0, diff_1.parsePatch)(diff);
    const edits = [];
    let currentEdit = null;
    for (const uniDiff of unifiedDiffs) {
        for (const hunk of uniDiff.hunks) {
            let startLine = hunk.oldStart + startOffset;
            for (const line of hunk.lines) {
                switch (line[0]) {
                    case '-':
                        if (currentEdit === null) {
                            currentEdit = new Edit(EditAction.Delete, vscode_languageserver_1.Position.create(startLine - 1, 0));
                        }
                        currentEdit.end = vscode_languageserver_1.Position.create(startLine, 0);
                        startLine++;
                        break;
                    case '+':
                        if (currentEdit === null) {
                            currentEdit = new Edit(EditAction.Insert, vscode_languageserver_1.Position.create(startLine - 1, 0));
                        }
                        else if (currentEdit.action === EditAction.Delete) {
                            currentEdit.action = EditAction.Replace;
                        }
                        currentEdit.text += line.substr(1) + '\n';
                        break;
                    case ' ':
                        startLine++;
                        if (currentEdit != null) {
                            edits.push(currentEdit);
                        }
                        currentEdit = null;
                        break;
                }
            }
        }
        if (currentEdit != null) {
            edits.push(currentEdit);
        }
    }
    return edits.map(edit => {
        switch (edit.action) {
            case EditAction.Replace:
                return vscode_languageserver_1.TextEdit.replace(vscode_languageserver_1.Range.create(edit.start, edit.end), edit.text);
            case EditAction.Insert:
                return vscode_languageserver_1.TextEdit.insert(edit.start, edit.text);
            case EditAction.Delete:
                return vscode_languageserver_1.TextEdit.del(vscode_languageserver_1.Range.create(edit.start, edit.end));
        }
    });
}
function buildDocumentFormatEdits(documentUri, document, extFormatOptions, editorFormatOptions) {
    let documentText = document.getText();
    const useTabs = extFormatOptions.useTabs || !editorFormatOptions.insertSpaces;
    const indentCount = extFormatOptions.indentCount || editorFormatOptions.tabSize;
    const formatOptions = {
        writeMode: lua_fmt_1.WriteMode.Diff,
        useTabs,
        indentCount,
        lineWidth: extFormatOptions.lineWidth,
        quotemark: extFormatOptions.singleQuote ? 'single' : 'double',
        linebreakMultipleAssignments: extFormatOptions.linebreakMultipleAssignments
    };
    let formattedText;
    try {
        formattedText = (0, lua_fmt_1.formatText)(documentText, formatOptions);
    }
    catch {
        // Return an empty array of edits in the case of failure to avoid distracting the user with the Output window
        // appearing every time there was an error formatting the document. Fixes #45.
        return [];
    }
    // Normalize the line endings so jsdiff has a chance at providing minimal edits, otherwise the diffing result will
    // be one giant edit, which isn't very friendly.
    if (process.platform === 'win32') {
        documentText = documentText.split('\r\n').join('\n');
        formattedText = formattedText.split('\r\n').join('\n');
    }
    return getEditsFromFormattedText(documentUri, documentText, formattedText);
}
function buildDocumentRangeFormatEdits(_documentUri, _document, _range, _extFormatOptions, _editorFormatOptions) {
    return [];
    // TODO: This feature is dependent on https://github.com/trixnz/lua-fmt/issues/14 to provide a reasonable
    // experience to the user.
    //
    // The code below works, but completely ignores any indentation levels that may exist in the code scope.
    // For this reason, it is temporarily disabled until the aforementioned #14 issue is resolved.
    // const documentText = document.getText();
    // const startOffset = document.offsetAt(range.start);
    // const endOffset = document.offsetAt(range.end);
    // const text = documentText.substring(startOffset, endOffset);
    // const formatOptions: UserOptions = {
    //     writeMode: WriteMode.Diff,
    // };
    // const formattedText = formatText(text, formatOptions);
    // return getEditsFromFormattedText(documentUri, text, formattedText, range.start.line);
}
//# sourceMappingURL=formatService.js.map