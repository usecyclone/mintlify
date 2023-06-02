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
    description: 'Find out more about Dots',
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
    '/api/transactions/create': {
      post: {
        tags: ['transactions'],
        summary: 'Create transaction',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: 'this is my test string',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      description: 'Error message if success is false',
                    },
                    transaction: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer',
                        },
                        date: {
                          type: 'string',
                        },
                        source_username: {
                          type: 'string',
                        },
                        destination_username: {
                          type: 'string',
                        },
                        amount: {
                          type: 'number',
                        },
                        type: {
                          type: 'string',
                          enum: ['credit', 'wallet'],
                        },
                        completed: {
                          type: 'boolean',
                        },
                        notes: {
                          type: 'object',
                        },
                        receipt: {
                          type: 'object',
                          properties: {
                            items: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  name: {
                                    type: 'string',
                                  },
                                  unit_amount: {
                                    type: 'integer',
                                  },
                                  quantity: {
                                    type: 'integer',
                                  },
                                  description: {
                                    type: 'string',
                                  },
                                },
                              },
                            },
                            breakdown: {
                              type: 'object',
                              properties: {
                                items_total: {
                                  type: 'integer',
                                },
                                tax: {
                                  type: 'integer',
                                },
                                shipping: {
                                  type: 'integer',
                                },
                              },
                            },
                          },
                        },
                        credit_transaction_id: {
                          type: 'string',
                        },
                      },
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
                      example: 'Source and destination user cannot be the same',
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
          '404': {
            description: 'User not found',
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
  security: [
    {
      basicAuth: [],
    },
  ],
};

const specInfo = {
  spec,
  method: 'post',
  endpoint: '/api/transactions/create',
};

export default specInfo;
