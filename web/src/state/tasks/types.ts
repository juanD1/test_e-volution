import { Action } from '../types';
import { Prority } from 'src/models/Task';

export interface TaskState {
  tasks: LoadedTask[] | null;
  errorMessage: string;
  taskAction: string;
  taskError: boolean;
}

export type LoadedTask = {
  id: string;
  userId: string;
  name: string;
  priority: Prority;
  expired: Date;
};

export interface TaskAction extends Action {}

export interface TaskActionError extends Action {
  response: string;
}

export interface GetTasksRequestAction extends Action {
  userId: string;
}

export interface GetTasksRequestSuccessAction extends Action {
  tasks: LoadedTask[];
}