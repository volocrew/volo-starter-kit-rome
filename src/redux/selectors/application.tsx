import { createSelector } from 'reselect';
import { RootState } from 'redux/store';

const selectApplicationState = (state: RootState) => state.application;

export const selectApplicationSetting = createSelector(
  selectApplicationState,
  application => application.setting
);

export const selectPushEmailSetting = createSelector(
  selectApplicationSetting,
  setting => (setting ? setting.pushEmailSettings : null)
);
