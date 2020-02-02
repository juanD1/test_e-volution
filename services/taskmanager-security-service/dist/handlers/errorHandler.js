"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
winston.add(winston.transports.File, {
    filename: "server/logs/error.log",
    level: "error",
    handleExceptions: true,
    humanReadableUnhandledException: true
});
function unCoughtErrorHandler(err, req, res, next) {
    console.log('* unCoughtErrorHandler.....', err);
    winston.error(JSON.stringify(err));
    res.end({ error: err });
}
exports.unCoughtErrorHandler = unCoughtErrorHandler;
function apiErrorHandler(err, req, res) {
    console.log('* apiErrorHandler.....');
    const error = { "code": err.code, "description": err.description };
    winston.error(JSON.stringify(error));
    res.statusCode = err.status;
    res.json({ "Message": error });
}
exports.apiErrorHandler = apiErrorHandler;
function fillErrorResponse(status, code, description, stack) {
    const errorResponse = {
        status,
        code,
        description,
        stack
    };
    return errorResponse;
}
exports.fillErrorResponse = fillErrorResponse;
//# sourceMappingURL=errorHandler.js.map