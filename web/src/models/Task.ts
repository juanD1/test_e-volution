export enum Prority {
    HIGH='HIGH',
    MEDIUM='MEDIUM',
    LOW='LOW'
}

export interface Task {
    _id: string;
    userId: string;
    name: string;
    priority: Prority;
    expired: Date;
}