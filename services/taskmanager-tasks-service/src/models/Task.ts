import { DBEntityModel } from "./DBEntityModel";

enum Prority {
    HIGH='HIGH',
    MEDIUM='MEDIUM',
    LOW='LOW'
}

export class Task extends DBEntityModel {
    userId: string;
    name: string;
    priority: Prority;
    expired: Date;
}