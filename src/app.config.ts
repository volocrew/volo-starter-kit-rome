export interface AppConfig {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  apiGatewayEndpoint: string;
  awsAppsyncGraphqlEndpoint: string;
}

export const DevAlphaConfig: AppConfig = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_JIW3Une6x',
  userPoolWebClientId: '719aojk89enp4hcirstb5jl2io',
  apiGatewayEndpoint:
    'https://yi8saxgoia.execute-api.us-east-1.amazonaws.com/Dev-Alpha/api',
  awsAppsyncGraphqlEndpoint:
    'https://khseoiyn7nfhbj3llbcuhl4tlq.appsync-api.us-east-1.amazonaws.com/graphql'
};

export const DevBravoConfig: AppConfig = {
  region: '',
  userPoolId: '',
  userPoolWebClientId: '',
  apiGatewayEndpoint: '',
  awsAppsyncGraphqlEndpoint: ''
};

export const ProdConfig: AppConfig = {
  region: '',
  userPoolId: '',
  userPoolWebClientId: '',
  apiGatewayEndpoint: '',
  awsAppsyncGraphqlEndpoint: ''
};

export const QAConfig: AppConfig = {
  region: '',
  userPoolId: '',
  userPoolWebClientId: '',
  apiGatewayEndpoint: '',
  awsAppsyncGraphqlEndpoint: ''
};
