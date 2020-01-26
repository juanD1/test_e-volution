import { Application } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { unCoughtErrorHandler } from "./handlers/errorHandler";
import { Container } from "inversify";
import Routes from "./routes";

export default class Server {

    constructor(app: Application, container: Container) {
        console.log("Server constructor...");
        this.config(app);
        new Routes(app, container);
    }

    public config(app: Application): void {
        console.log("Configuring.....");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(cors());
        app.use(unCoughtErrorHandler);
    }
}
