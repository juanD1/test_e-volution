import * as actionTypes from './constants';
import { 
  LoadedTask,
  GetTasksRequestAction,
  GetTasksRequestSuccessAction,
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
  action: TaskAction | GetTasksRequestAction | GetTasksRequestSuccessAction | TaskActionError
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
    // case actionTypes.CLEAR_LOGIN_FAILURE: {
    //   return { ...state, taskError: false, errorMessage: '', taskAction: action.type, user: null };
    // }
    default:
    {
      return state;
    }
  }
};

export default TaskReducer;
