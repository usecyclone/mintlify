import { OpenAPIV3_1 } from 'openapi-types';

const spec: OpenAPIV3_1.Document = {
  openapi: '3.1.0',
  servers: [
    {
      url: 'https://api.Ronanapi.com',
      description: 'Production server',
    },
  ],
  info: {
    version: '2021-11-21',
    title: 'Ronan Unified API',
    termsOfService: 'https://Ronanapi.com/terms',
    contact: {
      name: 'API Support',
      email: 'api-support@Ronanapi.com',
    },
    description:
      '<br /> Here, you can find a complete list of our APIs. For more general information about how to use them, please refer to [our guides](https://docs.Ronanapi.com).',
  },
  security: [
    {
      'Client-Id': [],
      'Client-Secret': [],
      'Account-Token': [],
    },
  ],
  components: {
    securitySchemes: {
      'Client-Id': {
        description:
          'The `Client-Id` request header is required for all API endpoints. For more information,\nsee [Headers](https://docs.Ronanapi.com/Ronan-api/headers).\n',
        type: 'apiKey',
        in: 'header',
        name: 'Client-Id',
      },
      'Client-Secret': {
        description:
          'The `Client-Secret` request header is required for all API endpoints. For more information,\nsee [Headers](https://docs.Ronanapi.com/Ronan-api/headers).\n',
        type: 'apiKey',
        in: 'header',
        name: 'Client-Secret',
      },
      'Account-Token': {
        description:
          'The `Account-Token` request header is required for all API endpoints accessing customer data. For more information,\nsee [Headers](https://docs.Ronanapi.com/Ronan-api/headers).\n',
        type: 'apiKey',
        in: 'header',
        name: 'Account-Token',
      },
    },
  },
  paths: {
    '/link/token/create': {
      post: {
        operationId: 'createLinkToken',
        parameters: [
          {
            name: 'API-Version',
            in: 'header',
            description:
              'This value specifies which [Ronan API version](/Ronan-api/api-versioning) to use.\nThe current version is `"2021-11-21"`.\n',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        tags: ['link-token'],
        security: [
          {
            'Client-Id': [],
            'Client-Secret': [],
          },
        ],
        summary: 'Create Link Token',
        description:
          'This endpoint allows you to generate a new link token and use that to initialize the Ronan Link frontend component. To learn more, see [Link Component](/Ronan-link/component).\n',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  reference_id: {
                    type: 'string',
                    description:
                      'A unique identifier for the User in your app. To learn more, \nsee [Reference ID](https://docs.Ronanapi.com/Ronan-api/reference-id).\n',
                    example: 'user-123456',
                  },
                },
                required: ['reference_id'],
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'Ronan-Request-Id': {
                schema: {
                  type: 'string',
                  format: 'uuid',
                  minLength: 36,
                  maxLength: 36,
                  description:
                    'A unique request identifier that you can use for debugging and support. To learn more, see [Headers](/Ronan-api/headers).',
                },
                example: 'd318f7bc-f67c-42c6-ad6f-f807b8d6d05f',
              },
            },
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    link_token: {
                      type: 'string',
                      description:
                        'The link token that you can use to initialize the Ronan Link frontend component. To learn more, see [Link Component](/Ronan-link/component).',
                      example: 'ttq2FdbUe6_dMGe2fVAQwSl1o0G8_4wBac...',
                    },
                  },
                  required: ['token'],
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
            headers: {
              'Ronan-Request-Id': {
                schema: {
                  type: 'string',
                  format: 'uuid',
                  minLength: 36,
                  maxLength: 36,
                  description:
                    'A unique request identifier that you can use for debugging and support. To learn more, see [Headers](/Ronan-api/headers).',
                },
                example: 'd318f7bc-f67c-42c6-ad6f-f807b8d6d05f',
              },
            },
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: {
                        description: 'The field with the error.',
                        type: 'string',
                      },
                      error: {
                        description: 'The error message.',
                        type: 'string',
                      },
                    },
                  },
                  example: [
                    {
                      field: 'name',
                      error: "The field 'name' is required, but none was provided",
                    },
                    {
                      field: 'address.country_code',
                      error:
                        "The provided value ('United States') is not a valid ISO-3166 Alpha-2 country code",
                    },
                    {
                      field: 'end_date',
                      error:
                        "The provided value ('2018-10-19 16:46:45') is not a valid ISO 8601 date ('YYYY-MM-DD')",
                    },
                  ],
                },
              },
            },
          },
          '403': {
            description: 'Forbidden',
            headers: {
              'Ronan-Request-Id': {
                schema: {
                  type: 'string',
                  format: 'uuid',
                  minLength: 36,
                  maxLength: 36,
                  description:
                    'A unique request identifier that you can use for debugging and support. To learn more, see [Headers](/Ronan-api/headers).',
                },
                example: 'd318f7bc-f67c-42c6-ad6f-f807b8d6d05f',
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            headers: {
              'Ronan-Request-Id': {
                schema: {
                  type: 'string',
                  format: 'uuid',
                  minLength: 36,
                  maxLength: 36,
                  description:
                    'A unique request identifier that you can use for debugging and support. To learn more, see [Headers](/Ronan-api/headers).',
                },
                example: 'd318f7bc-f67c-42c6-ad6f-f807b8d6d05f',
              },
            },
          },
          '503': {
            description: 'Service Unavailable',
            headers: {
              'Ronan-Request-Id': {
                schema: {
                  type: 'string',
                  format: 'uuid',
                  minLength: 36,
                  maxLength: 36,
                  description:
                    'A unique request identifier that you can use for debugging and support. To learn more, see [Headers](/Ronan-api/headers).',
                },
                example: 'd318f7bc-f67c-42c6-ad6f-f807b8d6d05f',
              },
            },
          },
        },
      },
    },
  },
};

const specInfo = {
  spec,
  method: 'post',
  endpoint: '/link/token/create',
};

export default specInfo;
