import Amplify, { API, Auth } from 'aws-amplify';
import { ApplicationSetting, PushEmailSettings } from 'models/application';

const version = '1.0';

const init = async () => ({
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`
  }
});

export async function handleGetApplicationSetting(): Promise<ApplicationSetting> {
  const resp = await API.get(
    'romeAPI',
    `/application?version=${version}`,
    await init()
  );

  return resp && resp.length > 0 ? resp[0] : null;
}

export async function handleUpdatePushEmailSetting(
  setting: PushEmailSettings
): Promise<ApplicationSetting> {
  const resp = await API.put(
    'romeAPI',
    `/application/${version}/push-email-settings`,
    {
      ...(await init()),
      body: setting
    }
  );

  return resp;
}
