"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Identifiers_1 = require("./dependency_injection/constants/Identifiers");
const BaseRoutes_1 = require("./BaseRoutes");
class Routes extends BaseRoutes_1.BaseRoutes {
    constructor(app, container) {
        super(app);
        this.taskController = container.get(Identifiers_1.default.TaskController);
        app.route("/api/tasks").post(this.taskController.create);
        app.route("/api/tasks/:userId").get(this.taskController.get);
        app.route("/api/tasks/:id").put(this.taskController.update);
        app.route("/api/tasks/:id").delete(this.taskController.delete);
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map