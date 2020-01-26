import {
  LoginRequestAction,
  LoginSuccessAction,
  SecurityState,
  SecurityAction,
  SecurityActionError
} from './types';
import * as actionTypes from './constants';

const defaultState: SecurityState = {
  isAuthenticated: false,
  user: null,
  authenticationError: false,
  errorMessage: '',
  loginAction: ''
};

const SecurityReducer = (
  state: SecurityState = defaultState, 
  action: SecurityAction | LoginRequestAction | LoginSuccessAction | SecurityActionError
) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST: {
      return {...state, loginAction: action.type};
    }
    case actionTypes.LOGIN_SUCCESS: {
      return { ...state, isAuthenticated : true, user: (action as LoginSuccessAction).user, loginAction: action.type };
    }
    case actionTypes.LOGIN_FAILURE: {
      return { ...state, isAuthenticated : false, authenticationError: true, loginAction: action.type, errorMessage: (action as SecurityActionError).response };
    }
    case actionTypes.LOGOUT_REQUEST: {
      return { ...state, isAuthenticated: false, loginAction: action.type, user: null };
    }
    case actionTypes.CLEAR_LOGIN_FAILURE: {
      return { ...state, authenticationError: false, errorMessage: '', loginAction: action.type, user: null };
    }
    default:
    {
      return state;
    }
  }
};

export default SecurityReducer;
