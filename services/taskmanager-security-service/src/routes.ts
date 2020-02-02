
import { Application } from "express";

import SERVICE_IDENTIFIER from "./dependency_injection/constants/Identifiers";
import { Container } from "inversify";
import { BaseRoutes } from './BaseRoutes';
import UserController from "./controllers/UserController";

export default class Routes extends BaseRoutes {
    
    private userController: UserController;
    
    constructor(app: Application, container: Container) {
        super(app);
        this.userController = container.get<UserController>(SERVICE_IDENTIFIER.UserController);

        app.route("/api/security").post(this.userController.create);
        app.route("/api/security/auth/signin").post(this.userController.auth);
    }
}