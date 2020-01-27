import { combineReducers } from 'redux';
import SecurityReducer from './security/reducer';

const allReducers = combineReducers({
  security: SecurityReducer
});

export default allReducers;