import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import SecurityReducer from './security/reducer';

const allReducers = combineReducers({
  security: SecurityReducer
});

export default allReducers;