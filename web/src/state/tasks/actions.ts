import * as actionsTypes from './constants';
import { 
  LoadedTask,
  GetTasksRequestAction,
  GetTasksRequestSuccessAction,
  CreateTaskRequestAction,
  CreateTaskRequestSuccessAction,
  UpdateTaskRequestAction,
  UpdateTaskRequestSuccessAction,
  DeleteTaskRequestAction,
  DeleteTaskRequestSuccessAction,
  TaskAction,
  TaskActionError
} from './types';
import { Task } from 'src/models/Task';

export const getTasksRequest = (userId: string): GetTasksRequestAction => {
  return {
    type: actionsTypes.GET_TASKS_REQUEST,
    userId
  };
};

export const getTasksSuccess = (tasks: LoadedTask[]): GetTasksRequestSuccessAction => {
  return {
    type: actionsTypes.GET_TASKS_SUCCESS,
    tasks
  };  
};

export const getTasksFailure = (response: string): TaskActionError => {
  return {
    type: actionsTypes.GET_TASKS_FAILURE,
    response
  };
};

export const createTaskRequest = (task: Task): CreateTaskRequestAction => {
  return {
    type: actionsTypes.CREATE_TASK_REQUEST,
    task
  };
};

export const createTaskSuccess = (task: Task): CreateTaskRequestSuccessAction => {
  return {
    type: actionsTypes.CREATE_TASK_SUCCESS,
    task
  };  
};

export const createTaskFailure = (response: string): TaskActionError => {
  return {
    type: actionsTypes.CREATE_TASK_FAILURE,
    response
  };
};

export const updateTaskRequest = (taskId: string, task: Task): UpdateTaskRequestAction => {
  return {
    type: actionsTypes.UPDATE_TASK_REQUEST,
    taskId,
    task
  };
};

export const updateTaskSuccess = (task: Task): UpdateTaskRequestSuccessAction => {
  return {
    type: actionsTypes.UPDATE_TASK_SUCCESS,
    task
  };  
};

export const updateTaskFailure = (response: string): TaskActionError => {
  return {
    type: actionsTypes.UPDATE_TASK_FAILURE,
    response
  };
};

export const deleteTaskRequest = (taskId: string): DeleteTaskRequestAction => {
  return {
    type: actionsTypes.DELETE_TASK_REQUEST,
    taskId
  };
};

export const deleteTaskSuccess = (): DeleteTaskRequestSuccessAction => {
  return {
    type: actionsTypes.DELETE_TASK_SUCCESS
  };
};

export const deleteTaskFailure = (response: string): TaskActionError => {
  return {
    type: actionsTypes.DELETE_TASK_FAILURE,
    response
  };
};

export const clearTasks = (): TaskAction => {
  return {
    type: actionsTypes.CLEAR_TASKS
  };
};