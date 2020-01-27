import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "./constants/Identifiers";
import { Db } from "mongodb";
import { MongoClient } from 'mongodb';
import { DB_HOST, DB_NAME, DB_CONNECTION_POOL } from "../common/appVariables";
import UserController from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
import UserService from "../services/UserService";

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
    container.bind<UserRepository>(SERVICE_IDENTIFIER.UserRepository).to(UserRepository).inSingletonScope();
    
    // services
    container.bind<UserService>(SERVICE_IDENTIFIER.UserService).to(UserService);
    
    // controllers
    container.bind<UserController>(SERVICE_IDENTIFIER.UserController).to(UserController);

    return container;
}