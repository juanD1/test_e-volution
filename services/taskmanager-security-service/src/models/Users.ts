import { DBEntityModel } from "./DBEntityModel";

export enum UsersTypes {
    ADMIN='ADMIN',
    INSTRUCTOR='INSTRUCTOR',
    SECRETARY='SECRETARY'
}

export class Users extends DBEntityModel {
    public name: string;
    public email: string;
    public password: string;
    public type: UsersTypes;
    public vehicles?: [string];
}