/* eslint-disable no-console */
import Amplify, { API as API2, Auth } from 'aws-amplify';
import { User, UserInput } from 'models/user';
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { GetUser } from 'graphql/queries';

const init = async () => ({
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`
  }
});

export async function handleGetUser(): Promise<User> {
  return API2.get('romeAPI', '/user', await init());
}

export async function handleGetUserAppsync(email: string): Promise<User> {
  let response;
  try {
    response = (await API.graphql(
      graphqlOperation(GetUser, {
        email
      })
    )) as GraphQLResult<{ getUser: { [key: string]: any } }>;

    // console.log(response);
  } catch (error) {
    console.log(error);
    throw new Error('error getting user!');
  }

  return response.data?.getUser as User;
}

export async function handleUpdateUser(user: UserInput): Promise<User> {
  const resp = await API2.put('romeAPI', `/user`, {
    ...(await init()),
    body: user
  });

  return resp;
}
