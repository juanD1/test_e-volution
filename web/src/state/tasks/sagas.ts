import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_TASKS_REQUEST, CREATE_TASK_REQUEST, UPDATE_TASK_REQUEST, DELETE_TASK_REQUEST } from './constants';
import { LoadedTask, GetTasksRequestAction, CreateTaskRequestAction, UpdateTaskRequestAction, DeleteTaskRequestAction } from './types';
import {
  getTasksRequest,
  getTasksSuccess,
  getTasksFailure,
  createTaskSuccess,
  createTaskFailure,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure
} from './actions';
import axiosNetworkClient from '../../utils/networkLayer/axiosNetworkClient';
import { getTasksByUserId, createTask, updateTask, deleteTask } from './api';
import selectors from '../selectors';
import { Task } from 'src/models/Task';

function* requestGetTaskByUserId(action: GetTasksRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, getTasksByUserId(action.userId));
    const tasks: LoadedTask[] = response.data;      
    yield put(getTasksSuccess(tasks));
  } catch (e) {
    yield put(getTasksFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
  }
}

function* requestCreateTask(action: CreateTaskRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, createTask(action.task));
    const createdTask: Task = {
      _id: response.data._id,
      userId: response.data.userId,
      name: response.data.name,
      priority: response.data.priority,
      expired: response.data.expired,
    };
    yield put(createTaskSuccess(createdTask));
  } catch (e) {
    yield put(createTaskFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
    console.log(e);
  }
}

function* requestUpdateTask(action: UpdateTaskRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, updateTask(action.taskId, action.task));
    const updatedTask: Task = {
      _id: response.data._id,
      userId: response.data.userId,
      name: response.data.name,
      priority: response.data.priority,
      expired: response.data.expired,
    };
    yield put(updateTaskSuccess(updatedTask));
  } catch (e) {
    yield put(updateTaskFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
    console.log(e);
  }
}

function* requestDeleteTask(action: DeleteTaskRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, deleteTask(action.taskId));
    yield put(deleteTaskSuccess());
    if (response) {
      const user = yield select(selectors.security.loggedUser);
      yield put(getTasksRequest(user.id));
    }
  } catch (e) {
    yield put(deleteTaskFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
    console.log(e);
  }
}

export default function* contextSagas() {
  yield takeLatest(GET_TASKS_REQUEST, requestGetTaskByUserId);
  yield takeLatest(CREATE_TASK_REQUEST, requestCreateTask);
  yield takeLatest(UPDATE_TASK_REQUEST, requestUpdateTask);
  yield takeLatest(DELETE_TASK_REQUEST, requestDeleteTask);
}
