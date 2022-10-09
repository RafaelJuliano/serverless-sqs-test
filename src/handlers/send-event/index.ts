import { handlerPath } from '@utils/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    DYNAMODB_EVENTS_TABLE: '${self:provider.environment.DYNAMODB_EVENTS_TABLE}',
  },
  events: [
    {
      http: {
        method: 'POST',
        path: 'sender'
      }
    }
  ]
};
