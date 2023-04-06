import { RouterAction } from 'connected-react-router';
import { AuthError, CognitoUser } from 'models/auth';

export enum AuthActionTypes {
  LoginAction = 'AUTH/LOGIN',
  LoginSuccessAction = 'AUTH/LOGIN_SUCCESS',
  LoginFailureAction = 'AUTH/LOGIN_FAILURE',
  LogoutAction = 'AUTH/LOGOUT',
  LogoutSuccessAction = 'AUTH/LOGOUT_SUCCESS',
  LogoutFailureAction = 'AUTH/LOGOUT_FAILURE',
  ForceChangePasswordLock = 'AUTH/FORCE_CHANGE_PASSWORD_LOCK',
  SetPasswordAction = 'AUTH/SET_PASSWORD',
  SetPasswordSuccessAction = 'AUTH/SET_PASSWORD_SUCCESS',
  SetPasswordFailureAction = 'AUTH/SET_PASSWORD_FAILURE',
  MFARequireAction = 'AUTH/MFA_REQUIRE',
  MFAVerifyAction = 'AUTH/MFA_VERIFY',
  MFAVerifySuccessAction = 'AUTH/MFA_VERIFY_SUCCESS',
  MFAVerifyFailureAction = 'AUTH/MFA_VERIFY_FAILURE',
  SaveRedirectURLAction = 'AUTH/SAVE_REDIRECT_URL',
  GotoRedirectURLAction = 'AUTH/GOTO_REDIRECT_URL'
}

export type AuthAction =
  | { type: AuthActionTypes; payload?: any }
  | RouterAction;

export const login = (username: string, password: string): AuthAction => {
  return {
    type: AuthActionTypes.LoginAction,
    payload: {
      username,
      password
    }
  };
};

export const loginSuccess = (user: CognitoUser): AuthAction => {
  return {
    type: AuthActionTypes.LoginSuccessAction,
    payload: { user }
  };
};

export const loginFailure = (error: Error | string): AuthAction => {
  return {
    type: AuthActionTypes.LoginFailureAction,
    payload: { error }
  };
};

export const logout = (): AuthAction => {
  return {
    type: AuthActionTypes.LogoutAction
  };
};

export const logoutSuccess = (): AuthAction => {
  return {
    type: AuthActionTypes.LogoutSuccessAction
  };
};

export const logoutFailure = (error: Error | string): AuthAction => {
  return {
    type: AuthActionTypes.LogoutFailureAction,
    payload: { error }
  };
};

export const forceChangePasswordLock = (user: CognitoUser): AuthAction => {
  return {
    type: AuthActionTypes.ForceChangePasswordLock,
    payload: { user }
  };
};

export const setPassword = (password: string): AuthAction => {
  return {
    type: AuthActionTypes.SetPasswordAction,
    payload: { password }
  };
};

export const setPasswordSuccess = (
  user: CognitoUser,
  password: string
): AuthAction => {
  return {
    type: AuthActionTypes.SetPasswordSuccessAction,
    payload: { user, password }
  };
};

export const setPasswordFailure = (error: Error | string): AuthAction => {
  return {
    type: AuthActionTypes.SetPasswordFailureAction,
    payload: { error }
  };
};

export const mfaRequire = (user: CognitoUser): AuthAction => {
  return {
    type: AuthActionTypes.MFARequireAction,
    payload: { user }
  };
};

export const mfaVerify = (accessCode: string): AuthAction => {
  return {
    type: AuthActionTypes.MFAVerifyAction,
    payload: { accessCode }
  };
};

export const mfaVerifySuccess = (user: CognitoUser): AuthAction => {
  return {
    type: AuthActionTypes.MFAVerifySuccessAction,
    payload: { user }
  };
};

export const mfaVerifyFailure = (error: Error | string): AuthAction => {
  return {
    type: AuthActionTypes.MFAVerifyFailureAction,
    payload: { error }
  };
};

export const saveRedirectUrl = (): AuthAction => {
  return {
    type: AuthActionTypes.SaveRedirectURLAction,
    payload: { redirectUrl: getCurrentUrl() }
  };
};

export const goToRedirectUrl = (): AuthAction => {
  return {
    type: AuthActionTypes.GotoRedirectURLAction
  };
};

const getCurrentUrl = () => {
  let currentUrl = '';
  if (window.location.pathname.indexOf('login') === -1) {
    currentUrl = window.location.pathname + window.location.search;
  }
  return currentUrl;
};
