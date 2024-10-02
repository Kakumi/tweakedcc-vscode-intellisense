"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLintingErrors = buildLintingErrors;
const vscode_languageserver_1 = require("vscode-languageserver");
const child_process_1 = require("child_process");
const path_1 = require("path");
const vscode_uri_1 = __importDefault(require("vscode-uri"));
function parseDiagnostics(data) {
    const diagnostics = [];
    const errorRegex = /^.*:(\d+):(\d+)-(\d+): \(([EW]?)(\d+)\) (.*)$/mg;
    //  file line column endcolumn type code message
    const matches = data.match(errorRegex);
    if (!matches) {
        return [];
    }
    while (true) {
        const m = errorRegex.exec(data);
        if (!m) {
            break;
        }
        const [, lineStr, columnStr, endColumnStr, type, codeStr, message] = m;
        const line = Number(lineStr) - 1;
        const column = Number(columnStr) - 1;
        const columnEnd = Number(endColumnStr);
        const code = Number(codeStr);
        const mapSeverity = () => {
            switch (type) {
                case 'E':
                    return vscode_languageserver_1.DiagnosticSeverity.Error;
                case 'W':
                    return vscode_languageserver_1.DiagnosticSeverity.Warning;
                default:
                    return vscode_languageserver_1.DiagnosticSeverity.Information;
            }
        };
        diagnostics.push({
            range: vscode_languageserver_1.Range.create(line, column, line, columnEnd),
            severity: mapSeverity(),
            code,
            source: 'luacheck',
            message
        });
    }
    return diagnostics;
}
function buildLintingErrors(settings, documentUri, documentText) {
    // If a path to luacheck hasn't been provided, don't bother trying.
    if (!settings.luacheckPath) {
        return [];
    }
    const uri = vscode_uri_1.default.URI.parse(documentUri);
    const dir = (0, path_1.dirname)(uri.fsPath);
    const getLuacheckArgs = () => {
        const args = [
            '-', '--no-color', '--ranges', '--codes', `--filename "${uri.fsPath}"`
        ];
        if (settings.linting.luaCheckConfig) {
            args.push(`--config "${settings.linting.luaCheckConfig}"`);
        }
        args.push(...settings.linting.luaCheckArgs);
        return args;
    };
    const cp = (0, child_process_1.spawnSync)(`"${settings.luacheckPath}"`, getLuacheckArgs(), {
        cwd: dir,
        input: documentText,
        shell: true
    });
    // From https://luacheck.readthedocs.io/en/stable/cli.html
    // Exit code is 0 if no warnings or errors occurred.
    // Exit code is 1 if some warnings occurred but there were no syntax errors or invalid inline options.
    // Exit code is 2 if there were some syntax errors or invalid inline options.
    // Exit code is 3 if some files couldn’t be checked, typically due to an incorrect file name.
    // Exit code is 4 if there was a critical error(invalid CLI arguments, config, or cache file).
    if (cp.status === 0) {
        return [];
    }
    if (cp.status === 1 || cp.status === 2) {
        return parseDiagnostics(cp.output.join('\n'));
    }
    throw new Error('luacheck failed with error: ' + cp.stderr.toString());
}
//# sourceMappingURL=lintingService.js.map