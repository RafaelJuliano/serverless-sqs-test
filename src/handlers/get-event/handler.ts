import { SQSHandler, SQSMessageAttributes } from 'aws-lambda';
import { v4 } from 'uuid';
import { getClient } from '../../providers/DynamoDbProvider'
const receiver: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      console.log('Message Attributtes -->  ', messageAttributes.AttributeNameHere.stringValue);
      console.log('Message Body -->  ', record.body);
      const dynamoClient = getClient()
      const params = {
        TableName: process.env.DYNAMODB_EVENTS_TABLE || '',
        Item: {
          'id': { S: v4() },
          'attributes': { S: messageAttributes.AttributeNameHere.stringValue },
          'body': { S: record.body }
        }
      }
      await dynamoClient.putItem(params).promise()
    }
  } catch (error) {
    console.log(error);
  }
};


export const main = receiver
