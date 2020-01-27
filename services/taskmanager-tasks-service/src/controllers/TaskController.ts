import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';
import TaskService from '../services/TaskService';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIER from '../dependency_injection/constants/Identifiers';
import { ErrorResponse } from '../models/ErrorResponse';

@injectable()
export default class TaskController {
    @inject(SERVICE_IDENTIFIER.TaskService)
    private _registryService: TaskService;

    constructor() {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    create(req: Request, res: Response, next: NextFunction) {
        this._registryService.createTask(req.body)
        .then(result => res.json(result))
        .catch((err: ErrorResponse) => {
            console.log("Error: ", err);
            apiErrorHandler(err, req, res);
        })
    }

    update(req: Request, res: Response, next: NextFunction) {
        this._registryService.updateTask(req.params.id, req.body)
        .then(result => res.json(result))
        .catch((err: ErrorResponse) => {
            console.log("Error: ", err);
            apiErrorHandler(err, req, res);
        })
    }

    delete(req: Request, res: Response, next: NextFunction) {
        this._registryService.deleteTask(req.params.id)
        .then(result => res.json(result))
        .catch((err: ErrorResponse) => {
            console.log("Error: ", err);
            apiErrorHandler(err, req, res);
        })
    }
}
