import json
import boto3
import os
from enum import Enum


def lambda_handler(event, context):
    print(event)
    # Get the service resource.
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['dynamoDBTable'])

    if 'email' not in event['arguments']:
       raise Exception('Missing email argument!')

    # Construct Search query for record related to this user
    result = {}
    try:
        result = table.get_item(Key={'email': event["arguments"]["email"]})
        print(result)
    except:
        raise Exception('Failed to get table item!')

    # If no result
    if 'Item' not in result:
        raise Exception('Failed to get item!')

    # Grab our method
    user = result["Item"]

    return user