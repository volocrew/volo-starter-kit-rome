import { User } from 'models/user';
import { UserActionTypes, UserAction } from '../actions/user';

type InitialState = {
  error: null | string;
  user: User | null;
  loading: boolean;
  saving: boolean;
};

const initialState: InitialState = {
  error: null,
  user: null,
  loading: false,
  saving: false
};

export default function userReducer(
  state = initialState,
  action: UserAction
): typeof initialState {
  switch (action.type) {
    case UserActionTypes.GetUserAction:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UserActionTypes.GetUserSuccessAction:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };

    case UserActionTypes.GetUserFailureAction:
      return {
        ...state,
        loading: false,
        error: action.payload.error?.message
      };

    case UserActionTypes.UpdateUserAction:
      return {
        ...state,
        saving: true,
        error: null
      };

    case UserActionTypes.UpdateUserSuccessAction:
      return {
        ...state,
        user: action.payload.user,
        saving: false
      };

    case UserActionTypes.UpdateUserFailureAction:
      return {
        ...state,
        saving: false,
        error: action.payload.error?.message
      };

    default:
      return state;
  }
}
