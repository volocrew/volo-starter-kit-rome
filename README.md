## Volo Starter Kit - Rome

Welcome to the Volo Applications starter kit!

This package is meant to get your new app up and running quickly, 
using a combination of AWS infrastructure for your backend, Serverless Framework
for quickly deploying, and React as the base for your frontend

## What this stack uses:

* AWS Cognito for authenticating users
* AWS DynamoDB for storing user and application data
* Serverless Framework for defining and deploying your infrastructure
* AWS Appsync to create a GraphQL API to manage your application
* React as the base of your frontend application with Material UI components

## Requirements

Currently tested on Node v14 on MacOS and Ubuntu 22.

You must have an AWS account with most permissions enabled.

## Setup

We suggest using `nvm` to manage node versions

Install the recommended version of Node by running

```
nvm install v14.19.2
nvm use v.14.19.2
 ```

### Installing and deploying server

We'll first deploy our required backend infrastructure on AWS using the Serverless Framework.

To do this we'll go to the Serverless directory and deploy a preconfigured environment named `alpha`:

```
cd sls
npm install
npm run deploy:dev:alpha
```

If this ran successfully, you'll have all the necessary services deployed through an AWS CloudFormation stack.
The final output of the command should look something like this:

```
Success! Now set the following values in your src/app.config.ts config object:
                                                                                               
[
  {
    apiGatewayEndpoint: 'https://ybr2om3rz0.execute-api.us-east-1.amazonaws.com/Dev-Alpha/api'
  },
  {
    awsAppsyncGraphqlEndpoint: 'https://5jwvuo6zwne4hbjeej6zfqafcm.appsync-api.us-east-1.amazonaws.com/graphql'
  },
  { 
    userPoolWebClientId: '7ji2nckh85jufbpiqvp22mjs5n' 
  },
  { 
    userPoolId: 'us-east-1_vk3LyFon6' 
  },
  { 
    region: 'us-east-1' 
  }
]

```

We'll be using these value to configure our client code next. Before continuing, go back
to the project root:

`cd ..`


### Installing and deploying the client
Go to the client source directory and install the necessary packages:

`cd src; npm install`

If you'd like to have your client immediately work with the deployed server,
open the `app.config.ts` file and look for the following section:

```
export const DevAlphaConfig: AppConfig = {
  region: 'us-east-1',
  userPoolId: 'xxxxxxx',
  userPoolWebClientId: 'xxxxxxxxxxxxxxxxxx',
  apiGatewayEndpoint:
    'xxxxxxxxxxxxxxxxxxxxxx',
  awsAppsyncGraphqlEndpoint:
    'xxxxxxxxxxxxxxxxxx'
};
```

Whose values you should replace with the output values from the previous section. Now run:

`npm run start`

Your dev server should be available

### Seeding new users

Setting up your first user can be done through the `seedUser` lambda.
* Navigate to the AWS Lambda section in the AWS Console, then go to the Functions section
* Open the `VoloSeedStack-<Stack Name>` lambda
* Navigate to the `Code` tab, then open the file in `seedStack/src/index.js`
* Change the values of the `stackBotUser` to reflect the new user you will be creating:
```
    const stackBotUser = {
        email: 'user@email.com',
        temporaryPassword: 'new password',
        phoneNumber: 'xxxxxxx',
        name: 'Your name'
    };
``` 
* Click on `Deploy` to update the lambda code, then execute the code by clicking on `Test`. 
Don't worry about any function parameters as they're ignored for this function
* Once the function runs, it will have created a new user for the app
* Log in to the starter UI in the development server by navigating to `http://localhost:3000`, using the email you put 
in the new user as the username


## Creating and deploying a new backend environment

New environments are simple to set up, you just need to add them to a few configuration files.

* In the `sls/serverless.yml` file, in the section named `environments`, add a key with your environment name, with its value in lowercase (which will be used to name all the stack resources):
```
environments:
  Dev-Alpha: dev-alpha
  Dev-Bravo: dev-bravo
  Your-New-Env: your-new-env
```

* Create in the `sls/` directory a dotenv file named with as environment value, such as `.env.{your environment value}`, copying the defaults in the `.env.default` file in the same directory

## Deploying the client

* Create a new S3 bucket where you'll be deploying the client code. Make sure you have all permissions to read and write to it, with pubic access enabled.
* Build the deployable client code by running `npm run build`
* In the `src/` directory, just run `npm run publish --s3dir <BUCKET_NAME> --region <BUCKET_REGION>`

## Uninstalling

You can uninstall the server stack by going to the `sls` directory and running `npm run destroy:dev:ENV_NAME`,
where `ENV_NAME` will be the environment you set up; normally the first environment is `alpha`, therefore just run 
`npm run destroy:dev:alpha`.
