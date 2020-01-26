"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Identifiers_1 = require("./dependency_injection/constants/Identifiers");
const BaseRoutes_1 = require("./BaseRoutes");
// import ForgotPasswordController from "./controllers/ForgotPasswordController";
// import ContactUsController from "./controllers/ContactUsController";
class Routes extends BaseRoutes_1.BaseRoutes {
    // private forgotPasswordController: ForgotPasswordController;
    // private contactUsController: ContactUsController;
    constructor(app, container) {
        super(app);
        this.helloWorldController = container.get(Identifiers_1.default.HelloWorldController);
        // this.forgotPasswordController = container.get<ForgotPasswordController>(SERVICE_IDENTIFIER.ForgotPasswordController);
        // this.contactUsController = container.get<ContactUsController>(SERVICE_IDENTIFIER.ContactUsController);
        app.route("/api/security/hello").get(this.helloWorldController.get);
        // app.route('/api/security/contact-us').post(this.contactUsController.sendContactUsEmail);
        // app.route('/api/security/recover-password').post(this.forgotPasswordController.recoverPassword);
        // app.route('/api/security/validate-link/:linkId').get(this.forgotPasswordController.validateLinkId);
        // app.route('/api/security/change-password').put(this.forgotPasswordController.changePassword);
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map