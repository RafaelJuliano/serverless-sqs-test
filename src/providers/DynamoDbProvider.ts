import { DynamoDB } from 'aws-sdk'

let dynamoClient: DynamoDB

export const getClient = () => {
    if (!dynamoClient) {
        dynamoClient = new DynamoDB()
    }
    return dynamoClient
}