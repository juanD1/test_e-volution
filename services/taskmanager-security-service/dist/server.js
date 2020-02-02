"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler_1 = require("./handlers/errorHandler");
const routes_1 = require("./routes");
class Server {
    constructor(app, container) {
        console.log("Server constructor...");
        this.config(app);
        new routes_1.default(app, container);
    }
    config(app) {
        console.log("Configuring.....");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(cors());
        app.use(errorHandler_1.unCoughtErrorHandler);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map