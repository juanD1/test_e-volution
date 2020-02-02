import { DBEntityModel } from "./DBEntityModel";

enum Priority {
    HIGH='HIGH',
    MEDIUM='MEDIUM',
    LOW='LOW'
}

export class Task extends DBEntityModel {
    userId: string;
    name: string;
    priority: Priority;
    expired: Date;
}