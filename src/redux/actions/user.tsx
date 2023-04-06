import { RouterAction } from 'connected-react-router';
import { User, UserInput } from 'models/user';

export enum UserActionTypes {
  GetUserAction = 'USER/GET_USER',
  GetUserSuccessAction = 'USER/GET_USER_SUCCESS',
  GetUserFailureAction = 'USER/GET_USER_FAILURE',
  UpdateUserAction = 'USER/UPDATE_USER',
  UpdateUserSuccessAction = 'USER/UPDATE_USER_SUCCESS',
  UpdateUserFailureAction = 'USER/UPDATE_USER_FAILURE'
}

export type UserAction =
  | { type: UserActionTypes; payload?: any }
  | RouterAction;

export const getUser = (email: string): UserAction => {
  return {
    type: UserActionTypes.GetUserAction,
    payload: { email }
  };
};

export const getUserSuccess = (user: User): UserAction => {
  return {
    type: UserActionTypes.GetUserSuccessAction,
    payload: { user }
  };
};

export const getUserFailure = (error: Error | string): UserAction => {
  return {
    type: UserActionTypes.GetUserFailureAction,
    payload: { error }
  };
};

export const updateUser = (user: UserInput): UserAction => {
  return {
    type: UserActionTypes.UpdateUserAction,
    payload: { user }
  };
};

export const updateUserSuccess = (user: User | null): UserAction => {
  return {
    type: UserActionTypes.UpdateUserSuccessAction,
    payload: { user }
  };
};

export const updateUserFailure = (error: Error | string): UserAction => {
  return {
    type: UserActionTypes.UpdateUserFailureAction,
    payload: { error }
  };
};
