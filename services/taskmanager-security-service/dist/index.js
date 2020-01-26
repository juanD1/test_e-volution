"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("./server");
const Installer_1 = require("./dependency_injection/Installer");
// Servers configuration
const app = express();
const port = process.env.PORT || 3000;
Installer_1.initContainer().then((container) => {
    app.listen(port, (err) => {
        new server_1.default(app, container);
        if (err) {
            console.log('*** Err: ', err);
            return err;
        }
        console.info(`Server running on : http://localhost:${port}`);
    });
}).catch((err) => {
    console.log('Error starting the server..', err);
});
//# sourceMappingURL=index.js.map