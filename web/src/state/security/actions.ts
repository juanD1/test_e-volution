import * as actionsTypes from './constants';
import { 
  Credentials,
  User,
  LoggedUser,
  LoginRequestAction,
  LoginSuccessAction,
  CreateUserRequestAction,
  CreateUserSuccessAction,
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

export const createUserRequest = (user: User): CreateUserRequestAction => {
  return {
    type: actionsTypes.CREATE_USER_REQUEST,
    user
  };
};

export const createUserSuccess = (user: User): CreateUserSuccessAction => {
  return {
    type: actionsTypes.CREATE_USER_SUCCESS,
    user
  };  
};

export const createUserFailure = (response: string): SecurityActionError => {
  return {
    type: actionsTypes.CREATE_USER_FAILURE,
    response
  };
};

export const clearCreateUserFailure = (): SecurityAction => {
  return {
    type: actionsTypes.CLEAR_LOGIN_FAILURE,
  };
};

export const clearSecurity = (): SecurityAction => {
  return {
    type: actionsTypes.CLEAR_SECURITY
  };
};