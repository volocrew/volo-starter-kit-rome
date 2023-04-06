import * as AWS from 'aws-sdk';
import { User } from '../../common/models/user';
import { adminCreateCognitoUser, adminSetPassword } from './admin-cognito';
import { addUser } from '../../common/appsync/user';
import { v4 as uuid } from 'uuid';
import { getAppSyncClient } from '../../common/api-calls/getAppSyncClient';

const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REGION ? process.env.REGION : ''
});

exports.handler = async event => {
  const stackBotUser = {
    // CHANGE VALUES HERE TO CREATE USER
    email: 'your_user_email@email.com',
    temporaryPassword: 'your_password',
    phoneNumber: 'your_phone_number',
    name: 'your_name'
  };

  const params = {
    UserPoolId: process.env.POOL_ID,
    Username: stackBotUser.email,
    DesiredDeliveryMediums: ['EMAIL'],
    TemporaryPassword: stackBotUser.temporaryPassword,
    UserAttributes: [
      {
        Name: 'email',
        Value: stackBotUser.email
      },
      {
        Name: 'phone_number',
        Value: stackBotUser.phoneNumber
      },
      {
        Name: 'email_verified',
        Value: 'true'
      }
    ]
  };

  // Create base user
  const newCognitoUser: any = await adminCreateCognitoUser(
    cognitoIdentityService,
    params
  );

  await adminSetPassword(cognitoIdentityService, {
    UserPoolId: process.env.POOL_ID as string,
    Username: stackBotUser.email,
    Password: stackBotUser.temporaryPassword,
    Permanent: true
  });

  console.log('newCognitoUser', newCognitoUser);

  const client = await getAppSyncClient();

  const accountId = uuid();
  const newDateIso = new Date().toISOString();


  const user: User = {
    // id: newCognitoUser.User.Username,
    // accountId: account.accountId,
    // roleIds: [role.roleId],
    email: stackBotUser.email,
    createdAt: newDateIso,
    // createdBy: newCognitoUser.User.Username,
    createdBy: stackBotUser.email,
    phoneNumber: stackBotUser.phoneNumber,
    name: stackBotUser.name,
    theme: 'Light',
    notifications: false
  };

  // add user in dynamo db
  const newUserInDB: User = await addUser(client, user);
  console.log(newUserInDB);

  // for (const permission of allPermissions) {
  //   const params: AddUserParams = {
  //     GroupName: permission,
  //     UserPoolId: process.env.POOL_ID as string,
  //     Username: newUserInDB.id
  //   };

  //   console.log('Adding the following permission group to user: ', params);
  //   await addUserToGroup(cognitoIdentityService, params);
  // }

  return;
};
