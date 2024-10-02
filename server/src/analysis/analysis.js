"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analysis = void 0;
const luaparse = __importStar(require("luaparse"));
const scope_1 = require("./scope");
const utils_1 = require("../utils");
class Analysis {
    symbols = [];
    scopeStack = [];
    globalScope = null;
    cursorScope = null;
    completionTableName = null;
    constructor() {
        luaparse.parse({
            locations: true,
            scope: true,
            wait: true,
            comments: false,
            onCreateScope: () => {
                const newScope = new scope_1.Scope();
                // Flag the first encountered scope as the global scope.
                if (this.globalScope === null) {
                    this.globalScope = newScope;
                }
                newScope.parentScope = this.scopeStack.length ? this.scopeStack[this.scopeStack.length - 1] : null;
                this.scopeStack.push(newScope);
            },
            onCreateNode: (node) => {
                // The chunk is meaningless to us, so ignore it.
                if (node.type === 'Chunk') {
                    return;
                }
                if (this.scopeStack.length === 0) {
                    throw new Error('Empty scope stack when encountering node of type ' + node.type);
                }
                const scope = this.scopeStack[this.scopeStack.length - 1];
                // Assign the scope to the node so we can access it later
                node.scope = scope;
                // And add the node to the scope for ease of iteration
                scope.nodes.push(node);
                // If the current node is our scope marker, notedown the scope it corresponds to so we know where to
                // start our search from.
                if (node.type === 'Identifier' && node.name === '__scope_marker__') {
                    this.cursorScope = scope;
                }
                else if (node.type === 'CallExpression' && node.base.type === 'MemberExpression') {
                    const { name, container } = this.getIdentifierName(node.base);
                    if (name === '__completion_helper__') {
                        this.completionTableName = container;
                    }
                }
            },
            onDestroyScope: () => {
                this.scopeStack.pop();
            }
        });
    }
    write(text) {
        luaparse.write(text);
    }
    end(text) {
        luaparse.end(text);
    }
    buildScopedSymbols(isTableScope = false) {
        // If we didn't find the scope containing the cursor, we can't provide scope-aware suggestions.
        // TODO: Fall back to just providing global symbols?
        if (this.cursorScope === null) {
            return;
        }
        if (isTableScope) {
            this.addTableScopeSymbols();
            return;
        }
        this.addScopedSymbols();
    }
    buildGlobalSymbols() {
        if (this.globalScope) {
            this.globalScope.nodes.forEach((n) => this.addSymbolsForNode(n, false));
        }
    }
    addTableScopeSymbols() {
        if (!this.completionTableName) {
            return;
        }
        let currentScope = this.cursorScope;
        let abortScopeTraversal = false;
        while (currentScope !== null) {
            for (const n of currentScope.nodes) {
                if (n.type === 'LocalStatement') {
                    // If the cursor scope has introduced a shadowing variable, don't continue traversing the scope
                    // parent tree.
                    if (currentScope === this.cursorScope &&
                        n.variables.some(ident => ident.name === this.completionTableName)) {
                        abortScopeTraversal = true;
                    }
                }
                else if (n.type === 'AssignmentStatement') {
                    // Add any member fields being assigned to the symbol
                    // filter<> specialization due to a bug in the current Typescript.
                    // Should be fixed in 2.7 by https://github.com/Microsoft/TypeScript/pull/17600
                    n.variables
                        .filter((v) => v.type === 'MemberExpression')
                        .forEach(v => {
                        if (v.base.type === 'Identifier' && v.base.name === this.completionTableName) {
                            this.addSymbolHelper(v.identifier, v.identifier.name, 'Variable', undefined, this.completionTableName);
                        }
                    });
                }
                if (n.type === 'LocalStatement' || n.type === 'AssignmentStatement') {
                    // Find the variable that matches the current symbol to provide completions for, if any.
                    let variableIndex = -1;
                    for (const [i, variable] of n.variables.entries()) {
                        if (variable.type === 'Identifier' && variable.name === this.completionTableName) {
                            variableIndex = i;
                        }
                    }
                    if (variableIndex >= 0) {
                        const variableInit = n.init[variableIndex];
                        // If the field was initialised with a table, add the fields from it.
                        if (variableInit && variableInit.type === 'TableConstructorExpression') {
                            for (const field of variableInit.fields) {
                                switch (field.type) {
                                    case 'TableKey':
                                        if (field.key.type === 'StringLiteral') {
                                            this.addSymbolHelper(field, field.key.value, 'Variable', undefined, this.completionTableName);
                                        }
                                        break;
                                    case 'TableKeyString':
                                        if (field.key.type === 'Identifier') {
                                            this.addSymbolHelper(field, field.key.name, 'Variable', undefined, this.completionTableName);
                                        }
                                        break;
                                }
                            }
                        }
                    }
                }
            }
            if (abortScopeTraversal) {
                break;
            }
            currentScope = currentScope.parentScope;
        }
    }
    addScopedSymbols() {
        // Add all of the symbols for the current cursor scope
        let currentScope = this.cursorScope;
        while (currentScope !== null) {
            currentScope.nodes.forEach((n) => this.addSymbolsForNode(n, true));
            currentScope = currentScope.parentScope;
        }
    }
    // Nodes don't necessarily need to have an identifier name, nor are their identifiers all of type 'Identifier'.
    // Return an appropriate name, given the context of the node.
    getIdentifierName(identifier) {
        if (identifier) {
            switch (identifier.type) {
                case 'Identifier':
                    return { name: identifier.name, container: null };
                case 'MemberExpression':
                    switch (identifier.base.type) {
                        case 'Identifier':
                            return { name: identifier.identifier.name, container: identifier.base.name };
                        default:
                            return { name: identifier.identifier.name, container: null };
                    }
            }
        }
        return { name: null, container: null };
    }
    addSymbolsForNode(node, scopedQuery) {
        switch (node.type) {
            case 'LocalStatement':
            case 'AssignmentStatement':
                this.addLocalAndAssignmentSymbols(node);
                break;
            case 'FunctionDeclaration':
                this.addFunctionSymbols(node, scopedQuery);
                break;
        }
    }
    addSymbolHelper(node, name, kind, container, display) {
        this.symbols.push({
            kind,
            name,
            container,
            display,
            range: (0, utils_1.getNodeRange)(node),
            isGlobalScope: node.scope === this.globalScope,
            isOuterScope: node.scope !== this.cursorScope
        });
    }
    addLocalAndAssignmentSymbols(node) {
        for (const variable of node.variables) {
            switch (variable.type) {
                case 'Identifier':
                    this.addSymbolHelper(variable, variable.name, 'Variable');
                    break;
            }
        }
    }
    addFunctionSymbols(node, scopedQuery) {
        const { name, container } = this.getIdentifierName(node.identifier);
        // filter<> specialization due to a bug in the current Typescript.
        // Should be fixed in 2.7 by https://github.com/Microsoft/TypeScript/pull/17600
        const parameters = node.parameters
            .filter((v) => v.type === 'Identifier');
        // Build a represesntation of the function declaration
        let display = 'function ';
        if (container) {
            display += container + ':';
        }
        if (name) {
            display += name;
        }
        display += '(';
        display += parameters
            .map((param) => param.name)
            .join(', ');
        display += ')';
        this.addSymbolHelper(node, name, 'Function', container || undefined, display);
        if (scopedQuery) {
            parameters
                .filter(param => param.scope.containsScope(this.cursorScope))
                .forEach((param) => {
                this.addSymbolHelper(param, param.name, 'FunctionParameter');
            });
        }
    }
}
exports.Analysis = Analysis;
//# sourceMappingURL=analysis.js.map