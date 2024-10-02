"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWorkspaceSymbols = buildWorkspaceSymbols;
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("../utils");
const vscode_uri_1 = __importDefault(require("vscode-uri"));
function buildWorkspaceSymbols(path, query, analysis) {
    const symbols = [];
    const uri = vscode_uri_1.default.URI.file(path);
    for (const symbol of analysis.symbols.filter(sym => sym.isGlobalScope && (0, utils_1.matchesQuery)(query, sym.name))) {
        // Populate the document's functions:
        if (symbol.kind === 'Function') {
            if (symbol.name === null) {
                continue;
            }
            symbols.push({
                name: symbol.name,
                containerName: symbol.container || undefined,
                kind: vscode_languageserver_1.SymbolKind.Function,
                location: vscode_languageserver_1.Location.create(uri.toString(), symbol.range)
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
                location: vscode_languageserver_1.Location.create(uri.toString(), symbol.range)
            });
        }
    }
    return symbols;
}
//# sourceMappingURL=workspaceSymbolService.js.map