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
    '/ar-payments': {
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
      get: {
        operationId: 'listArPayments',
        tags: ['ar-payments'],
        summary: 'All AR Payments',
        description:
          'This endpoint retrieves a list of Accounts Receivable Payments a Linked User can access.',
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
              'application/json (QuickBooks Online)': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      description: 'A list of AR Payments a Linked User can access.',
                      items: {
                        allOf: [
                          {
                            type: 'object',
                            properties: {
                              id: {
                                allOf: [
                                  {
                                    description: 'The UUID of the AR Payment assigned by Ronan.',
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
                                description: 'The ID of the AR Payment in the Source System.',
                              },
                              amount: {
                                type: 'string',
                                description: 'The total amount of the AR Payment, including tax.',
                                example: 100,
                              },
                              batch: {
                                type: 'string',
                                description: 'The batch the AR Payment is associated with.',
                                example: '4',
                              },
                              currency_code: {
                                type: 'string',
                                description:
                                  "The code of the AR Payment's currency. Valid values are ISO 4217 codes.",
                                example: 'USD',
                              },
                              customer_id: {
                                allOf: [
                                  {
                                    description:
                                      'The UUID assigned by Ronan of the [Customer](#tag/customers).',
                                  },
                                  {
                                    type: 'string',
                                    format: 'uuid',
                                    readOnly: true,
                                    example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                  },
                                ],
                              },
                              description: {
                                type: 'string',
                                description: 'A description of the AR Payment.',
                                example: 'Partial payment for January invoice.',
                              },
                              ledger_account_id: {
                                allOf: [
                                  {
                                    description:
                                      'The UUID assigned by Ronan of the [Ledger Account](#tag/ledger-accounts) for the AR Payment.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'uuid',
                                    readOnly: true,
                                    example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                  },
                                ],
                              },
                              line_items: {
                                type: 'array',
                                description: 'The line items for the AR Payment.',
                                items: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID of the Line Item assigned by Ronan.',
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
                                      description: 'The ID of the Line Item in the Source System.',
                                    },
                                    amount: {
                                      allOf: [
                                        {
                                          type: 'string',
                                          format: 'string',
                                          example: '100.00',
                                        },
                                        {
                                          description:
                                            'The total monetary amount of the Line Item, including tax.',
                                        },
                                        {
                                          example: '100.00',
                                        },
                                      ],
                                    },
                                    ar_invoice_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [AR Invoice](#tag/ar-invoices) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    ar_invoice_line_item_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [AR Invoice Line Item](#tag/ar-invoices) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    ledger_account_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [Ledger Account](#tag/ledger-accounts) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    type: {
                                      type: 'string',
                                      description:
                                        'The type of the AR Payment Line Item. **Note for Viewpoint Vista:** possible values include "Contract" or "Material".\n',
                                      example: 'Contract',
                                    },
                                    source_create_time: {
                                      allOf: [
                                        {
                                          description:
                                            'The datetime the Line Item was created in the Source System.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'date-time',
                                          example: '2022-01-01T00:00:00.000Z',
                                        },
                                      ],
                                    },
                                    source_update_time: {
                                      allOf: [
                                        {
                                          description:
                                            'The datetime the Line Item was last updated in the Source System.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'date-time',
                                          example: '2022-01-01T00:00:00.000Z',
                                        },
                                      ],
                                    },
                                  },
                                },
                              },
                              number: {
                                type: 'string',
                                description: 'The number associated with the AR Payment.',
                                example: 'A123',
                              },
                              status: {
                                type: 'string',
                                description:
                                  'The status of the AR Payment. **Note for Viewpoint Vista:** only "Posted" AR Payments are returned. \n',
                                example: 'Posted',
                              },
                              type: {
                                type: 'string',
                                description:
                                  'The type of AR Payment. **Note for Viewpoint Vista:** the only value for this field is "Payment". \n',
                                example: 'Payment',
                              },
                              transaction_date: {
                                allOf: [
                                  {
                                    description: 'The date of the AR Payment.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                              source_create_time: {
                                allOf: [
                                  {
                                    description:
                                      'The datetime the AR Payment was created in the Source System.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date-time',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                              source_update_time: {
                                allOf: [
                                  {
                                    description:
                                      'The datetime the AR Payment was last updated in the Source System.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date-time',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                            },
                          },
                          {
                            type: 'object',
                            properties: {
                              source_data: {
                                type: 'object',
                                description:
                                  'The Source Data as we received it from the Source System. \nSee [Source Data](https://docs.Ronanapi.com/Ronan-api/source-data) for more info.\n',
                                properties: {
                                  path: {
                                    type: 'string',
                                    description: 'The URL path on the Source System.',
                                    example:
                                      'https://quickbooks.api.intuit.com/v3/company/{companyId}/query',
                                  },
                                  content_type: {
                                    type: 'string',
                                    description: 'The content type of the Source Data.',
                                    example: 'application/json',
                                  },
                                  data: {
                                    type: 'string',
                                    description: 'The raw data from the Source System.',
                                    example: {
                                      CustomerRef: {
                                        value: '123',
                                        name: 'AnyCompany Inc.',
                                      },
                                      DepositToAccountRef: {
                                        value: '123',
                                      },
                                      TotalAmt: 130.12,
                                      UnappliedAmt: 0,
                                      ProcessPayment: false,
                                      domain: 'QBO',
                                      sparse: false,
                                      Id: '123',
                                      SyncToken: '0',
                                      MetaData: {
                                        CreateTime: '2022-01-01T00:00:00.000Z',
                                        LastUpdatedTime: '2022-01-01T00:00:00.000Z',
                                      },
                                      TxnDate: '2022-01-01T00:00:00.000Z',
                                      CurrencyRef: {
                                        value: 'USD',
                                        name: 'United States Dollar',
                                      },
                                      Line: [
                                        {
                                          Amount: 130.12,
                                          LinkedTxn: [
                                            {
                                              TxnId: '123',
                                              TxnType: 'Invoice',
                                            },
                                          ],
                                          LineEx: {
                                            any: [
                                              {
                                                name: '{http://schema.intuit.com/finance/v3}NameValue',
                                                declaredType:
                                                  'com.intuit.schema.finance.v3.NameValue',
                                                scope: 'javax.xml.bind.JAXBElement$GlobalScope',
                                                value: {
                                                  Name: 'txnId',
                                                  Value: '123',
                                                },
                                                nil: false,
                                                globalScope: true,
                                                typeSubstituted: false,
                                              },
                                              {
                                                name: '{http://schema.intuit.com/finance/v3}NameValue',
                                                declaredType:
                                                  'com.intuit.schema.finance.v3.NameValue',
                                                scope: 'javax.xml.bind.JAXBElement$GlobalScope',
                                                value: {
                                                  Name: 'txnOpenBalance',
                                                  Value: '130.12',
                                                },
                                                nil: false,
                                                globalScope: true,
                                                typeSubstituted: false,
                                              },
                                              {
                                                name: '{http://schema.intuit.com/finance/v3}NameValue',
                                                declaredType:
                                                  'com.intuit.schema.finance.v3.NameValue',
                                                scope: 'javax.xml.bind.JAXBElement$GlobalScope',
                                                value: {
                                                  Name: 'txnReferenceNumber',
                                                  Value: '123',
                                                },
                                                nil: false,
                                                globalScope: true,
                                                typeSubstituted: false,
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    meta: {
                      type: 'object',
                      description:
                        'The pagination metadata. See [Pagination](/Ronan-api/pagination) for more info.',
                      readOnly: true,
                      properties: {
                        current_page: {
                          type: 'integer',
                          description: 'The current page. Starts at 1.',
                        },
                        has_more_results: {
                          type: 'boolean',
                          description:
                            "Whether there are any more result pages. Can be `null` if we don't know the total number.",
                        },
                      },
                      example: {
                        current_page: 1,
                        has_more_results: true,
                      },
                    },
                  },
                },
              },
              'application/json (ServiceTitan)': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      description: 'A list of AR Payments a Linked User can access.',
                      items: {
                        allOf: [
                          {
                            type: 'object',
                            properties: {
                              id: {
                                allOf: [
                                  {
                                    description: 'The UUID of the AR Payment assigned by Ronan.',
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
                                description: 'The ID of the AR Payment in the Source System.',
                              },
                              amount: {
                                type: 'string',
                                description: 'The total amount of the AR Payment, including tax.',
                                example: 100,
                              },
                              batch: {
                                type: 'string',
                                description: 'The batch the AR Payment is associated with.',
                                example: '4',
                              },
                              currency_code: {
                                type: 'string',
                                description:
                                  "The code of the AR Payment's currency. Valid values are ISO 4217 codes.",
                                example: 'USD',
                              },
                              customer_id: {
                                allOf: [
                                  {
                                    description:
                                      'The UUID assigned by Ronan of the [Customer](#tag/customers).',
                                  },
                                  {
                                    type: 'string',
                                    format: 'uuid',
                                    readOnly: true,
                                    example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                  },
                                ],
                              },
                              description: {
                                type: 'string',
                                description: 'A description of the AR Payment.',
                                example: 'Partial payment for January invoice.',
                              },
                              ledger_account_id: {
                                allOf: [
                                  {
                                    description:
                                      'The UUID assigned by Ronan of the [Ledger Account](#tag/ledger-accounts) for the AR Payment.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'uuid',
                                    readOnly: true,
                                    example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                  },
                                ],
                              },
                              line_items: {
                                type: 'array',
                                description: 'The line items for the AR Payment.',
                                items: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID of the Line Item assigned by Ronan.',
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
                                      description: 'The ID of the Line Item in the Source System.',
                                    },
                                    amount: {
                                      allOf: [
                                        {
                                          type: 'string',
                                          format: 'string',
                                          example: '100.00',
                                        },
                                        {
                                          description:
                                            'The total monetary amount of the Line Item, including tax.',
                                        },
                                        {
                                          example: '100.00',
                                        },
                                      ],
                                    },
                                    ar_invoice_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [AR Invoice](#tag/ar-invoices) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    ar_invoice_line_item_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [AR Invoice Line Item](#tag/ar-invoices) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    ledger_account_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [Ledger Account](#tag/ledger-accounts) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    type: {
                                      type: 'string',
                                      description:
                                        'The type of the AR Payment Line Item. **Note for Viewpoint Vista:** possible values include "Contract" or "Material".\n',
                                      example: 'Contract',
                                    },
                                    source_create_time: {
                                      allOf: [
                                        {
                                          description:
                                            'The datetime the Line Item was created in the Source System.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'date-time',
                                          example: '2022-01-01T00:00:00.000Z',
                                        },
                                      ],
                                    },
                                    source_update_time: {
                                      allOf: [
                                        {
                                          description:
                                            'The datetime the Line Item was last updated in the Source System.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'date-time',
                                          example: '2022-01-01T00:00:00.000Z',
                                        },
                                      ],
                                    },
                                  },
                                },
                              },
                              number: {
                                type: 'string',
                                description: 'The number associated with the AR Payment.',
                                example: 'A123',
                              },
                              status: {
                                type: 'string',
                                description:
                                  'The status of the AR Payment. **Note for Viewpoint Vista:** only "Posted" AR Payments are returned. \n',
                                example: 'Posted',
                              },
                              type: {
                                type: 'string',
                                description:
                                  'The type of AR Payment. **Note for Viewpoint Vista:** the only value for this field is "Payment". \n',
                                example: 'Payment',
                              },
                              transaction_date: {
                                allOf: [
                                  {
                                    description: 'The date of the AR Payment.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                              source_create_time: {
                                allOf: [
                                  {
                                    description:
                                      'The datetime the AR Payment was created in the Source System.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date-time',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                              source_update_time: {
                                allOf: [
                                  {
                                    description:
                                      'The datetime the AR Payment was last updated in the Source System.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date-time',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                            },
                          },
                          {
                            type: 'object',
                            properties: {
                              source_data: {
                                type: 'object',
                                description:
                                  'The Source Data as we received it from the Source System. \nSee [Source Data](https://docs.Ronanapi.com/Ronan-api/source-data) for more info.\n',
                                properties: {
                                  path: {
                                    type: 'string',
                                    description: 'The URL path on the Source System.',
                                    example:
                                      'https://api.servicetitan.io/accounting/v2/tenant/{tenantId}/payments',
                                  },
                                  content_type: {
                                    type: 'string',
                                    description: 'The content type of the Source Data.',
                                    example: 'application/json',
                                  },
                                  data: {
                                    type: 'string',
                                    description: 'The raw data from the Source System.',
                                    example: {
                                      id: 123,
                                      syncStatus: 'Pending',
                                      referenceNumber: null,
                                      date: '2022-01-01T00:00:00.000Z',
                                      type: 'Cash',
                                      typeId: '12345',
                                      total: '130.12',
                                      unappliedAmount: '0.00',
                                      memo: null,
                                      customer: {
                                        id: 123,
                                        name: 'John Doe',
                                      },
                                      batch: null,
                                      createdBy: 'jdoe',
                                      generalLedgerAccount: null,
                                      appliedTo: [
                                        {
                                          appliedTo: 123,
                                          appliedAmount: '130.12',
                                          appliedOn: '2022-01-01T00:00:00.000Z',
                                          appliedBy: 'jdoe',
                                        },
                                      ],
                                      customFields: null,
                                      authCode: null,
                                      checkNumber: 'A123',
                                    },
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    meta: {
                      type: 'object',
                      description:
                        'The pagination metadata. See [Pagination](/Ronan-api/pagination) for more info.',
                      readOnly: true,
                      properties: {
                        current_page: {
                          type: 'integer',
                          description: 'The current page. Starts at 1.',
                        },
                        has_more_results: {
                          type: 'boolean',
                          description:
                            "Whether there are any more result pages. Can be `null` if we don't know the total number.",
                        },
                      },
                      example: {
                        current_page: 1,
                        has_more_results: true,
                      },
                    },
                  },
                },
              },
              'application/json (Viewpoint Vista)': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      description: 'A list of AR Payments a Linked User can access.',
                      items: {
                        allOf: [
                          {
                            type: 'object',
                            properties: {
                              id: {
                                allOf: [
                                  {
                                    description: 'The UUID of the AR Payment assigned by Ronan.',
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
                                description: 'The ID of the AR Payment in the Source System.',
                              },
                              amount: {
                                type: 'string',
                                description: 'The total amount of the AR Payment, including tax.',
                                example: 100,
                              },
                              batch: {
                                type: 'string',
                                description: 'The batch the AR Payment is associated with.',
                                example: '4',
                              },
                              currency_code: {
                                type: 'string',
                                description:
                                  "The code of the AR Payment's currency. Valid values are ISO 4217 codes.",
                                example: 'USD',
                              },
                              customer_id: {
                                allOf: [
                                  {
                                    description:
                                      'The UUID assigned by Ronan of the [Customer](#tag/customers).',
                                  },
                                  {
                                    type: 'string',
                                    format: 'uuid',
                                    readOnly: true,
                                    example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                  },
                                ],
                              },
                              description: {
                                type: 'string',
                                description: 'A description of the AR Payment.',
                                example: 'Partial payment for January invoice.',
                              },
                              ledger_account_id: {
                                allOf: [
                                  {
                                    description:
                                      'The UUID assigned by Ronan of the [Ledger Account](#tag/ledger-accounts) for the AR Payment.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'uuid',
                                    readOnly: true,
                                    example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                  },
                                ],
                              },
                              line_items: {
                                type: 'array',
                                description: 'The line items for the AR Payment.',
                                items: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID of the Line Item assigned by Ronan.',
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
                                      description: 'The ID of the Line Item in the Source System.',
                                    },
                                    amount: {
                                      allOf: [
                                        {
                                          type: 'string',
                                          format: 'string',
                                          example: '100.00',
                                        },
                                        {
                                          description:
                                            'The total monetary amount of the Line Item, including tax.',
                                        },
                                        {
                                          example: '100.00',
                                        },
                                      ],
                                    },
                                    ar_invoice_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [AR Invoice](#tag/ar-invoices) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    ar_invoice_line_item_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [AR Invoice Line Item](#tag/ar-invoices) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    ledger_account_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The UUID assigned by Ronan of the [Ledger Account](#tag/ledger-accounts) for the Line Item.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'uuid',
                                          readOnly: true,
                                          example: 'ee9b53e7-f982-4be6-bc12-75f716d3ee94',
                                        },
                                      ],
                                    },
                                    type: {
                                      type: 'string',
                                      description:
                                        'The type of the AR Payment Line Item. **Note for Viewpoint Vista:** possible values include "Contract" or "Material".\n',
                                      example: 'Contract',
                                    },
                                    source_create_time: {
                                      allOf: [
                                        {
                                          description:
                                            'The datetime the Line Item was created in the Source System.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'date-time',
                                          example: '2022-01-01T00:00:00.000Z',
                                        },
                                      ],
                                    },
                                    source_update_time: {
                                      allOf: [
                                        {
                                          description:
                                            'The datetime the Line Item was last updated in the Source System.',
                                        },
                                        {
                                          type: 'string',
                                          format: 'date-time',
                                          example: '2022-01-01T00:00:00.000Z',
                                        },
                                      ],
                                    },
                                  },
                                },
                              },
                              number: {
                                type: 'string',
                                description: 'The number associated with the AR Payment.',
                                example: 'A123',
                              },
                              status: {
                                type: 'string',
                                description:
                                  'The status of the AR Payment. **Note for Viewpoint Vista:** only "Posted" AR Payments are returned. \n',
                                example: 'Posted',
                              },
                              type: {
                                type: 'string',
                                description:
                                  'The type of AR Payment. **Note for Viewpoint Vista:** the only value for this field is "Payment". \n',
                                example: 'Payment',
                              },
                              transaction_date: {
                                allOf: [
                                  {
                                    description: 'The date of the AR Payment.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                              source_create_time: {
                                allOf: [
                                  {
                                    description:
                                      'The datetime the AR Payment was created in the Source System.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date-time',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                              source_update_time: {
                                allOf: [
                                  {
                                    description:
                                      'The datetime the AR Payment was last updated in the Source System.',
                                  },
                                  {
                                    type: 'string',
                                    format: 'date-time',
                                    example: '2022-01-01T00:00:00.000Z',
                                  },
                                ],
                              },
                            },
                          },
                          {
                            type: 'object',
                            properties: {
                              source_data: {
                                type: 'object',
                                description:
                                  'The Source Data as we received it from the Source System. \nSee [Source Data](https://docs.Ronanapi.com/Ronan-api/source-data) for more info.\n',
                                properties: {
                                  path: {
                                    type: 'string',
                                    description: 'The SQL path on the Source System.',
                                    example:
                                      'Select * from [bARTH] where [bARTH].[ARCo] = {Company} and [ARTransType] = P',
                                  },
                                  content_type: {
                                    type: 'string',
                                    description: 'The content type of the Source Data.',
                                    example: 'application/json',
                                  },
                                  data: {
                                    type: 'string',
                                    description: 'The raw data from the Source System.',
                                    example: {
                                      ARCo: '12345',
                                      Mth: '2022-01-01T00:00:00.000Z',
                                      ARTrans: '4',
                                      ARTransType: 'P',
                                      CustGroup: '12345',
                                      Customer: '12345',
                                      CustRef: null,
                                      CustPO: null,
                                      RecType: null,
                                      JCCo: null,
                                      Contract: null,
                                      Invoice: null,
                                      CheckNo: null,
                                      Source: 'AR Receipt',
                                      MSCo: null,
                                      TransDate: '2022-01-01T00:00:00.000Z',
                                      DueDate: null,
                                      DiscDate: null,
                                      CheckDate: '2022-01-01T00:00:00.000Z',
                                      Description: 'Partial payment for January invoice.',
                                      CMCo: '12345',
                                      CMAcct: '12345',
                                      CMDeposit: '12345',
                                      CreditAmt: '100.00',
                                      PayTerms: null,
                                      AppliedMth: null,
                                      AppliedTrans: null,
                                      Invoiced: '100.00',
                                      Paid: '100.00',
                                      Retainage: '.00',
                                      DiscTaken: '.00',
                                      AmountDue: '.00',
                                      PayFullDate: null,
                                      PurgeFlag: 'N',
                                      EditTrans: 'Y',
                                      BatchId: '4',
                                      InUseBatchID: null,
                                      Notes: null,
                                      ReasonCode: null,
                                      ExcludeFC: 'N',
                                      FinanceChg: '.00',
                                      UniqueAttchID: null,
                                      KeyID: '12345',
                                    },
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    meta: {
                      type: 'object',
                      description:
                        'The pagination metadata. See [Pagination](/Ronan-api/pagination) for more info.',
                      readOnly: true,
                      properties: {
                        current_page: {
                          type: 'integer',
                          description: 'The current page. Starts at 1.',
                        },
                        has_more_results: {
                          type: 'boolean',
                          description:
                            "Whether there are any more result pages. Can be `null` if we don't know the total number.",
                        },
                      },
                      example: {
                        current_page: 1,
                        has_more_results: true,
                      },
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
  method: 'get',
  endpoint: '/ar-payments',
};

export default specInfo;
