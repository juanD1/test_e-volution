import * as actionTypes from './constants';
import { 
  GetTasksRequestAction,
  GetTasksRequestSuccessAction,
  CreateTaskRequestAction,
  CreateTaskRequestSuccessAction,
  UpdateTaskRequestAction,
  UpdateTaskRequestSuccessAction,
  DeleteTaskRequestAction,
  DeleteTaskRequestSuccessAction,
  TaskState,
  TaskAction,
  TaskActionError
} from './types';

const defaultState: TaskState = {
  tasks: null,
  errorMessage: '',
  taskAction: '',
  taskError: false,
};


const TaskReducer = (
  state: TaskState = defaultState, 
  action: TaskAction | GetTasksRequestAction | GetTasksRequestSuccessAction | CreateTaskRequestAction | CreateTaskRequestSuccessAction | UpdateTaskRequestAction | UpdateTaskRequestSuccessAction | DeleteTaskRequestAction | DeleteTaskRequestSuccessAction | TaskActionError
) => {
  switch (action.type) {
    case actionTypes.GET_TASKS_REQUEST: {
      return {...state, taskAction: action.type};
    }
    case actionTypes.GET_TASKS_SUCCESS: {
      return { ...state, tasks: (action as GetTasksRequestSuccessAction).tasks, taskAction: action.type };
    }
    case actionTypes.GET_TASKS_FAILURE: {
      return { ...state, taskError: true, taskAction: action.type, errorMessage: (action as TaskActionError).response };
    }
    case actionTypes.CREATE_TASK_REQUEST: {
      return {...state, taskAction: action.type};
    }
    case actionTypes.CREATE_TASK_SUCCESS: {
      return { ...state, task: (action as CreateTaskRequestSuccessAction).task, taskAction: action.type };
    }
    case actionTypes.CREATE_TASK_FAILURE: {
      return { ...state, taskError: true, taskAction: action.type, errorMessage: (action as TaskActionError).response };
    }
    case actionTypes.UPDATE_TASK_REQUEST: {
      return {...state, taskAction: action.type};
    }
    case actionTypes.UPDATE_TASK_SUCCESS: {
      return { ...state, task: (action as UpdateTaskRequestSuccessAction).task, taskAction: action.type };
    }
    case actionTypes.UPDATE_TASK_FAILURE: {
      return { ...state, taskError: true, taskAction: action.type, errorMessage: (action as TaskActionError).response };
    }
    case actionTypes.DELETE_TASK_REQUEST: {
      return {...state, taskAction: action.type};
    }
    case actionTypes.DELETE_TASK_SUCCESS: {
      return { ...state, taskAction: action.type };
    }
    case actionTypes.DELETE_TASK_FAILURE: {
      return { ...state, taskError: true, taskAction: action.type, errorMessage: (action as TaskActionError).response };
    }
    case actionTypes.CLEAR_TASKS: {        
      return { ...defaultState };
    }
    default:
    {
      return state;
    }
  }
};

export default TaskReducer;
