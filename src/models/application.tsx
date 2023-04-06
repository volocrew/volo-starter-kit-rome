export type ApplicationSettingType = 'push-email-settings';

export type PushEmailSettings = {
  recipients: string[];
  subject: string;
  body: string;
};

export type ApplicationSetting = {
  version?: string;
  pushEmailSettings?: PushEmailSettings;
};

export enum PlaceholderType {
  TodayDate = '{ TODAYS_DATE }',
  TodayTime = '{ TODAYS_TIME }',
  Items = '{ ITEMS }'
}
