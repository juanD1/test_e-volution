
import { Application } from "express";

import SERVICE_IDENTIFIER from "./dependency_injection/constants/Identifiers";
import { Container } from "inversify";
import { BaseRoutes } from './BaseRoutes';
import HelloWorldController from "./controllers/HelloWorldController";
// import ForgotPasswordController from "./controllers/ForgotPasswordController";
// import ContactUsController from "./controllers/ContactUsController";

export default class Routes extends BaseRoutes {
    
    private helloWorldController: HelloWorldController;
    // private forgotPasswordController: ForgotPasswordController;
    // private contactUsController: ContactUsController;
    
    constructor(app: Application, container: Container) {
        super(app);
        this.helloWorldController = container.get<HelloWorldController>(SERVICE_IDENTIFIER.HelloWorldController);
        // this.forgotPasswordController = container.get<ForgotPasswordController>(SERVICE_IDENTIFIER.ForgotPasswordController);
        // this.contactUsController = container.get<ContactUsController>(SERVICE_IDENTIFIER.ContactUsController);
        app.route("/api/security/hello").get(this.helloWorldController.get);
        // app.route('/api/security/contact-us').post(this.contactUsController.sendContactUsEmail);
        // app.route('/api/security/recover-password').post(this.forgotPasswordController.recoverPassword);
        // app.route('/api/security/validate-link/:linkId').get(this.forgotPasswordController.validateLinkId);
        // app.route('/api/security/change-password').put(this.forgotPasswordController.changePassword);
    }
}