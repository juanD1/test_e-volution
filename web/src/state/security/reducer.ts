import * as actionTypes from './constants';
import {
  LoginRequestAction,
  LoginSuccessAction,
  SecurityState,
  SecurityAction,
  SecurityActionError
} from './types';

const defaultState: SecurityState = {
  isAuthenticated: false,
  user: null,
  errorMessage: '',
  securityAction: '',
  securityError: false,
};

const SecurityReducer = (
  state: SecurityState = defaultState, 
  action: SecurityAction | LoginRequestAction | LoginSuccessAction | SecurityActionError
) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST: {
      return {...state, securityAction: action.type};
    }
    case actionTypes.LOGIN_SUCCESS: {
      return { ...state, isAuthenticated : true, user: (action as LoginSuccessAction).user, securityAction: action.type };
    }
    case actionTypes.LOGIN_FAILURE: {
      return { ...state, isAuthenticated : false, securityError: true, securityAction: action.type, errorMessage: (action as SecurityActionError).response };
    }
    case actionTypes.LOGOUT_REQUEST: {
      return { ...state, isAuthenticated: false, securityAction: action.type, user: null };
    }
    case actionTypes.CLEAR_LOGIN_FAILURE: {
      return { ...state, securityError: false, errorMessage: '', securityAction: action.type, user: null };
    }
    case actionTypes.CREATE_USER_REQUEST: {
      return {...state, securityAction: action.type};
    }
    case actionTypes.CREATE_USER_SUCCESS: {
      return { ...state, securityAction: action.type };
    }
    case actionTypes.CREATE_USER_FAILURE: {
      return {...state, securityError: true, securityAction: action.type, errorMessage: (action as SecurityActionError).response};
    }
    case actionTypes.CLEAR_CREATE_USER_FAILURE: {
      return { ...state, securityError: false, errorMessage: '', securityAction: action.type };
    }
    case actionTypes.CLEAR_SECURITY: {        
      return { ...defaultState };
    }
    default:
    {
      return state;
    }
  }
};

export default SecurityReducer;
