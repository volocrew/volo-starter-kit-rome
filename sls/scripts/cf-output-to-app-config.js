/*
This script filters out the CloudFormation outputs and renames them to match the config keys needed for the React app.
 */

const { execSync } = require('child_process');

const stageNameIndex = process.argv.indexOf('--stage');
const stageName = process.argv[stageNameIndex + 1];

const regionIndex = process.argv.indexOf('--region');
const region = process.argv[regionIndex + 1];

// Some fancy bash magic

const getStackCommand = `bash -c "npx serverless print --stage '${stageName}' --region '${region}' | grep stackName | cut -d ':' -f2"`;

// console.log(getStackCommand);

const stackName = execSync(getStackCommand).toString().trim();

if (!stackName) {
  return 'Error getting stack name';
}
// console.log(`Stack is ${stackName}`);

const command = `aws cloudformation describe-stacks --query "Stacks[?StackName=='${stackName}'].Outputs[]"`;
// console.log(`Stack listing command is ${command}`);

const result = JSON.parse(execSync(command).toString());
// console.log(result);

const keysTransform = {
    CognitoUserPoolId: 'userPoolId',
    CognitoUserPoolClientId: 'userPoolWebClientId',
    ApiGatewayDefaultUrl: 'apiGatewayEndpoint',
    GraphQlApiUrl: 'awsAppsyncGraphqlEndpoint'
};

const keys = Object.keys(keysTransform);

const filtered = result.filter(
    obj => keys.includes(obj.OutputKey)).map(
    obj => ({
      [keysTransform[obj.OutputKey]]: obj.OutputValue
    })
);
filtered.push({
    region: region
});

console.log("Success! Now set the following values in your src/app.config.ts config object:\n");
console.log(filtered);