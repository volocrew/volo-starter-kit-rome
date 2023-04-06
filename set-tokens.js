const { execSync } = require('child_process');

const sessionCmd = `aws sts assume-role --role-arn arn:aws:iam::595317169433:role/VoloDevOrganizationalRole --duration-seconds 3600 --role-session-name test --profile voloapps_user`;

const sessionToken = JSON.parse(execSync(sessionCmd).toString());

const AWS_ACCESS_KEY_ID = sessionToken.Credentials.AccessKeyId;
const AWS_SECRET_ACCESS_KEY = sessionToken.Credentials.SecretAccessKey;
const AWS_SESSION_TOKEN = sessionToken.Credentials.SessionToken;

const setAccessKeyIdCmd = `export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}`;
const setSecretAccessKeyCmd = `export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}`;
const setSessionTokenCmd = `export AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}`;

const cmd = `${setAccessKeyIdCmd} && ${setSecretAccessKeyCmd} && ${setSessionTokenCmd.trim()}`;
console.log(cmd)


