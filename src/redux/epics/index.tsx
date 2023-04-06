import { combineEpics } from 'redux-observable';
import authEpics from './auth';
import userEpics from './user';
import controlBoardsEpics from './control-board';
import applicationEpics from './application';

export const rootEpic = combineEpics(
  authEpics,
  userEpics,
  controlBoardsEpics,
  applicationEpics
);
