export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface Task {
  _id?: string;
  userId: string;
  name: string;
  priority: Priority | String;
  expired: Date;
}
