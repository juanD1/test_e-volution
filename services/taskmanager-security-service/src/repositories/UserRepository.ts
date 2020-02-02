import { injectable, inject } from 'inversify';
import { BaseRepository } from './base/BaseRepository';
import { User } from '../models/User';
import SERVICE_IDENTIFIER from '../dependency_injection/constants/Identifiers';
import { Db } from 'mongodb';

@injectable()
export class UserRepository extends BaseRepository<User> {

    constructor(@inject(SERVICE_IDENTIFIER.DBConnection) connection: Db) {
        super(connection, 'Users');
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(()=>resolve(), 500)).then(()=>console.log("fired"));
    }
}