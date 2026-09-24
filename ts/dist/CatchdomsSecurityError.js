"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchdomsSecurityError = void 0;
class CatchdomsSecurityError extends Error {
    isCatchdomsSecurityError = true;
    sdk = 'CatchdomsSecurity';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CatchdomsSecurityError = CatchdomsSecurityError;
//# sourceMappingURL=CatchdomsSecurityError.js.map