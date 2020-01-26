import { SecurityState } from './security/types';

export interface AppState {
  context: SecurityState;
}

export interface Action {
  type: string;
}

export interface ApiDefinition {
  method: string;
  headers: Object;
  path: string;
  basePath: string;
  body?: Object;
}