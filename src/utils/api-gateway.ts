import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: object, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response)
  }
}

const ok = (response: object) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

const created = () => {
  return {
    statusCode: 201,
    body: null
  }
}

const error = (message: string, statusCode: number) => {
  return {
    statusCode,
    body: JSON.stringify({ message })
  }
}

export const ResponseUtils = { ok, created, error }
