import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './reducers/auth';
import user from './reducers/user';
import controlBoard from './reducers/control-board';
import application from './reducers/application';
import preferences from './reducers/preferences';
import history from './history';

const rootReducer = combineReducers({
  auth,
  user,
  controlBoard,
  application,
  preferences,
  router: connectRouter(history)
});

export { rootReducer, history };
