"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../handlers/errorHandler");
const inversify_1 = require("inversify");
const Identifiers_1 = require("../dependency_injection/constants/Identifiers");
let TaskController = class TaskController {
    constructor() {
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    create(req, res, next) {
        this._registryService.createTask(req.body)
            .then(result => res.json(result))
            .catch((err) => {
            console.log("Error: ", err);
            errorHandler_1.apiErrorHandler(err, req, res);
        });
    }
    get(req, res, next) {
        this._registryService.getTasks(req.params.userId)
            .then(result => res.json(result))
            .catch((err) => {
            console.log("Error: ", err);
            errorHandler_1.apiErrorHandler(err, req, res);
        });
    }
    update(req, res, next) {
        this._registryService.updateTask(req.params.id, req.body)
            .then(result => res.json(result))
            .catch((err) => {
            console.log("Error: ", err);
            errorHandler_1.apiErrorHandler(err, req, res);
        });
    }
    delete(req, res, next) {
        this._registryService.deleteTask(req.params.id)
            .then(result => res.json(result))
            .catch((err) => {
            console.log("Error: ", err);
            errorHandler_1.apiErrorHandler(err, req, res);
        });
    }
};
__decorate([
    inversify_1.inject(Identifiers_1.default.TaskService)
], TaskController.prototype, "_registryService", void 0);
TaskController = __decorate([
    inversify_1.injectable()
], TaskController);
exports.default = TaskController;
//# sourceMappingURL=TaskController.js.map