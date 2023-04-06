import { createSelector } from 'reselect';
import { RootState } from 'redux/store';

const selectUserState = (state: RootState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  userState => userState.user
);
