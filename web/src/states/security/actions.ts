import * as actionsTypes from './constants';
import { 
  LoggedUser,
  Credentials,
  LoginRequestAction,
  LoginSuccessAction,
  SecurityAction,
  SecurityActionError
} from './types';

export const loginRequest = (credentials: Credentials): LoginRequestAction => {
  return {
    type: actionsTypes.LOGIN_REQUEST,
    credentials
  };
};

export const loginSuccess = (user: LoggedUser): LoginSuccessAction => {
  return {
    type: actionsTypes.LOGIN_SUCCESS,
    user
  };  
};

export const loginFailure = (response: string): SecurityActionError => {
  return {
    type: actionsTypes.LOGIN_FAILURE,
    response
  };
};

export const logoutRequest = (): SecurityAction => {
  return {
    type: actionsTypes.LOGOUT_REQUEST
  };
};

export const clearLoginFailure = (): SecurityAction => {
  return {
    type: actionsTypes.CLEAR_LOGIN_FAILURE,
  };
};