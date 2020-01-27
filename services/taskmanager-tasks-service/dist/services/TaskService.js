"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Identifiers_1 = require("../dependency_injection/constants/Identifiers");
const errorHandler_1 = require("../handlers/errorHandler");
const errorConstants_1 = require("../common/constants/errorConstants");
let TaskService = class TaskService {
    constructor() { }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdTask = yield this.taskRepository.create(task);
                return Promise.resolve(createdTask);
            }
            catch (error) {
                return Promise.reject(errorHandler_1.fillErrorResponse(500, errorConstants_1.INTERNAL_SERVER_ERROR, 'Internal server error', error));
            }
        });
    }
    updateTask(taskId, taskNewData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                taskNewData.expired = new Date(taskNewData.expired);
                const taskToUpdate = yield this.taskRepository.findOne(taskId);
                if (taskToUpdate) {
                    yield this.taskRepository.update(taskId, taskNewData);
                    return Promise.resolve(taskNewData);
                }
                else {
                    return Promise.reject(errorHandler_1.fillErrorResponse(401, errorConstants_1.INVALID_CREDENTIALS, 'Task not found'));
                }
            }
            catch (error) {
                return Promise.reject(errorHandler_1.fillErrorResponse(500, errorConstants_1.INTERNAL_SERVER_ERROR, 'Internal server error', error));
            }
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskToDelete = yield this.taskRepository.findOne(taskId);
                if (taskToDelete) {
                    const result = yield this.taskRepository.delete(taskId);
                    return Promise.resolve(result);
                }
                else {
                    return Promise.reject(errorHandler_1.fillErrorResponse(401, errorConstants_1.INVALID_CREDENTIALS, 'Task not found'));
                }
            }
            catch (error) {
                return Promise.reject(errorHandler_1.fillErrorResponse(500, errorConstants_1.INTERNAL_SERVER_ERROR, 'Internal server error', error));
            }
        });
    }
};
__decorate([
    inversify_1.inject(Identifiers_1.default.TaskRepository)
], TaskService.prototype, "taskRepository", void 0);
TaskService = __decorate([
    inversify_1.injectable()
], TaskService);
exports.default = TaskService;
//# sourceMappingURL=TaskService.js.map