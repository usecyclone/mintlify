import { OpenAPIV3 } from 'openapi-types';

const spec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Ronan API',
    version: '1.0.0',
  },
  paths: {
    '/check-api-key': {
      get: {
        security: [
          {
            Basic: [],
            AccessKey: [],
            QueryKey: [],
          },
        ],
        operationId: 'GetCheckApiKey',
        responses: {
          '200': {
            description: 'GET /check-api-key Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['success'],
                    },
                    data: {
                      type: 'object',
                      properties: {
                        environment_id: {
                          type: 'string',
                        },
                        customer_id: {
                          type: 'string',
                          description: '**(⚠️ Deprecated)** Renamed to `environment_id`.',
                          deprecated: true,
                        },
                      },
                      required: ['environment_id', 'customer_id'],
                      example: {
                        environment_id: '2Uev1YUTqLFdvMPD3Jtrg2FX',
                        customer_id: '2Uev1YUTqLFdvMPD3Jtrg2FX',
                      },
                    },
                  },
                  required: ['status', 'data'],
                },
                examples: {
                  example1: {
                    value: {
                      status: 'success',
                      data: {
                        environment_id: '2Uev1YUTqLFdvMPD3Jtrg2FX',
                        customer_id: '2Uev1YUTqLFdvMPD3Jtrg2FX',
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'GET /check-api-key Error response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['error'],
                    },
                    error: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                      required: ['message'],
                    },
                  },
                  required: ['status', 'error'],
                },
                examples: {
                  example1: {
                    value: {
                      status: 'error',
                      error: {
                        message: 'Sample error message',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        description:
          'Check whether your API key is working properly.\n\n```json\n{\n  "status": "success",\n  "data": {\n    "environment_id": "2Uev1YUTqLFdvMPD3Jtrg2FX",\n    "customer_id": "2Uev1YUTqLFdvMPD3Jtrg2FX"\n  }\n}\n```',
        summary: 'Check API key',
        tags: ['General'],
      },
    },
  },
  components: {
    securitySchemes: {
      ApiKey: {
        type: 'http',
        scheme: 'bearer',
        description: 'You can find your API key on the Ronan dashboard.',
      },
      AccessKey: {
        type: 'apiKey',
        in: 'header',
        name: 'AccessKey',
      },
      QueryKey: {
        type: 'apiKey',
        in: 'query',
        name: 'QueryKey',
      },
      Basic: {
        type: 'http',
        scheme: 'basic',
      },
    },
  },
  tags: [
    {
      name: 'General',
    },
    {
      name: 'Ronan Connect',
      description:
        'Endpoints for Ronan Connect, our end-user-facing flow for setting up new integrations.',
    },
    {
      name: 'Unified HRIS API',
      description: 'Unified endpoints to access all the HR concepts you might need.',
    },
  ],
  servers: [
    {
      url: 'https://api.Ronan.dev/v1',
    },
  ],
  security: [
    {
      ApiKey: [],
      AccessKey: [],
      QueryKey: [],
    },
  ],
};

const specInfo = {
  spec,
  method: 'get',
  endpoint: '/check-api-key',
};

export default specInfo;
