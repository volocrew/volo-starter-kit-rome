import { createStore, applyMiddleware, AnyAction } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'connected-react-router';
import { rootReducer } from './rootReducer';
import { rootEpic } from './epics';
import history from './history';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

const middleware = [routerMiddleware(history), epicMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof rootReducer>;

export { store, history };
