import { OpenAPIV2 } from 'openapi-types';

const spec: OpenAPIV2.Document = {
  swagger: '2.0',
  'x-stoplight': {
    id: 'mpmva0671drqf',
  },
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
  securityDefinitions: {
    Basic: {
      type: 'basic',
    },
  },
  security: [
    {
      Basic: [],
    },
  ],
  paths: {
    '/api/v1/payments/checkout/': {
      post: {
        operationId: 'checkout_create',
        description: 'View to create new Orders.',
        responses: {
          '201': {
            description: '',
            schema: {
              required: ['business', 'client', 'amount', 'reference', 'items'],
              type: 'object',
              properties: {
                id: {
                  title: 'ID',
                  type: 'integer',
                  readOnly: true,
                },
                created: {
                  title: 'Created',
                  type: 'string',
                  format: 'date-time',
                  readOnly: true,
                },
                business: {
                  title: 'Business',
                  type: 'string',
                  maxLength: 100,
                  minLength: 1,
                },
                client: {
                  title: 'Client',
                  type: 'string',
                  maxLength: 100,
                  minLength: 1,
                },
                amount: {
                  title: 'Amount',
                  type: 'string',
                  format: 'decimal',
                },
                status: {
                  title: 'Status',
                  type: 'string',
                  readOnly: true,
                },
                payment_method: {
                  title: 'Payment method',
                  type: 'string',
                  maxLength: 50,
                  'x-nullable': true,
                },
                reference: {
                  title: 'Reference',
                  type: 'string',
                  maxLength: 80,
                  minLength: 1,
                },
                is_oneclick: {
                  title: 'Is oneclick',
                  type: 'boolean',
                },
                items: {
                  type: 'array',
                  items: {
                    required: [
                      'description',
                      'product_reference',
                      'quantity',
                      'price_unit',
                      'discount',
                      'taxes',
                      'amount_total',
                    ],
                    type: 'object',
                    properties: {
                      description: {
                        title: 'Description',
                        type: 'string',
                        maxLength: 200,
                        minLength: 1,
                      },
                      product_reference: {
                        title: 'Product reference',
                        type: 'string',
                        maxLength: 50,
                        minLength: 1,
                      },
                      quantity: {
                        title: 'Quantity',
                        type: 'string',
                        format: 'decimal',
                      },
                      price_unit: {
                        title: 'Price unit',
                        type: 'string',
                        format: 'decimal',
                      },
                      discount: {
                        title: 'Discount',
                        type: 'string',
                        format: 'decimal',
                      },
                      taxes: {
                        title: 'Taxes',
                        type: 'string',
                        format: 'decimal',
                      },
                      amount_total: {
                        title: 'Amount total',
                        type: 'string',
                        format: 'decimal',
                      },
                    },
                  },
                  maxItems: 100,
                },
                billing_address: {
                  type: 'object',
                  properties: {
                    id: {
                      title: 'ID',
                      type: 'integer',
                      readOnly: true,
                    },
                    created: {
                      title: 'Created',
                      type: 'string',
                      format: 'date-time',
                      readOnly: true,
                    },
                    modified: {
                      title: 'Modified',
                      type: 'string',
                      format: 'date-time',
                      readOnly: true,
                    },
                    street: {
                      title: 'Street',
                      type: 'string',
                    },
                    number: {
                      title: 'Number',
                      type: 'string',
                      maxLength: 100,
                    },
                    suburb: {
                      title: 'Suburb',
                      type: 'string',
                      maxLength: 100,
                    },
                    zip_code: {
                      title: 'Zip code',
                      type: 'integer',
                      maximum: 2147483647,
                      minimum: -2147483648,
                    },
                    number_int: {
                      title: 'Number int',
                      type: 'string',
                      maxLength: 10,
                    },
                    number_ext: {
                      title: 'Number ext',
                      type: 'string',
                      maxLength: 10,
                    },
                    notes: {
                      title: 'Notes',
                      type: 'string',
                      maxLength: 255,
                    },
                    state: {
                      required: ['key', 'name'],
                      type: 'object',
                      properties: {
                        id: {
                          title: 'ID',
                          type: 'integer',
                          readOnly: true,
                        },
                        key: {
                          title: 'Key',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        name: {
                          title: 'Name',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        country: {
                          required: ['key', 'name', 'phone_code'],
                          type: 'object',
                          properties: {
                            id: {
                              title: 'ID',
                              type: 'integer',
                              readOnly: true,
                            },
                            key: {
                              title: 'Key',
                              description: 'Three-letter country code',
                              type: 'string',
                              maxLength: 3,
                              minLength: 1,
                            },
                            name: {
                              title: 'Name',
                              type: 'string',
                              maxLength: 140,
                              minLength: 1,
                            },
                            phone_code: {
                              title: 'Phone code',
                              description: 'Telephone code',
                              type: 'string',
                              maxLength: 10,
                              minLength: 1,
                            },
                          },
                          readOnly: true,
                        },
                      },
                      readOnly: true,
                    },
                    city: {
                      required: ['key', 'name'],
                      type: 'object',
                      properties: {
                        id: {
                          title: 'ID',
                          type: 'integer',
                          readOnly: true,
                        },
                        key: {
                          title: 'Key',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        name: {
                          title: 'Name',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        state: {
                          required: ['key', 'name', 'country'],
                          type: 'object',
                          properties: {
                            id: {
                              title: 'ID',
                              type: 'integer',
                              readOnly: true,
                            },
                            key: {
                              title: 'Key',
                              type: 'string',
                              maxLength: 255,
                              minLength: 1,
                            },
                            name: {
                              title: 'Name',
                              type: 'string',
                              maxLength: 255,
                              minLength: 1,
                            },
                            country: {
                              title: 'Country',
                              type: 'integer',
                            },
                          },
                          readOnly: true,
                        },
                      },
                      readOnly: true,
                    },
                    user: {
                      required: ['password', 'username'],
                      type: 'object',
                      properties: {
                        id: {
                          title: 'ID',
                          type: 'integer',
                          readOnly: true,
                        },
                        password: {
                          title: 'Password',
                          type: 'string',
                          maxLength: 128,
                          minLength: 1,
                        },
                        last_login: {
                          title: 'Last session',
                          type: 'string',
                          format: 'date-time',
                          'x-nullable': true,
                        },
                        is_superuser: {
                          title: 'Is superuser',
                          description: 'Indicates whether the user is a superuser',
                          type: 'boolean',
                        },
                        username: {
                          title: 'Username',
                          description:
                            'Required. Can only contain letters, numbers, and @/./+/-/_ ',
                          type: 'string',
                          pattern: '^[\\w.@+-]+$',
                          maxLength: 150,
                          minLength: 1,
                        },
                        first_name: {
                          title: 'First name',
                          type: 'string',
                          maxLength: 150,
                        },
                        last_name: {
                          title: 'Last name',
                          type: 'string',
                          maxLength: 150,
                        },
                        email: {
                          title: 'Email address',
                          type: 'string',
                          format: 'email',
                          maxLength: 254,
                        },
                        is_staff: {
                          title: 'Is staff',
                          description: 'Indicates whether the user is staff',
                          type: 'boolean',
                        },
                        is_active: {
                          title: 'Is active',
                          description: 'Indicates whether the user is active',
                          type: 'boolean',
                        },
                        date_joined: {
                          title: 'Date joined',
                          type: 'string',
                          format: 'date-time',
                        },
                        type: {
                          title: 'Type',
                          type: 'string',
                          enum: ['Client', 'Business', 'STAFF'],
                        },
                        name: {
                          title: 'Name of User',
                          type: 'string',
                          maxLength: 255,
                        },
                        groups: {
                          type: 'array',
                          items: {
                            required: ['name'],
                            type: 'object',
                            properties: {
                              id: {
                                title: 'ID',
                                type: 'integer',
                                readOnly: true,
                              },
                              name: {
                                title: 'Name',
                                type: 'string',
                                maxLength: 150,
                                minLength: 1,
                              },
                              permissions: {
                                type: 'array',
                                items: {
                                  title: 'Permissions',
                                  type: 'integer',
                                },
                                uniqueItems: true,
                                maxItems: 100,
                              },
                            },
                          },
                          readOnly: true,
                          maxItems: 100,
                        },
                        user_permissions: {
                          type: 'array',
                          items: {
                            required: ['name', 'codename', 'content_type'],
                            type: 'object',
                            properties: {
                              id: {
                                title: 'ID',
                                type: 'integer',
                                readOnly: true,
                              },
                              name: {
                                title: 'Name',
                                type: 'string',
                                maxLength: 255,
                                minLength: 1,
                              },
                              codename: {
                                title: 'Codename',
                                type: 'string',
                                maxLength: 100,
                                minLength: 1,
                              },
                              content_type: {
                                title: 'Content type',
                                type: 'integer',
                              },
                            },
                          },
                          readOnly: true,
                          maxItems: 100,
                        },
                      },
                      readOnly: true,
                    },
                  },
                  readOnly: true,
                },
                billing_address_id: {
                  title: 'Billing address id',
                  type: 'integer',
                  'x-nullable': true,
                },
                shipping_address: {
                  type: 'object',
                  properties: {
                    id: {
                      title: 'ID',
                      type: 'integer',
                      readOnly: true,
                    },
                    created: {
                      title: 'Created',
                      type: 'string',
                      format: 'date-time',
                      readOnly: true,
                    },
                    modified: {
                      title: 'Modified',
                      type: 'string',
                      format: 'date-time',
                      readOnly: true,
                    },
                    street: {
                      title: 'Street',
                      type: 'string',
                    },
                    number: {
                      title: 'Number',
                      type: 'string',
                      maxLength: 100,
                    },
                    suburb: {
                      title: 'Suburb',
                      type: 'string',
                      maxLength: 100,
                    },
                    zip_code: {
                      title: 'Zip code',
                      type: 'integer',
                      maximum: 2147483647,
                      minimum: -2147483648,
                    },
                    number_int: {
                      title: 'Number int',
                      type: 'string',
                      maxLength: 10,
                    },
                    number_ext: {
                      title: 'Number ext',
                      type: 'string',
                      maxLength: 10,
                    },
                    notes: {
                      title: 'Notes',
                      type: 'string',
                      maxLength: 255,
                    },
                    state: {
                      required: ['key', 'name'],
                      type: 'object',
                      properties: {
                        id: {
                          title: 'ID',
                          type: 'integer',
                          readOnly: true,
                        },
                        key: {
                          title: 'Key',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        name: {
                          title: 'Name',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        country: {
                          required: ['key', 'name', 'phone_code'],
                          type: 'object',
                          properties: {
                            id: {
                              title: 'ID',
                              type: 'integer',
                              readOnly: true,
                            },
                            key: {
                              title: 'Key',
                              description: 'Three-letter country code',
                              type: 'string',
                              maxLength: 3,
                              minLength: 1,
                            },
                            name: {
                              title: 'Name',
                              type: 'string',
                              maxLength: 140,
                              minLength: 1,
                            },
                            phone_code: {
                              title: 'Phone code',
                              description: 'Telephone code',
                              type: 'string',
                              maxLength: 10,
                              minLength: 1,
                            },
                          },
                          readOnly: true,
                        },
                      },
                      readOnly: true,
                    },
                    city: {
                      required: ['key', 'name'],
                      type: 'object',
                      properties: {
                        id: {
                          title: 'ID',
                          type: 'integer',
                          readOnly: true,
                        },
                        key: {
                          title: 'Key',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        name: {
                          title: 'Name',
                          type: 'string',
                          maxLength: 255,
                          minLength: 1,
                        },
                        state: {
                          required: ['key', 'name', 'country'],
                          type: 'object',
                          properties: {
                            id: {
                              title: 'ID',
                              type: 'integer',
                              readOnly: true,
                            },
                            key: {
                              title: 'Key',
                              type: 'string',
                              maxLength: 255,
                              minLength: 1,
                            },
                            name: {
                              title: 'Name',
                              type: 'string',
                              maxLength: 255,
                              minLength: 1,
                            },
                            country: {
                              title: 'Country',
                              type: 'integer',
                            },
                          },
                          readOnly: true,
                        },
                      },
                      readOnly: true,
                    },
                    user: {
                      required: ['password', 'username'],
                      type: 'object',
                      properties: {
                        id: {
                          title: 'ID',
                          type: 'integer',
                          readOnly: true,
                        },
                        password: {
                          title: 'Password',
                          type: 'string',
                          maxLength: 128,
                          minLength: 1,
                        },
                        last_login: {
                          title: 'Last session',
                          type: 'string',
                          format: 'date-time',
                          'x-nullable': true,
                        },
                        is_superuser: {
                          title: 'Is superuser',
                          description: 'Indicates whether the user is a superuser',
                          type: 'boolean',
                        },
                        username: {
                          title: 'Username',
                          description:
                            'Required. Can only contain letters, numbers, and @/./+/-/_ ',
                          type: 'string',
                          pattern: '^[\\w.@+-]+$',
                          maxLength: 150,
                          minLength: 1,
                        },
                        first_name: {
                          title: 'First name',
                          type: 'string',
                          maxLength: 150,
                        },
                        last_name: {
                          title: 'Last name',
                          type: 'string',
                          maxLength: 150,
                        },
                        email: {
                          title: 'Email address',
                          type: 'string',
                          format: 'email',
                          maxLength: 254,
                        },
                        is_staff: {
                          title: 'Is staff',
                          description: 'Indicates whether the user is staff',
                          type: 'boolean',
                        },
                        is_active: {
                          title: 'Is active',
                          description: 'Indicates whether the user is active',
                          type: 'boolean',
                        },
                        date_joined: {
                          title: 'Date joined',
                          type: 'string',
                          format: 'date-time',
                        },
                        type: {
                          title: 'Type',
                          type: 'string',
                          enum: ['Client', 'Business', 'STAFF'],
                        },
                        name: {
                          title: 'Name of User',
                          type: 'string',
                          maxLength: 255,
                        },
                        groups: {
                          type: 'array',
                          items: {
                            required: ['name'],
                            type: 'object',
                            properties: {
                              id: {
                                title: 'ID',
                                type: 'integer',
                                readOnly: true,
                              },
                              name: {
                                title: 'Name',
                                type: 'string',
                                maxLength: 150,
                                minLength: 1,
                              },
                              permissions: {
                                type: 'array',
                                items: {
                                  title: 'Permissions',
                                  type: 'integer',
                                },
                                uniqueItems: true,
                                maxItems: 100,
                              },
                            },
                          },
                          readOnly: true,
                          maxItems: 100,
                        },
                        user_permissions: {
                          type: 'array',
                          items: {
                            required: ['name', 'codename', 'content_type'],
                            type: 'object',
                            properties: {
                              id: {
                                title: 'ID',
                                type: 'integer',
                                readOnly: true,
                              },
                              name: {
                                title: 'Name',
                                type: 'string',
                                maxLength: 255,
                                minLength: 1,
                              },
                              codename: {
                                title: 'Codename',
                                type: 'string',
                                maxLength: 100,
                                minLength: 1,
                              },
                              content_type: {
                                title: 'Content type',
                                type: 'integer',
                              },
                            },
                          },
                          readOnly: true,
                          maxItems: 100,
                        },
                      },
                      readOnly: true,
                    },
                  },
                  readOnly: true,
                },
                shipping_address_id: {
                  title: 'Shipping address id',
                  type: 'integer',
                  'x-nullable': true,
                },
              },
            },
          },
        },
      },
      parameters: [],
    },
  },
} as OpenAPIV2.Document;

const specInfo = {
  spec,
  method: 'post',
  endpoint: '/api/v1/payments/checkout/',
};

export default specInfo;
