import {
  ActionsObservable,
  combineEpics,
  ofType,
  StateObservable,
  Epic
} from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { RootState } from 'redux/store';
import {
  handleConfirmSignIn,
  handleLogin,
  handleLogout,
  handleCompleteNewPassword
} from 'services/auth';
import { CognitoUser } from 'models/auth';
import { AuthAction, AuthActionTypes } from '../actions/auth';
import { getUser, updateUserSuccess, UserAction } from '../actions/user';
import {
  getApplicationSetting,
  ApplicationAction
} from '../actions/application';
import * as AuthActions from '../actions/auth';

type AuthExAction = AuthAction | UserAction | ApplicationAction;

export type AuthEpic = Epic<AuthExAction, AuthExAction, RootState>;

const loginEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(AuthActionTypes.LoginAction),
    switchMap(action => {
      const { username, password }: { username: string; password: string } =
        action.payload;

      return from(handleLogin({ username, password })).pipe(
        map((response: any) => {
          if (
            response.challengeName &&
            response.challengeName === 'NEW_PASSWORD_REQUIRED'
          ) {
            return AuthActions.forceChangePasswordLock(response as CognitoUser);
          } else if (
            response.challengeName === 'SMS_MFA' ||
            response.challengeName === 'SOFTWARE_TOKEN_MFA'
          ) {
            return AuthActions.mfaRequire(response as CognitoUser);
          }
          console.log(response);
          return AuthActions.loginSuccess(response as CognitoUser);
        }),
        catchError(error => of(AuthActions.loginFailure(error)))
      );
    })
  );

const loginSuccessEpic: AuthEpic = (action$: ActionsObservable<AuthExAction>) =>
  action$.pipe(
    ofType(AuthActionTypes.LoginSuccessAction),
    switchMap(action => {
      return [
        getUser(action?.payload?.user?.attributes?.email),
        getApplicationSetting(),
        push('/control-board')
      ];
    })
  );

const forceChangePasswordLockEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>
) =>
  action$.pipe(
    ofType(AuthActionTypes.ForceChangePasswordLock),
    map(() => push('/set-password'))
  );

const setPasswordEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(AuthActionTypes.SetPasswordAction),
    switchMap(action => {
      const { password }: { password: string } = action.payload;

      const { cognitoUser } = state$.value.auth;
      if (!cognitoUser) {
        return of(push('/login'));
      }

      return from(
        handleCompleteNewPassword({
          user: cognitoUser,
          password
        })
      ).pipe(
        map((response: any) => {
          return AuthActions.setPasswordSuccess(
            response as CognitoUser,
            password
          );
        }),
        catchError(error => of(AuthActions.setPasswordFailure(error)))
      );
    })
  );

const setPasswordSuccessEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>
) =>
  action$.pipe(
    ofType(AuthActionTypes.SetPasswordSuccessAction),
    map(action => {
      const { user, password }: { user: CognitoUser; password: string } =
        action.payload;

      return AuthActions.login(user.username, password);
    })
  );

const mfaRequireEpic: AuthEpic = (action$: ActionsObservable<AuthExAction>) =>
  action$.pipe(
    ofType(AuthActionTypes.MFARequireAction),
    map(() => push('/mfa-login'))
  );

const mfaVerifyEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(AuthActionTypes.MFAVerifyAction),
    switchMap(action => {
      const { accessCode }: { accessCode: string } = action.payload;

      const { cognitoUser } = state$.value.auth;
      if (!cognitoUser) {
        return of(push('/login'));
      }

      return from(
        handleConfirmSignIn({
          user: cognitoUser,
          code: accessCode,
          mfaType: 'SMS_MFA'
        })
      ).pipe(
        map((response: any) => {
          return AuthActions.mfaVerifySuccess(response as CognitoUser);
        }),
        catchError(error => of(AuthActions.mfaVerifyFailure(error)))
      );
    })
  );

const mfaVerifySuccessEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>
) =>
  action$.pipe(
    ofType(AuthActionTypes.MFAVerifySuccessAction),
    map(() => push('/control-board'))
  );

const logoutEpic: AuthEpic = (action$: ActionsObservable<AuthExAction>) =>
  action$.pipe(
    ofType(AuthActionTypes.LogoutAction),
    switchMap(() => {
      return from(handleLogout()).pipe(
        map((response: any) => {
          return AuthActions.logoutSuccess();
        }),
        catchError(error => of(AuthActions.logoutFailure(error)))
      );
    })
  );

const logoutSuccessEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>
) =>
  action$.pipe(
    ofType(AuthActionTypes.LogoutSuccessAction),
    switchMap(() => [updateUserSuccess(null), push('/login')])
  );

const gotoRedirectUrlEpic: AuthEpic = (
  action$: ActionsObservable<AuthExAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(AuthActionTypes.GotoRedirectURLAction),
    switchMap(() => [push(state$.value.auth.redirectUrl)])
  );

export default combineEpics(
  loginEpic,
  loginSuccessEpic,
  forceChangePasswordLockEpic,
  setPasswordEpic,
  setPasswordSuccessEpic,
  mfaRequireEpic,
  mfaVerifyEpic,
  mfaVerifySuccessEpic,
  logoutEpic,
  logoutSuccessEpic,
  gotoRedirectUrlEpic
);
