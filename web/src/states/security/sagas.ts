import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './constants';
import { LoginRequestAction, LoggedUser } from './types';
import { loginFailure, loginSuccess } from './actions';
import axiosNetworkClient from '../../utils/networkLayer/axiosNetworkClient';
import { authenticateUser } from './api';

function* requestLogin(action: LoginRequestAction) {
  try {
    const response = yield call(axiosNetworkClient, authenticateUser({ username: action.credentials.username, password: action.credentials.password }));
    const loggedUser: LoggedUser = {
      id: response.data._id,
      email: response.data.email,
      name: `${response.data.firstName} ${response.data.lastName}`,
    };

    yield put(loginSuccess(loggedUser));

  } catch (e) {
    console.log(e.response);
    yield put(loginFailure((e.response && e.response.data) ? e.response.data.Message.description : 'An error ocurred'));
  }
}

export default function* contextSagas() {
  yield takeLatest(LOGIN_REQUEST, requestLogin);
}
