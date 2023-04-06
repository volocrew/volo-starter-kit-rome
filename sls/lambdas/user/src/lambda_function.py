import json
import boto3
import os
from enum import Enum

# This function will take return profile data of the requesting user


class ThemeType(str, Enum):
    Light = "Light"
    Dark = "Dark"


def has_value(cls, value):
    return value in cls._value2member_map_


def lambda_handler(event, context):

    # Get the service resource.
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['dynamoDBTable'])

    # Retrieve User Context
    if 'authorizer' in event['requestContext']:
        email = event['requestContext']['authorizer']['claims']['email']
    else:
        return {
            'statusCode': 406,
            # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
            'body': json.dumps({"message": "Invalid User"})
        }

    # Construct Search query for record related to this user
    try:
        result = table.get_item(Key={'email': email})
    except:
        return {
            'statusCode': 500,
            # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
            'body': json.dumps({"message": "Server Error"})
        }

    # If no result
    if 'Item' not in result:
        return {
            'statusCode': 406,
            # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
            'body': json.dumps({"message": "Invalid user"})
        }

    # Grab our method
    method = event['httpMethod'].lower()
    user = result["Item"]

    if method == 'get':
        # Return data
        return {
            'statusCode': 200,
            # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
            'body': json.dumps(user)
        }

    elif method == 'put':
        data = json.loads(event['body'])

        if data is None:
            return {
                'statusCode': 406,
                # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
                'body': json.dumps({'message': 'Invalid data'}),
            }

        palette = data.get('palette')
        theme = data.get('theme')

        if palette is None and theme is None:
            return {
                'statusCode': 406,
                # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
                'body': json.dumps({'message': 'Invalid data'}),
            }

        if theme and (not has_value(ThemeType, theme)):
            return {
                'statusCode': 406,
                # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
                'body': json.dumps({'message': 'Invalid theme'}),
            }

        try:
            if palette is not None:
                table.update_item(
                    Key={
                        'email': email,
                    },
                    UpdateExpression='set palette=:v',
                    ExpressionAttributeValues={':v': palette},
                )
            if theme:
                table.update_item(
                    Key={
                        'email': email,
                    },
                    UpdateExpression='set theme=:v',
                    ExpressionAttributeValues={':v': theme},
                )

            result = table.get_item(Key={'email': email})

            return {
                'statusCode': 202,
                # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
                'body': json.dumps(result["Item"])
            }

        except:
            return {
                'statusCode': 500,
                # 'headers': {"Access-Control-Allow-Origin": "https://rome.volocrew.com"},
                'body': json.dumps({"message": "Server Error"})
            }
