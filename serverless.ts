import type { AWS } from '@serverless/typescript';
import { DynamoDb } from './infra/DynamoDb'
import getEvent from '@functions/get-event';
import sendEvent from '@functions/send-event'

const dynamoDb = new DynamoDb()


const serverlessConfiguration: AWS = {
  service: 'test-sqs',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      DYNAMODB_EVENTS_TABLE: '${self:service}-${opt:stage, self:provider.stage}-events',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem'
        ],
        Resource: '*'
      },
      {
        Effect: 'Allow',
        Action: [
          'sqs:SendMessage',
        ],
        Resource: '*'
      },

    ]
  },
  functions: { getEvent, sendEvent },
  resources: {
    Resources: {
      ...dynamoDb.getResources(),
      receiverQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'receiverQueue',
          maxReceiveCount: 5
        },
      }
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
