import * as actionsTypes from './constants';
import { 
  LoadedTask,
  GetTasksRequestAction,
  GetTasksRequestSuccessAction,
  TaskAction,
  TaskActionError
} from './types';

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