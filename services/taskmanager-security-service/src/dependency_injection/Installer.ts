import "reflect-metadata";
import { Container } from "inversify";

import SERVICE_IDENTIFIER from "./constants/Identifiers";
import { Db } from "mongodb";
import { MongoClient } from 'mongodb';
import { DB_HOST, DB_NAME, DB_CONNECTION_POOL } from "../common/appVariables";
import HelloWorldController from "../controllers/HelloWorldController";

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
    
    container.bind<HelloWorldController>(SERVICE_IDENTIFIER.HelloWorldController).to(HelloWorldController);

    // repositories
    // container.bind<ProviderRepository>(SERVICE_IDENTIFIER.ProviderRepository).to(ProviderRepository).inSingletonScope();

    // services
    // container.bind<ForgotPasswordService>(SERVICE_IDENTIFIER.ForgotPasswordService).to(ForgotPasswordService);

    // controllers
    // container.bind<ForgotPasswordController>(SERVICE_IDENTIFIER.ForgotPasswordController).to(ForgotPasswordController);

    return container;
}