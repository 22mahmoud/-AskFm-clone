import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import rootReducers from './reducers';

const store = createStore(rootReducers, {}, applyMiddleware(logger));

export default store;
