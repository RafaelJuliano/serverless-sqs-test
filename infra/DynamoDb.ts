export class DynamoDb {


    private dynamoDbTables: object

    constructor() {
        this.dynamoDbTables = {
            DynamoDbUsersTable: {
                Type: 'AWS::DynamoDB::Table',
                DeletionPolicy: 'Retain',
                Properties: {
                    AttributeDefinitions: [
                        {
                            AttributeName: 'id',
                            AttributeType: 'S'
                        }
                    ],
                    KeySchema: [
                        {
                            AttributeName: 'id',
                            KeyType: 'HASH'
                        }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    },
                    StreamSpecification: {
                        StreamViewType: 'NEW_AND_OLD_IMAGES'
                    },
                    TableName: '${self:provider.environment.DYNAMODB_EVENTS_TABLE}'
                }
            }
        }
    }

    public getResources = () => {
        return this.dynamoDbTables
    }
}