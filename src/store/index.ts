import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import rootSaga from './saga';
import rootReducer from './reducer';

const appSagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [appSagaMiddleware],
});

appSagaMiddleware.run(rootSaga);

export default store;
