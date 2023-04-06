import { Auth, API } from 'aws-amplify';

const init = async () => ({
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`
  }
});
