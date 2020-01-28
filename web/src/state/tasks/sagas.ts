import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_TASKS_REQUEST } from './constants';
import { LoadedTask, GetTasksRequestAction } from './types';
import { getTasksFailure, getTasksSuccess } from './actions';
import axiosNetworkClient from '../../utils/networkLayer/axiosNetworkClient';
import { getTasksByUserId } from './api';

function* requestGetTaskByUserId(action: GetTasksRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, getTasksByUserId(action.userId));
    const tasks: LoadedTask[] = response.data;      
    yield put(getTasksSuccess(tasks));
  } catch (e) {
    yield put(getTasksFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
  }
}

// function* requestCreateUser(action: CreateUserRequestAction) {
//   try {
//     const response = yield call(axiosNetworkClient, createUser(action.user));
//     const createdUser: User = {      
//       username: response.data.username,
//       email: response.data.email,
//       password: response.data.password,
//     };
//     yield put(createUserSuccess(createdUser));
//   } catch (e) {
//     yield put(createUserFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
//     console.log(e);
//   }
// }

export default function* contextSagas() {
  yield takeLatest(GET_TASKS_REQUEST, requestGetTaskByUserId);
  // yield takeLatest(CREATE_USER_REQUEST, requestCreateUser);
}
