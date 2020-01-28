
import { Application } from "express";

import SERVICE_IDENTIFIER from "./dependency_injection/constants/Identifiers";
import { Container } from "inversify";
import { BaseRoutes } from './BaseRoutes';
import TaskController from "./controllers/TaskController";

export default class Routes extends BaseRoutes {
    
    private taskController: TaskController;
    
    constructor(app: Application, container: Container) {
        super(app);
        this.taskController = container.get<TaskController>(SERVICE_IDENTIFIER.TaskController);

        app.route("/api/tasks").post(this.taskController.create);
        app.route("/api/tasks/:userId").get(this.taskController.get);
        app.route("/api/tasks/:id").put(this.taskController.update);
        app.route("/api/tasks/:id").delete(this.taskController.delete);
    }
}