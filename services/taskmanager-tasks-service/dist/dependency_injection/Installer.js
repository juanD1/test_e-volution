"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const Identifiers_1 = require("./constants/Identifiers");
const mongodb_1 = require("mongodb");
const appVariables_1 = require("../common/appVariables");
const TaskController_1 = require("../controllers/TaskController");
const TaskRepository_1 = require("../repositories/TaskRepository");
const TaskService_1 = require("../services/TaskService");
function initContainer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('initContainer....');
        let container = new inversify_1.Container();
        const serverOptions = {
            autoReconnect: true,
            poolSize: appVariables_1.DB_CONNECTION_POOL
        };
        console.log('Server options: ', JSON.stringify(serverOptions));
        const mongoClient = yield mongodb_1.MongoClient.connect(appVariables_1.DB_HOST, serverOptions);
        const mongoDbConnection = mongoClient.db(`${appVariables_1.DB_NAME}`);
        console.log(`MongoDB connected to ${appVariables_1.DB_NAME} ...`);
        container.bind(Identifiers_1.default.DBConnection).toConstantValue(mongoDbConnection);
        // repositories
        container.bind(Identifiers_1.default.TaskRepository).to(TaskRepository_1.TaskRepository).inSingletonScope();
        // services
        container.bind(Identifiers_1.default.TaskService).to(TaskService_1.default);
        // controllers
        container.bind(Identifiers_1.default.TaskController).to(TaskController_1.default);
        return container;
    });
}
exports.initContainer = initContainer;
//# sourceMappingURL=Installer.js.map