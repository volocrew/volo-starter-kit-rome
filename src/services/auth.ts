/* eslint-disable no-console */
import Amplify, { Auth } from 'aws-amplify';
import { AuthError, CognitoUser } from 'models/auth';

export type OnSuccess<ResponseType = unknown> = (
  response: ResponseType
) => void;
export type OnFail = (error: AuthError, authType: string) => void;

const defaultOnSuccess = (response: unknown) => console.log(response);
const defaultOnFail = (error: AuthError, errorType: string) =>
  console.log(`${error} of ${errorType}`);

export async function handleLogin({
  username,
  password
}: {
  username: string;
  password: string;
}): Promise<CognitoUser | unknown> {
  const user = await Auth.signIn(username, password);

  return user;
}

export async function handleCompleteNewPassword({
  user,
  password
}: {
  user: CognitoUser;
  password: string;
}): Promise<CognitoUser | unknown> {
  const loggedUser = await Auth.completeNewPassword(user, password);

  return loggedUser;
}

export async function handleConfirmSignIn({
  user,
  code,
  mfaType = 'SMS_MFA'
}: {
  user: CognitoUser;
  code: string;
  mfaType: 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA';
}): Promise<CognitoUser | unknown> {
  const loggedUser = await Auth.confirmSignIn(user, code, mfaType);

  return loggedUser;
}

export async function handleLogout(): Promise<unknown> {
  return Auth.signOut();
}
