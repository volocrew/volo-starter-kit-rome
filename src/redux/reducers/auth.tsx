import { CognitoUser, isError } from 'models/auth';
import { AuthActionTypes, AuthAction } from '../actions/auth';

type InitialState = {
  isAuthenticated: boolean;
  error: null | string;
  cognitoUser: CognitoUser | null;
  passwordDetails: {
    error: string;
    success: string;
  };
  forceChangePassword: boolean;
  loading: boolean;
  redirectUrl: string;
};

const initialState: InitialState = {
  cognitoUser: null,
  isAuthenticated: false,
  error: null,
  passwordDetails: {
    error: '',
    success: ''
  },
  forceChangePassword: false,
  loading: false,
  redirectUrl: ''
};

export default function authReducer(
  state = initialState,
  action: AuthAction
): typeof initialState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        error: null
      };

    case AuthActionTypes.LoginSuccessAction:
      return {
        ...state,
        cognitoUser: action.payload.user,
        isAuthenticated: true,
        loading: false
      };

    case AuthActionTypes.LoginFailureAction:
      return {
        ...state,
        loading: false,
        error: action.payload.error?.message
      };

    case AuthActionTypes.ForceChangePasswordLock:
      return {
        ...state,
        cognitoUser: action.payload.user,
        isAuthenticated: false,
        loading: false
      };

    case AuthActionTypes.SetPasswordAction:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AuthActionTypes.SetPasswordSuccessAction:
      return {
        ...state,
        cognitoUser: action.payload.user,
        loading: false
      };

    case AuthActionTypes.SetPasswordFailureAction:
      return {
        ...state,
        loading: false,
        error: action.payload.error?.message
      };

    case AuthActionTypes.MFARequireAction:
      return {
        ...state,
        cognitoUser: action.payload.user,
        isAuthenticated: false,
        loading: false
      };

    case AuthActionTypes.MFAVerifyAction:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AuthActionTypes.MFAVerifySuccessAction:
      return {
        ...state,
        cognitoUser: action.payload.user,
        isAuthenticated: true,
        loading: false
      };

    case AuthActionTypes.MFAVerifyFailureAction:
      return {
        ...state,
        loading: false,
        error: action.payload.error?.message
      };

    case AuthActionTypes.LogoutSuccessAction:
      return {
        ...state,
        cognitoUser: null,
        isAuthenticated: false,
        error: null
      };

    case AuthActionTypes.SaveRedirectURLAction:
      return {
        ...state,
        redirectUrl: action.payload.redirectUrl
      };

    default:
      return state;
  }
}
