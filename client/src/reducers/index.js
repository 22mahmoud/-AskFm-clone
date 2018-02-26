import { combineReducers } from 'redux';
import user from './user';
import notifications from './notifications';

const rootReducers = combineReducers({
  user,
  notifications,
});

export default rootReducers;
