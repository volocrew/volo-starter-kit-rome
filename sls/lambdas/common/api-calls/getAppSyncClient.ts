import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync/lib/client";
import { getAwsSecretAsync } from "./getAwsSecret";
require("isomorphic-fetch");

export async function getAppSyncClient() {
  return new AWSAppSyncClient({
    disableOffline: true,
    url: process.env.appSyncUrl ? process.env.appSyncUrl : '',
    region: process.env.region ? process.env.region : '',
    auth: {
      type: AUTH_TYPE.AWS_IAM,
      credentials: async () => {
        return {
          accessKeyId: await getAwsSecretAsync("appsync-user-bot-access"),
          secretAccessKey: await getAwsSecretAsync("appsync-user-bot-secret"),
        };
      },
    },
  });
}
