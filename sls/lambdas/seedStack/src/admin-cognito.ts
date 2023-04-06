export interface AddUserParams {
  GroupName: string;
  UserPoolId: string;
  Username: string;
}

export interface AdminSetPasswordParams {
  UserPoolId: string;
  Username: string;
  Password: string;
  Permanent: boolean;
}

export const addUserToGroup = async (
  service: AWS.CognitoIdentityServiceProvider,
  params: AddUserParams
) => {
  return new Promise((resolve, reject) => {
    service.adminAddUserToGroup(params, (err: any, data: any) => {
      if (!err) {
        console.log("Successful add user to group");
        resolve(JSON.stringify(data));
      } else {
        console.log("error!");
        reject(err);
      }
    });
  });
};

export const adminCreateCognitoUser = async (service: any, params: any) => {
  return new Promise((resolve, reject) => {
    service.adminCreateUser(params, (err: any, data: any) => {
      if (!err) {
        console.log("Successful create cognito user");
        resolve(data);
      } else {
        console.log("Error!...Cognito");
        reject(err);
      }
    });
  });
};

export const adminSetPassword = async (
  service: AWS.CognitoIdentityServiceProvider,
  params: AdminSetPasswordParams
) => {
  return new Promise((resolve, reject) => {
    service.adminSetUserPassword(params, (err: any, data: any) => {
      if (!err) {
        console.log("Successful set password");
        resolve(JSON.stringify(data));
      } else {
        console.log("error!");
        reject(err);
      }
    });
  });
};
