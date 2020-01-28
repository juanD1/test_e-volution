import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

import securitySagas from './security/sagas';
import tasksSagas from './tasks/sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware: [Middleware] = [sagaMiddleware];

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const persistConfig = {
  key: 'test_e-volution',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: Store<any> = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);

sagaMiddleware.run(securitySagas);
sagaMiddleware.run(tasksSagas);

export { store, persistor };