import { OpenAPIV2 } from 'openapi-types';

const spec: OpenAPIV2.Document = {
  swagger: '2.0',
  info: {
    title: 'Ronan',
    description: 'Ronan API',
    termsOfService: 'https://www.google.com/policies/terms/',
    contact: {
      email: 'hello@ronan.io',
    },
    version: 'v1',
  },
  host: 'stage.ronan.io',
  schemes: ['http'],
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/users': {
      post: {
        operationId: 'createUser',
        description: 'Register a new customer type user in the system',
        parameters: [
          {
            name: 'data',
            in: 'body',
            required: true,
            schema: {
              required: ['email', 'password', 'repeat_password', 'phone', 'address'],
              type: 'object',
              properties: {
                id: {
                  title: 'Id',
                  type: 'integer',
                  readOnly: true,
                },
                email: {
                  title: 'Email',
                  type: 'string',
                  format: 'email',
                  minLength: 1,
                  maxLength: 254,
                },
                password: {
                  title: 'Password',
                  type: 'string',
                  maxLength: 128,
                },
                repeat_password: {
                  title: 'Repeat password',
                  type: 'string',
                },
                phone: {
                  title: 'Phone',
                  type: 'string',
                  minLength: 1,
                  maxLength: 20,
                },
                address: {
                  type: 'object',
                  properties: {
                    street_1: {
                      description: 'The first line of a street address.',
                      type: 'string',
                      example: '123 Main Street',
                    },
                    street_2: {
                      description: 'The second line of a street address (e.g. a Unit, PO Box).',
                      type: 'string',
                      example: 'Unit 1',
                    },
                    city: {
                      description: 'The name of the city.',
                      type: 'string',
                      example: 'AnyTown',
                    },
                    state: {
                      description: 'The name of the state, region, or province.',
                      type: 'string',
                      example: 'California',
                    },
                    country: {
                      description: 'The name of the country.',
                      type: 'string',
                      example: 'The United States of America',
                    },
                    postal_code: {
                      description: 'The postal or ZIP code.',
                      type: 'string',
                      example: '19703',
                    },
                  },
                  required: ['street_1', 'city', 'state', 'country', 'postal_code'],
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              required: ['email', 'password', 'repeat_password', 'phone'],
              type: 'string',
            },
          },
        },
      },
      parameters: [],
    },
  },
};

const specInfo = {
  spec,
  method: 'post',
  endpoint: '/users',
};

export default specInfo;
