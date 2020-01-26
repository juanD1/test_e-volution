import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

@injectable()
export default class HelloWorldController {
    constructor() {
        this.get = this.get.bind(this);
    }

    get(req: Request, res: Response, next: NextFunction) {
        const result = {
            message: 'Hello Service'
        };
        res.json(result);
    }

}
