import { RouterAction } from 'connected-react-router';
import { ApplicationSetting, ApplicationSettingType } from 'models/application';

export enum ApplicationActionTypes {
  GetApplicationSettingAction = 'APPLICATION/GET_APPLICATION_SETTING',
  GetApplicationSettingSuccessAction = 'APPLICATION/GET_APPLICATION_SETTING_SUCCESS',
  GetApplicationSettingFailureAction = 'APPLICATION/GET_APPLICATION_SETTING_FAILURE',
  UpdateApplicationSettingAction = 'APPLICATION/UPDATE_APPLICATION_SETTING',
  UpdateApplicationSettingSuccessAction = 'APPLICATION/UPDATE_APPLICATION_SETTING_SUCCESS',
  UpdateApplicationSettingFailureAction = 'APPLICATION/UPDATE_APPLICATION_SETTING_FAILURE'
}

export type ApplicationAction =
  | { type: ApplicationActionTypes; payload?: any }
  | RouterAction;

export const getApplicationSetting = (): ApplicationAction => {
  return {
    type: ApplicationActionTypes.GetApplicationSettingAction
  };
};

export const getApplicationSettingSuccess = (
  setting: ApplicationSetting
): ApplicationAction => {
  return {
    type: ApplicationActionTypes.GetApplicationSettingSuccessAction,
    payload: { setting }
  };
};

export const getApplicationSettingFailure = (
  error: Error | string
): ApplicationAction => {
  return {
    type: ApplicationActionTypes.GetApplicationSettingFailureAction,
    payload: { error }
  };
};

export const updateApplicationSetting = (
  type: ApplicationSettingType,
  setting: ApplicationSetting
): ApplicationAction => {
  return {
    type: ApplicationActionTypes.UpdateApplicationSettingAction,
    payload: { type, setting }
  };
};

export const updateApplicationSettingSuccess = (
  setting: ApplicationSetting
): ApplicationAction => {
  return {
    type: ApplicationActionTypes.UpdateApplicationSettingSuccessAction,
    payload: { setting }
  };
};

export const updateApplicationSettingFailure = (
  error: Error | string
): ApplicationAction => {
  return {
    type: ApplicationActionTypes.UpdateApplicationSettingFailureAction,
    payload: { error }
  };
};
