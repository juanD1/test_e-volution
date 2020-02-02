
import { Request, Response, RequestHandler, ErrorRequestHandler, NextFunction } from "express";
import * as winston from "winston";
import { ErrorResponse } from "../models/ErrorResponse";

winston.add(winston.transports.File, {
    filename: "server/logs/error.log",
    level: "error",
    handleExceptions: true,
    humanReadableUnhandledException: true
});

export function unCoughtErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction) {
    
    console.log('* unCoughtErrorHandler.....', err);

    winston.error(JSON.stringify(err));
    res.end({ error: err });
}

export function apiErrorHandler(err: ErrorResponse, req: Request, res: Response) {
    console.log('* apiErrorHandler.....');
    const error: object = { "code": err.code, "description": err.description };
    winston.error(JSON.stringify(error));
    res.statusCode = err.status;
    res.json({ "Message": error});
}

export function fillErrorResponse(status: number, code: string, description: string, stack?: any) : ErrorResponse {
    const errorResponse: ErrorResponse = {
        status,
        code,
        description,
        stack
    }

    return errorResponse;
}