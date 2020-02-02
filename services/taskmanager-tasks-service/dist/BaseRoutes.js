"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoutes {
    constructor(app) {
        app.route("/api").get((req, res, next) => {
            res.json("OK");
            res.statusCode = 200;
        });
    }
}
exports.BaseRoutes = BaseRoutes;
//# sourceMappingURL=BaseRoutes.js.map