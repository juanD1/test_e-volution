import * as express from "express";
import { Application } from "express";

import Server from "./server";
import { initContainer } from './dependency_injection/Installer';

// Servers configuration
const app: Application = express();

const port = process.env.TASKS_SERVICE_PORT || 3002;

initContainer().then((container) => {
    app.listen(port, (err: any) => {
        new Server(app, container);
        if (err) {
            console.log('*** Err: ', err);
            return err;
        }
        console.info(`Server running on : http://localhost:${port}`);
    });

}).catch((err) => {
    console.log('Error starting the server..', err);
});