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
    '/assets': {
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
      post: {
        operationId: 'newAsset',
        tags: ['assets'],
        summary: 'Asset',
        description:
          'This endpoint creates Assets.\n\n**Note for CMiC**: you will need to include the following fields under Source_Data (see Request Body Schema below for descriptions of each):\n  - EmeAutoChargeoutFlag\n  - EmeBillRateRequiredFlag\n  - EmeBulkEquipmentFlag:\n  - EmeDepreciationFlag\n  - EmeEqpHier\n  - EmeFixedAssetsFlag\n  - EmeHomelocName\n  - EmeUseMeterReadingFlag\n',
        requestBody: {
          content: {
            'application/json (CMiC)': {
              schema: {
                type: 'object',
                allOf: [
                  {
                    allOf: [
                      {
                        type: 'object',
                        properties: {
                          address: {
                            type: 'object',
                            properties: {
                              street_1: {
                                description: 'The first line of a street address.',
                                type: 'string',
                                example: '123 Main Street',
                              },
                              street_2: {
                                description:
                                  'The second line of a street address (e.g. a Unit, PO Box).',
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
                          category: {
                            type: 'string',
                            description: 'The Category of the Asset.',
                            example: 'Equipment',
                          },
                          current_location_id: {
                            allOf: [
                              {
                                description:
                                  'The UUID assigned by Ronan of the current [Location](#tag/locations) of the Asset.',
                              },
                              {
                                type: 'string',
                                format: 'uuid',
                                minLength: 36,
                                maxLength: 36,
                                writeOnly: true,
                                example: 'c840285e-e65f-4342-943f-5950ef8072dc',
                              },
                            ],
                          },
                          default_location_id: {
                            allOf: [
                              {
                                description:
                                  'The UUID assigned by Ronan of the default [Location](#tag/locations) of the Asset.',
                              },
                              {
                                type: 'string',
                                format: 'uuid',
                                minLength: 36,
                                maxLength: 36,
                                writeOnly: true,
                                example: 'c840285e-e65f-4342-943f-5950ef8072dc',
                              },
                            ],
                          },
                          description: {
                            type: 'string',
                            description: 'A description of the Asset.',
                            example: 'Doosan excavators - DX225LC',
                          },
                          make: {
                            type: 'string',
                            description: 'The make of the Asset.',
                            example: 'Doosan',
                          },
                          model: {
                            type: 'string',
                            description: 'The model of the Asset.',
                            example: 'DL06',
                          },
                          name: {
                            type: 'string',
                            description: 'The name of the Asset.',
                            example: 'Doosan Excavator',
                          },
                          number: {
                            type: 'string',
                            description: 'A number associated with the Asset (e.g. a barcode).',
                            example: 'A123',
                          },
                          serial_number: {
                            type: 'string',
                            description: 'The serial number of the Asset.',
                            example: '1234567',
                          },
                          status: {
                            type: 'string',
                            enum: ['pending', 'linked', 'unlinked', 'invalid'],
                            example: 'linked',
                            description:
                              'The status of the Linked Account.\n- `pending`: New Linked Accounts are created in this state after a successful linking. In some cases, such as Procore, the account stays in the pending state until you choose a Company. Potential values include:\n- `linked`: The link is active and all API requests should work as expected.\n- `unlinked`: Either you or the user have requested the link to be revoked. To link the account again, the user needs to re-authorize.\n- `invalid`: The account has entered an invalid state, and requires a manual fix.\n',
                          },
                          type: {
                            type: 'string',
                            description: 'The type or class of the Asset.',
                            example: 'Excavator',
                          },
                          vendor_id: {
                            allOf: [
                              {
                                description:
                                  'The UUID assigned by Ronan of the [Vendor](#tag/vendors) that owns the Asset.',
                              },
                              {
                                type: 'string',
                                format: 'uuid',
                                minLength: 36,
                                maxLength: 36,
                                writeOnly: true,
                                example: 'c840285e-e65f-4342-943f-5950ef8072dc',
                              },
                            ],
                          },
                        },
                        required: [
                          'category',
                          'current_location_id',
                          'default_location_id',
                          'description',
                          'make',
                          'model',
                          'name',
                          'number',
                          'serial_number',
                          'status',
                          'type',
                          'vendor_id',
                        ],
                      },
                      {
                        type: 'object',
                        properties: {
                          source_data: {
                            type: 'object',
                            description:
                              'The Source Data as we received it from the Source System. \nSee [Source Data](https://docs.Ronanapi.com/Ronan-api/source-data) for more info.\n',
                            properties: {
                              EmeAutoChargeoutFlag: {
                                type: 'string',
                                example: 'Y',
                                description:
                                  'This is a flag used to denote whether automatic charge-out will be used for an Asset. Auto charge-out is for equipment left on site for the duration of the job. If the piece of equipment will be moved frequently and charged by the hour or day, use the manual charge-out feature.',
                              },
                              EmeBillRateRequiredFlag: {
                                type: 'string',
                                example: 'N',
                                description:
                                  "This is a flag that denotes whether CMiC's Billing Rate module is enabled.",
                              },
                              EmeBulkEquipmentFlag: {
                                type: 'string',
                                example: 'N',
                                description:
                                  'This is a flag to denote whether this Asset is being entered in bulk (i.e. includes quantities of the same equipment such as steel props, ladders, and fencing, etc).',
                              },
                              EmeDepreciationFlag: {
                                type: 'string',
                                example: 'N',
                                description:
                                  "THis is a flag that denotes whether CMiC's Asset depreciation functionality is enabled.",
                              },
                              EmeEqpHier: {
                                type: 'string',
                                example: '12345',
                                description:
                                  'This field allows you to create a hierarchy by entering a controlling equipment code in this field for two or more equipment items. The hierarchy will group the items together for different degrees of detail.',
                              },
                              EmeFixedAssetsFlag: {
                                type: 'string',
                                example: 'Y',
                                description:
                                  'This is a flag the denotes whether the Asset is fixed.',
                              },
                              EmeHomelocName: {
                                type: 'string',
                                example: 'New York Yard / Warehouse',
                                description: 'The name of the home location of the Asset.',
                              },
                              EmeUseMeterReadingFlag: {
                                type: 'string',
                                example: 'N',
                                description:
                                  'This is a flag used to denote whether functionality that allows users to track meter readings (e.g. mileage) is enabled.',
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
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
              'Ronan-Data-Retrieved': {
                schema: {
                  type: 'string',
                  format: 'date-time',
                  description:
                    'The datetime in ISO-8601 format that the data was retrieved from the Source System.',
                },
                example: '2021-11-20T09:12:28.000Z',
              },
            },
            content: {
              'application/json (Autodesk Build)': {
                schema: {
                  type: 'string',
                  example: 'example response',
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
          '429': {
            description: 'Too Many Requests',
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
                  description: 'Too Many Requests',
                  properties: {
                    rate_limit: {
                      description: 'Total rate limit (per minute)',
                      type: 'integer',
                      example: 60,
                    },
                    rate_limit_remaining: {
                      description: 'Remaining rate limit',
                      type: 'integer',
                      example: 56,
                    },
                    rate_limit_reset: {
                      description: 'How long until rate limits are reset',
                      type: 'string',
                      format: 'date-time',
                      example: '2021-11-20T09:12:28.000Z',
                    },
                  },
                },
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
  endpoint: '/assets',
};

export default specInfo;
