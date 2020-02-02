"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Identifiers_1 = require("./dependency_injection/constants/Identifiers");
const BaseRoutes_1 = require("./BaseRoutes");
class Routes extends BaseRoutes_1.BaseRoutes {
    constructor(app, container) {
        super(app);
        this.userController = container.get(Identifiers_1.default.UserController);
        app.route("/api/security").post(this.userController.create);
        app.route("/api/security/auth/signin").post(this.userController.auth);
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map