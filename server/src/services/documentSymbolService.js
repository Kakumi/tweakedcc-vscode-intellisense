"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDocumentSymbols = buildDocumentSymbols;
const vscode_languageserver_1 = require("vscode-languageserver");
function buildDocumentSymbols(uri, analysis) {
    const symbols = [];
    for (const symbol of analysis.symbols.filter(sym => sym.isGlobalScope)) {
        // Populate the document's functions:
        if (symbol.kind === 'Function') {
            if (symbol.name === null) {
                continue;
            }
            symbols.push({
                name: symbol.name,
                containerName: symbol.container || undefined,
                kind: vscode_languageserver_1.SymbolKind.Function,
                location: vscode_languageserver_1.Location.create(uri, symbol.range)
            });
        }
        // Populate the document's variables:
        else if (symbol.kind === 'Variable') {
            if (symbol.name === null) {
                continue;
            }
            symbols.push({
                name: symbol.name,
                kind: vscode_languageserver_1.SymbolKind.Variable,
                location: vscode_languageserver_1.Location.create(uri, symbol.range)
            });
        }
    }
    return symbols;
}
//# sourceMappingURL=documentSymbolService.js.map