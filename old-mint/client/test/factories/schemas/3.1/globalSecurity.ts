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
    '/link/account': {
      get: {
        operationId: 'getLinkedAccount',
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
          {
            name: 'Include-Source-Data',
            in: 'header',
            description:
              'A flag denoting whether you would like to also return the raw data from a Source System.',
            required: false,
            schema: {
              type: 'boolean',
              default: false,
            },
          },
        ],
        tags: ['link-metadata'],
        summary: 'Linked Account',
        description:
          'This endpoint allows you to retrieve the Linked Account associated with an `account_token`.\n\nThe email address returned from the Linked User endpoint can be used to map to\ncontent stored in your application to this Linked Account.\n',
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
                    account_id: {
                      allOf: [
                        {
                          description: 'The Ronan-generated UUID of the Account.',
                        },
                        {
                          type: 'string',
                          format: 'uuid',
                          readOnly: true,
                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                        },
                      ],
                    },
                    connection: {
                      allOf: [
                        {
                          description:
                            'This field includes properties associated with each [Connection](#tag/Linked-Connection) (e.g. oauth2, basic auth) associated with an `account_token`.',
                        },
                        {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              description: 'The type of Connection (e.g. oauth2).',
                              enum: ['api_token', 'basic_auth', 'oauth2'],
                            },
                            properties: {
                              type: 'object',
                              description:
                                'The properties of the Connection. Note, the fields in this object will differ by Connection type and Source System.',
                            },
                          },
                        },
                      ],
                    },
                    linked_company: {
                      type: 'object',
                      description: 'Information about the [Linked Company](#tag/Linked-Company).',
                      properties: {
                        id: {
                          allOf: [
                            {
                              description: 'The UUID of the Company assigned by Ronan.',
                            },
                            {
                              type: 'string',
                              format: 'uuid',
                              readOnly: true,
                              example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                            },
                          ],
                        },
                        source_id: {
                          type: 'string',
                          readOnly: true,
                          example: '12345',
                          description: 'The ID of the Company in the Source System.',
                        },
                        name: {
                          type: 'string',
                          description: 'The name of the Company.',
                          example: 'Ronan construction Inc.',
                        },
                      },
                    },
                    linked_user: {
                      allOf: [
                        {
                          description:
                            'Information about the [user who initiated the link](#tag/Linked-User).',
                        },
                        {
                          type: 'object',
                          properties: {
                            id: {
                              allOf: [
                                {
                                  description: 'The UUID of the Linked User assigned by Ronan.',
                                },
                                {
                                  type: 'string',
                                  format: 'uuid',
                                  readOnly: true,
                                  example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                },
                              ],
                            },
                            source_id: {
                              type: 'string',
                              readOnly: true,
                              example: '12345',
                              description: 'The ID of the Linked User from the Source System.',
                            },
                            name: {
                              type: 'string',
                              description: "The Linked User's name",
                              example: 'John Smith',
                            },
                            email: {
                              type: 'string',
                              description: "The Linked User's email address",
                              example: 'jsmith@example.com',
                            },
                          },
                        },
                      ],
                    },
                    status: {
                      type: 'string',
                      enum: ['pending', 'linked', 'unlinked', 'invalid'],
                      example: 'linked',
                      description:
                        'The status of the Linked Account.\n- `pending`: New Linked Accounts are created in this state after a successful linking. In some cases, such as Procore, the account stays in the pending state until you choose a Company. Potential values include:\n- `linked`: The link is active and all API requests should work as expected.\n- `unlinked`: Either you or the user have requested the link to be revoked. To link the account again, the user needs to re-authorize.\n- `invalid`: The account has entered an invalid state, and requires a manual fix.\n',
                    },
                    source_system: {
                      type: 'object',
                      description:
                        'Information about the linked [Source System](#tag/Linked-Source-System).',
                      properties: {
                        slug: {
                          description: "The Source System's short identifier.",
                          type: 'string',
                          example: 'procore',
                        },
                        name: {
                          type: 'string',
                          description: "The Source System's user-facing name.",
                          example: 'Procore',
                        },
                      },
                    },
                    supports_cross_account_uuid: {
                      type: 'boolean',
                      description:
                        'If true, UUIDs for resources in this account are persistent _across_ accounts. For example, if you\nhave two users (user_1 and user_2) both linking their accounts to the same Procore company, the UUIDs\nreturned for the same project will be identical.\n',
                      example: true,
                    },
                  },
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
  method: 'get',
  endpoint: '/link/account',
};

export default specInfo;
