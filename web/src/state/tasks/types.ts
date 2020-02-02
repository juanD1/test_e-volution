import { Action } from '../types';
import { Task, Priority } from 'src/models/Task';

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
  priority: Priority;
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

export interface CreateTaskRequestAction extends Action {
  task: Task;
}

export interface CreateTaskRequestSuccessAction extends Action {
  task: Task;
}

export interface UpdateTaskRequestAction extends Action {
  taskId: string;
  task: Task;
}

export interface UpdateTaskRequestSuccessAction extends Action {
  task: Task;
}

export interface DeleteTaskRequestAction extends Action {
  taskId: string;
}

export interface DeleteTaskRequestSuccessAction extends Action {  
}