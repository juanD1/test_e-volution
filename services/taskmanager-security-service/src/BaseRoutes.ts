import { Application } from "express-serve-static-core";
import { Request, Response, NextFunction } from 'express';

export class BaseRoutes {

    protected app: Application;

    constructor(app: Application) { 
        app.route("/api").get((req: Request, res: Response, next: NextFunction) => {
            res.json("OK");
            res.statusCode = 200;
        })
    }
}