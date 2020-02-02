import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "./constants/Identifiers";
import { Db } from "mongodb";
import { MongoClient } from 'mongodb';
import { DB_HOST, DB_NAME, DB_CONNECTION_POOL } from "../common/appVariables";
import TaskController from "../controllers/TaskController";
import { TaskRepository } from "../repositories/TaskRepository";
import TaskService from "../services/TaskService";

export async function initContainer(): Promise<Container> {
    console.log('initContainer....');
    let container = new Container();
    const serverOptions = {
        autoReconnect: true,
        poolSize: DB_CONNECTION_POOL
    };
    console.log('Server options: ', JSON.stringify(serverOptions));
    const mongoClient: MongoClient = await MongoClient.connect(DB_HOST,serverOptions);
    const mongoDbConnection = mongoClient.db(`${DB_NAME}`);
    console.log(`MongoDB connected to ${DB_NAME} ...`);
    
    container.bind<Db>(SERVICE_IDENTIFIER.DBConnection).toConstantValue(mongoDbConnection);
    
    // repositories
    container.bind<TaskRepository>(SERVICE_IDENTIFIER.TaskRepository).to(TaskRepository).inSingletonScope();
    
    // services
    container.bind<TaskService>(SERVICE_IDENTIFIER.TaskService).to(TaskService);
    
    // controllers
    container.bind<TaskController>(SERVICE_IDENTIFIER.TaskController).to(TaskController);

    return container;
}