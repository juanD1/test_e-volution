import { combineReducers } from 'redux';
import SecurityReducer from './security/reducer';
import TaskReducer from './tasks/reducer';

const allReducers = combineReducers({
  security: SecurityReducer,
  tasks: TaskReducer
});

export default allReducers;