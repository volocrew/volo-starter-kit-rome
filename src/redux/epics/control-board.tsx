import {
  ActionsObservable,
  combineEpics,
  ofType,
  StateObservable,
  Epic
} from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootState } from 'redux/store';
import { toast } from 'react-toastify';
import {
  ControlBoardAction,
  ControlBoardActionTypes
} from '../actions/control-board';
import * as ControlBoardActions from '../actions/control-board';

export type ControlBoardEpic = Epic<
  ControlBoardAction,
  ControlBoardAction,
  RootState
>;

export default combineEpics();
