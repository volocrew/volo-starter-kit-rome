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
  handleGetApplicationSetting,
  handleUpdatePushEmailSetting
} from 'services/application';
import {
  ApplicationAction,
  ApplicationActionTypes
} from '../actions/application';
import * as ApplicationActions from '../actions/application';

export type ApplicationEpic = Epic<
  ApplicationAction,
  ApplicationAction,
  RootState
>;

const getApplicationSettingEpic: ApplicationEpic = (
  action$: ActionsObservable<ApplicationAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(ApplicationActionTypes.GetApplicationSettingAction),
    switchMap(action => {
      return from(handleGetApplicationSetting()).pipe(
        map(setting => {
          return ApplicationActions.getApplicationSettingSuccess(setting);
        }),
        catchError(error =>
          of(ApplicationActions.getApplicationSettingFailure(error))
        )
      );
    })
  );

const updateApplicationSettingEpic: ApplicationEpic = (
  action$: ActionsObservable<ApplicationAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(ApplicationActionTypes.UpdateApplicationSettingAction),
    switchMap(action => {
      if (action.payload.type !== 'push-email-settings') {
        return of(
          ApplicationActions.getApplicationSettingFailure(
            'Invalid setting type'
          )
        );
      }

      return from(
        handleUpdatePushEmailSetting(action.payload.setting.pushEmailSettings)
      ).pipe(
        map(response => {
          return ApplicationActions.getApplicationSetting();
        }),
        catchError(error =>
          of(ApplicationActions.getApplicationSettingFailure(error))
        )
      );
    })
  );

export default combineEpics(
  getApplicationSettingEpic,
  updateApplicationSettingEpic
);
