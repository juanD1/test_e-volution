import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';
import UserService from '../services/UserService';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIER from '../dependency_injection/constants/Identifiers';
import { ErrorResponse } from '../models/ErrorResponse';

@injectable()
export default class UserController {
    @inject(SERVICE_IDENTIFIER.UserService)
    private _registryService: UserService;

    constructor() {
        this.create = this.create.bind(this);
        this.auth = this.auth.bind(this);
    }

    create(req: Request, res: Response, next: NextFunction) {
        this._registryService.createUser(req.body)
        .then(result => res.json(result))
        .catch((err: ErrorResponse) => {
            console.log("Error: ", err);
            apiErrorHandler(err, req, res);
        })
    }

    auth(req: Request, res: Response, next: NextFunction) {
        this._registryService.authenticateUser(req.body)
        .then(result => res.json(result))
        .catch((err: ErrorResponse) => {
            console.log("Error: ", err);
            apiErrorHandler(err, req, res);
        })
    }    
}
