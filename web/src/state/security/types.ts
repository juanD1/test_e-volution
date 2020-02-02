import { Action } from '../types';

export interface SecurityState {
  isAuthenticated: boolean;
  user: LoggedUser | null;
  errorMessage: string;
  securityAction: string;
  securityError: boolean;
}

export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
};

export interface LoggedUser {
  id: string;
  username: string;
  email: string;
}

export interface SecurityAction extends Action {}

export interface SecurityActionError extends Action {
  response: string;
}

export interface LoginRequestAction extends Action {
  credentials: Credentials;
}

export interface LoginSuccessAction extends Action {
  user: LoggedUser;
}

export interface CreateUserRequestAction extends Action {
  user: User;
}

export interface CreateUserSuccessAction extends Action {
  user: User;
}