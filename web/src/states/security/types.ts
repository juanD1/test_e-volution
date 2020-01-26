import { Action } from '../types';

/* Reducer types */
export interface SecurityState {
  isAuthenticated: boolean;
  user: LoggedUser | null;
  authenticationError: boolean;
  errorMessage: string;
  loginAction: string;
}

/* Actions types */
export interface SecurityAction extends Action {}

export interface SecurityActionError extends Action {
  response: string;
}

export type Credentials = {
  username: string,
  password: string
};

export interface LoggedUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequestAction extends Action {
  credentials: Credentials;
}

export interface LoginSuccessAction extends Action {
  user: LoggedUser;
}