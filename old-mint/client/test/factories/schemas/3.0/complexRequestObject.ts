import { OpenAPIV3 } from 'openapi-types';

const spec: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'Ronan Endpoint',
    description: 'Ronan end point descriptions',
    contact: {
      email: 'contact@ronan.com',
    },
    version: '1.0.0',
  },
  externalDocs: {
    description: 'Find out more about Ronan',
    url: 'https://docs.ronan.dev',
  },
  servers: [
    {
      url: 'https://api.ronan.com/',
    },
    {
      url: 'https://api.ronan.com/',
    },
  ],
  tags: [
    {
      name: 'users',
      description: 'Interact with users',
    },
    {
      name: 'payouts',
      description: 'Create payouts',
    },
    {
      name: 'transactions',
      description: 'Create transactions',
    },
    {
      name: 'metrics',
      description: 'Access Metrics',
    },
    {
      name: 'flows',
      description: 'Dots Flows',
    },
  ],
  paths: {
    '/api/transactions/create_payment': {
      post: {
        tags: ['transactions'],
        summary: "Create an ACH payment from a user's bank account with their Plaid information",
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  first_name: {
                    type: 'string',
                  },
                  last_name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  amount: {
                    type: 'number',
                    minimum: 0,
                    exclusiveMinimum: true,
                  },
                  routing_number: {
                    type: 'string',
                  },
                  account_number: {
                    type: 'string',
                  },
                  account_type: {
                    type: 'string',
                    enum: ['checking', 'savings'],
                  },
                  plaid: {
                    type: 'object',
                    properties: {
                      balances: {
                        type: 'object',
                        properties: {
                          available: {
                            type: 'number',
                            nullable: true,
                          },
                          current: {
                            type: 'number',
                            nullable: true,
                          },
                          limit: {
                            type: 'number',
                            nullable: true,
                          },
                          iso_currency_code: {
                            type: 'string',
                            nullable: true,
                          },
                          unofficial_currency_code: {
                            type: 'string',
                            nullable: true,
                          },
                        },
                      },
                      transactions: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            account_id: {
                              type: 'string',
                            },
                            amount: {
                              type: 'number',
                            },
                            iso_currency_code: {
                              type: 'string',
                              nullable: true,
                            },
                            unofficial_currency_code: {
                              type: 'string',
                              nullable: true,
                            },
                            category: {
                              type: 'array',
                              nullable: true,
                              items: {
                                type: 'string',
                              },
                            },
                            category_id: {
                              type: 'string',
                              nullable: true,
                            },
                            date: {
                              type: 'string',
                            },
                            datetime: {
                              type: 'string',
                              nullable: true,
                            },
                            location: {
                              type: 'object',
                              properties: {
                                address: {
                                  type: 'string',
                                  nullable: true,
                                },
                                city: {
                                  type: 'string',
                                  nullable: true,
                                },
                                state: {
                                  type: 'string',
                                  nullable: true,
                                },
                                zip: {
                                  type: 'string',
                                  nullable: true,
                                },
                                lat: {
                                  type: 'number',
                                  nullable: true,
                                },
                                lon: {
                                  type: 'number',
                                  nullable: true,
                                },
                              },
                            },
                            name: {
                              type: 'string',
                            },
                            payment_meta: {
                              type: 'object',
                              properties: {
                                by_order_of: {
                                  type: 'string',
                                  nullable: true,
                                },
                                payee: {
                                  type: 'string',
                                  nullable: true,
                                },
                                payer: {
                                  type: 'string',
                                  nullable: true,
                                },
                                payment_method: {
                                  type: 'string',
                                  nullable: true,
                                },
                                payment_processor: {
                                  type: 'string',
                                  nullable: true,
                                },
                                ppd_id: {
                                  type: 'string',
                                  nullable: true,
                                },
                                reason: {
                                  type: 'string',
                                  nullable: true,
                                },
                                reference_number: {
                                  type: 'string',
                                  nullable: true,
                                },
                              },
                            },
                            pending: {
                              type: 'boolean',
                            },
                            pending_transaction_id: {
                              type: 'string',
                              nullable: true,
                            },
                            transaction_id: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                    message: {
                      type: 'string',
                      example: 'Amount must be greater than 0',
                    },
                  },
                },
              },
            },
          },
          '403': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
  },
  security: [
    {
      basicAuth: [],
    },
  ],
};

const specInfo = {
  spec,
  method: 'post',
  endpoint: '/api/transactions/create_payment',
};

export default specInfo;
