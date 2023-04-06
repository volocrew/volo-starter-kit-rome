import gql from 'graphql-tag';
import { AWSAppSyncClient } from 'aws-appsync';
import { User } from '../../common/models/user';

const AddUserMutation = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      phoneNumber
      email
      name
      createdAt
      createdBy
    }
  }
`;

const GetUserMutation = gql`
  query AddUser($id: ID!) {
    getUser(id: $id) {
      phoneNumber
      email
      name
      createdAt
      createdBy
    }
  }
`;

export const addUser = async (
  client: AWSAppSyncClient<any>,
  user: User
): Promise<User> => {
  try {
    await client.hydrated();
    console.log('AddUserMutation', AddUserMutation);
    const transactionComplete: any = await client.mutate({
      mutation: AddUserMutation,
      variables: {
        input: user
      }
    });

    return transactionComplete.data.addUser;
  } catch (err) {
    throw new Error(err as any);
  }
};

export const getUser = async (
  client: AWSAppSyncClient<any>,
  id: string
): Promise<User> => {
  try {
    await client.hydrated();

    const transactionComplete: any = await client.query({
      query: GetUserMutation,
      variables: {
        id: id
      }
    });

    return transactionComplete.data.getUser;
  } catch (err) {
    throw new Error(err as any);
  }
};
