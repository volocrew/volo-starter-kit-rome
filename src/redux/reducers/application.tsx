import { ApplicationSetting } from 'models/application';
import {
  ApplicationActionTypes,
  ApplicationAction
} from '../actions/application';

type InitialState = {
  error: null | string;
  setting: ApplicationSetting | null;
  loading: boolean;
};

const initialState: InitialState = {
  error: null,
  setting: null,
  loading: false
};

export default function userReducer(
  state = initialState,
  action: ApplicationAction
): typeof initialState {
  switch (action.type) {
    case ApplicationActionTypes.GetApplicationSettingAction:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ApplicationActionTypes.GetApplicationSettingSuccessAction:
      return {
        ...state,
        setting: action.payload.setting,
        loading: false
      };

    case ApplicationActionTypes.GetApplicationSettingFailureAction:
      return {
        ...state,
        loading: false,
        error: action.payload.error?.message
      };

    case ApplicationActionTypes.UpdateApplicationSettingAction:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ApplicationActionTypes.UpdateApplicationSettingFailureAction:
      return {
        ...state,
        loading: false,
        error: action.payload.error?.message
      };

    default:
      return state;
  }
}
