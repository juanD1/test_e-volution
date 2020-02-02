import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, CREATE_USER_REQUEST } from './constants';
import {  LoggedUser, User, LoginRequestAction, CreateUserRequestAction } from './types';
import { loginFailure, loginSuccess, createUserFailure, createUserSuccess } from './actions';
import axiosNetworkClient from '../../utils/networkLayer/axiosNetworkClient';
import { authenticateUser, createUser } from './api';

function* requestLogin(action: LoginRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, authenticateUser(action.credentials));
    const loggedUser: LoggedUser = {
      id: response.data._id,
      email: response.data.email,
      username: response.data.username,
    };
    yield put(loginSuccess(loggedUser));
  } catch (e) {
    yield put(loginFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
  }
}

function* requestCreateUser(action: CreateUserRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, createUser(action.user));
    const createdUser: User = {      
      username: response.data.username,
      email: response.data.email,
      password: response.data.password,
    };
    yield put(createUserSuccess(createdUser));
  } catch (e) {
    yield put(createUserFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
  }
}

export default function* contextSagas() {
  yield takeLatest(LOGIN_REQUEST, requestLogin);
  yield takeLatest(CREATE_USER_REQUEST, requestCreateUser);
}
