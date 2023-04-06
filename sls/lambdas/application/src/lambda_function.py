import json
import datetime
import boto3
from boto3.dynamodb.conditions import Key, Attr
import botocore
from botocore.exceptions import ClientError
import os

# This function supports the GET method only and supplies a list of all available application configuration manifests


def lambda_handler(event, context):

    # Go to a database table
    dynamodb = boto3.resource('dynamodb')

    # Retrieve the record that is the highest version number that is production status
    table = dynamodb.Table(os.environ['dynamoDBTable'])

    # Retrieve User Context
    if 'authorizer' in event['requestContext']:
        email = event['requestContext']['authorizer']['claims']['email']
    else:
        return {
            'statusCode': 406,
            'body': json.dumps({"message": "Invalid User"})
        }

    # Grab our method
    method = event['httpMethod'].lower()

    if method == 'get':
        version = event['queryStringParameters']['version']

        try:
            if version != '':
                response = table.query(
                    KeyConditionExpression=Key('version').eq(version)
                )
            else:
                response = table.scan()
        except ClientError as e:
            print(e.response['Error']['Message'])

            return {
                'statusCode': 500,
                'body': json.dumps({"message": "Server Error"})
            }

        # Return that record
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'])
        }

    elif method == 'put':
        version = event['pathParameters']['version']
        type = event['pathParameters']['type']
        pushEmailSettings = json.loads(event['body'])

        if type != 'push-email-settings':
            return {
                'statusCode': 406,
                'body': json.dumps({'message': 'Invalid setting type'}),
            }

        if pushEmailSettings is None:
            return {
                'statusCode': 406,
                'body': json.dumps({'message': 'Invalid data'}),
            }

        try:
            response = table.query(
                KeyConditionExpression=Key('version').eq(version))
        except:
            return {
                'statusCode': 500,
                'body': json.dumps({'message': 'Server Error'})
            }

        existSetting = response["Items"]

        if len(existSetting) == 0:
            response = table.put_item(
                Item={
                    'version': version,
                    "pushEmailSettings": pushEmailSettings
                }
            )

            return {
                'statusCode': 201,
                'body': json.dumps(response)
            }

        response = table.update_item(
            Key={
                'version': version,
            },
            UpdateExpression='set pushEmailSettings=:v',
            ExpressionAttributeValues={':v': pushEmailSettings},
        )

        return {
            'statusCode': 202,
            'body': json.dumps(response)
        }
