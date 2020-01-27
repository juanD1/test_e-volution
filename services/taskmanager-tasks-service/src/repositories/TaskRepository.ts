import { injectable, inject } from 'inversify';
import { BaseRepository } from './base/BaseRepository';
import { Task } from '../models/Task';
import SERVICE_IDENTIFIER from '../dependency_injection/constants/Identifiers';
import { Db } from 'mongodb';

@injectable()
export class TaskRepository extends BaseRepository<Task> {

    constructor(@inject(SERVICE_IDENTIFIER.DBConnection) connection: Db) {
        super(connection, 'Tasks');
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(()=>resolve(), 500)).then(()=>console.log("fired"));
    }
}