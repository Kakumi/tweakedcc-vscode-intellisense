"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
class Scope {
    nodes = [];
    parentScope = null;
    containsScope(otherScope) {
        let currentScope = otherScope;
        while (currentScope !== null) {
            if (currentScope === this) {
                return true;
            }
            currentScope = currentScope.parentScope;
        }
        return false;
    }
}
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map