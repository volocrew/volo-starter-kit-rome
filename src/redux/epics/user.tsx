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
import {
  handleGetUser,
  handleGetUserAppsync,
  handleUpdateUser
} from 'services/user';
import { User } from 'models/user';
import { UserAction, UserActionTypes } from '../actions/user';
import * as UserActions from '../actions/user';
import * as AuthActions from '../actions/auth';
import { AuthAction } from '../actions/auth';

type UserExAction = UserAction | AuthAction;

export type UserEpic = Epic<UserExAction, UserExAction, RootState>;

const getUserEpic: UserEpic = (
  action$: ActionsObservable<UserExAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(UserActionTypes.GetUserAction),
    switchMap(action => {
      // TODO znf
      return from(handleGetUserAppsync(action.payload.email)).pipe(
        map((user: any) => {
          return UserActions.getUserSuccess(user as User);
        }),
        catchError(error => of(UserActions.getUserFailure(error)))
      );
    })
  );

const updateUserEpic: UserEpic = (
  action$: ActionsObservable<UserExAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(UserActionTypes.UpdateUserAction),
    switchMap(action => {
      return from(handleUpdateUser(action.payload.user)).pipe(
        map((user: any) => {
          return UserActions.updateUserSuccess(user as User);
        }),
        catchError(error => of(UserActions.updateUserFailure(error)))
      );
    })
  );

const updateUserSuccessEpic: UserEpic = (
  action$: ActionsObservable<UserExAction>
) =>
  action$.pipe(
    ofType(UserActionTypes.UpdateUserSuccessAction),
    switchMap(action => {
      if (action.payload.user) {
        return [AuthActions.goToRedirectUrl()];
      } else {
        return [];
      }
    })
  );

export default combineEpics(getUserEpic, updateUserEpic, updateUserSuccessEpic);
