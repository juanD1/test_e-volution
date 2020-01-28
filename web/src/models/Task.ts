export enum Prority {
    HIGH='HIGH',
    MEDIUM='MEDIUM',
    LOW='LOW'
}

export interface Task {
    userId: string;
    name: string;
    priority: Prority;
    expired: Date;
}