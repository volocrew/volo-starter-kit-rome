/* eslint-disable camelcase */

export interface UserAttributes {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  updated_at: string;
}

export type CognitoUser = {
  Session: unknown;
  attributes: UserAttributes;
  authenticationFlowType: string;
  client: unknown;
  keyPrefix: string;
  pool: unknown;
  preferredMFA: string;
  signInUserSession: unknown;
  storage: unknown;
  userDataKey: string;
  username: string;
  challengeName?: string;
  challengeParam?: {
    requiredAttributes: Array<any>;
    userAttributes: any;
  };
};

export type AuthError = {
  log: string;
  name: string;
  message: string;
  stack: string;
};

export function isError(
  response: CognitoUser | AuthError
): response is AuthError {
  if ((response as AuthError).message) {
    return true;
  }
  return false;
}
