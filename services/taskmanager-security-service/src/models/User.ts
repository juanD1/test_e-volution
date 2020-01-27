import { DBEntityModel } from "./DBEntityModel";

export class User extends DBEntityModel {
    username: string;
    email: string;
    password: string;
}