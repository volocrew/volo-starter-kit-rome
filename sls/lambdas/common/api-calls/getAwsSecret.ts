// Create a Secrets Manager client
import AWS from 'aws-sdk';

const client = new AWS.SecretsManager({
  region: process.env.region ? process.env.region : ''
});

// Call the AWS API and return a Promise
async function getAwsSecret(
  secretName: string
): Promise<AWS.SecretsManager.GetSecretValueResponse> {
  return client.getSecretValue({ SecretId: secretName }).promise();
}

export async function getAwsSecretAsync(secretName: string) {
  const response = (await getAwsSecret(secretName).catch(err => {
    if (err.code === 'DecryptionFailureException') {
      // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === 'InternalServiceErrorException') {
      // An error occurred on the server side.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === 'InvalidParameterException') {
      // You provided an invalid value for a parameter.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === 'InvalidRequestException') {
      // You provided a parameter value that is not valid for the current state of the resource.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === 'ResourceNotFoundException') {
      // We can't find the resource that you asked for.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    }
  })) as AWS.SecretsManager.GetSecretValueResponse;

  const secretString = response.SecretString
    ? response.SecretString
    : `{${secretName}: 'fakepassword'}`;

  const secretObj = JSON.parse(secretString);
  return secretObj[secretName];
}

export async function updateAwsSecretAsync(secretName: string, value: string) {
  const response = (
    await updateSecret(secretName, JSON.stringify({ [secretName]: value }))
      .catch(err => {
        throw err;
      })
  ) as AWS.SecretsManager.UpdateSecretResponse;
  return true;
}

async function updateSecret(
  secretName: string,
  value: string
): Promise<AWS.SecretsManager.UpdateSecretResponse> {
  return client.updateSecret({ SecretId: secretName, SecretString: value }).promise();
}
