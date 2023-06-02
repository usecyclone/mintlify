import { OpenAPIV3 } from 'openapi-types';

const spec: OpenAPIV3.Document = {
  info: {
    contact: {
      email: 'contact@womo.com',
      name: 'Womo Support',
      url: 'https://womo.com',
    },
    license: {
      name: 'MIT',
    },
    termsOfService: 'https://womo.com',
    title: 'Womo API',
    version: '1.1.0-beta',
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        bearerFormat: 'JWT',
        scheme: 'bearer',
        type: 'http',
      },
    },
  },
  openapi: '3.0.0',
  paths: {
    '/transactions': {
      post: {
        description:
          'feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed',
        operationId: 'new-transaction',
        parameters: [
          {
            description:
              'A unique key that identifies this request. Providing this header will make\nthis an idempotent request. We recommend using V4 UUIDs, or another random\nstring with enough entropy to avoid collisions.',
            example: 'bffa9ce6-7a8a-449c-889a-65bd2ee86903',
            in: 'header',
            name: 'Idempotency-Key',
            schema: {
              example: 'bffa9ce6-7a8a-449c-889a-65bd2ee86903',
              maxLength: 255,
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              examples: {
                'Authorize a new card': {
                  value: {
                    amount: 1299,
                    currency: 'USD',
                    payment_method: {
                      expiration_date: '11/25',
                      method: 'card',
                      number: '4111111111111111',
                      redirect_url: 'https://example.com/callback',
                      security_code: '123',
                    },
                  },
                },
                'Authorize a new card with connection options': {
                  value: {
                    amount: 1299,
                    connection_options: {
                      'cybersource-anti-fraud': {
                        device_fingerprint_id: 'yGeBAFYgFmM=',
                        merchant_defined_data: {
                          field1: 'value1',
                          field2: 'value2',
                        },
                      },
                    },
                    currency: 'USD',
                    payment_method: {
                      expiration_date: '11/25',
                      method: 'card',
                      number: '4111111111111111',
                      redirect_url: 'https://example.com/callback',
                      security_code: '123',
                    },
                  },
                },
                'Authorize and asynchronously capture a card transaction': {
                  value: {
                    amount: 1299,
                    async_capture: true,
                    currency: 'USD',
                    intent: 'capture',
                    payment_method: {
                      expiration_date: '11/25',
                      method: 'card',
                      number: '4111111111111111',
                      redirect_url: 'https://example.com/callback',
                      security_code: '123',
                    },
                  },
                },
                'Authorize and capture a GoCardless transaction': {
                  value: {
                    amount: 1299,
                    currency: 'USD',
                    intent: 'capture',
                    payment_method: {
                      country: 'US',
                      currency: 'USD',
                      method: 'gocardless',
                      redirect_url: 'https://example.com/callback',
                    },
                  },
                },
                'Authorize and capture using a previously stored card': {
                  value: {
                    amount: 1299,
                    currency: 'USD',
                    intent: 'capture',
                    payment_method: {
                      id: '46973e9d-88a7-44a6-abfe-be4ff0134ff4',
                      method: 'id',
                    },
                  },
                },
                'Authorize and store a card': {
                  value: {
                    amount: 1299,
                    currency: 'USD',
                    payment_method: {
                      expiration_date: '11/25',
                      method: 'card',
                      number: '4111111111111111',
                      redirect_url: 'https://example.com/callback',
                      security_code: '123',
                    },
                    store: true,
                  },
                },
                'Authorize, capture, and store a card': {
                  value: {
                    amount: 1299,
                    currency: 'USD',
                    intent: 'capture',
                    payment_method: {
                      expiration_date: '11/25',
                      method: 'card',
                      number: '4111111111111111',
                      redirect_url: 'https://example.com/callback',
                      security_code: '123',
                    },
                    store: true,
                  },
                },
              },
              schema: {
                description: 'A request to create a transaction.',
                properties: {
                  amount: {
                    description:
                      'The monetary amount to create an authorization for, in the smallest\ncurrency unit for the given currency, for example `1299` cents to create\nan authorization for `$12.99`.\n\nIf the `intent` is set to `capture`, an amount greater than zero must\nbe supplied.',
                    example: '1299',
                    maximum: 99999999,
                    type: 'integer',
                  },
                  async_capture: {
                    default: false,
                    description:
                      'Whether to capture the transaction asynchronously.\n\n- When `async_capture` is `false` (default), the transaction is captured\n  in the same request.\n- When `async_capture` is `true`, the transaction is automatically\n  captured at a later time.\n\nRedirect transactions are not affected by this flag.\n\nThis flag can only be set to `true` when `intent` is set to `capture`.',
                    example: true,
                    type: 'boolean',
                  },
                  browser_info: {
                    allOf: [
                      {
                        properties: {
                          accept_header: {
                            description:
                              "The `Accept` header of the request from the buyer's browser.",
                            example: '*/*',
                            type: 'string',
                          },
                          color_depth: {
                            description: 'The color depth of the screen.',
                            example: '32',
                            type: 'number',
                          },
                          java_enabled: {
                            description: 'Indicates whether the client browser supports Java.',
                            example: true,
                            type: 'boolean',
                          },
                          javascript_enabled: {
                            description:
                              'Indicates whether the client browser supports JavaScript.',
                            example: true,
                            type: 'boolean',
                          },
                          language: {
                            description:
                              'The preferred language of the buyer,\nusually the language of the browser UI.',
                            example: 'en-GB',
                            type: 'string',
                          },
                          screen_height: {
                            description: 'The height of the screen in pixels.',
                            example: '1080',
                            type: 'number',
                          },
                          screen_width: {
                            description: 'The width of the screen in pixels.',
                            example: '1920',
                            type: 'number',
                          },
                          time_zone_offset: {
                            description:
                              'Time-zone offset in minutes between UTC and buyer location.',
                            example: '60',
                            type: 'number',
                          },
                          user_agent: {
                            description: 'The user agent string for the current browser.',
                            example:
                              'Mozilla/5.0 (darwin) AppleWebKit/537.36\n(KHTML, like Gecko) jsdom/16.7.0',
                            type: 'string',
                          },
                          user_device: {
                            description: 'The platform that is being used to access the website.',
                            enum: ['desktop', 'mobile'],
                            example: 'desktop',
                            type: 'string',
                          },
                        },
                        required: [
                          'java_enabled',
                          'javascript_enabled',
                          'language',
                          'color_depth',
                          'screen_height',
                          'screen_width',
                          'time_zone_offset',
                          'user_device',
                          'user_agent',
                        ],
                        title: 'Browser info',
                        type: 'object',
                      },
                    ],
                    description: 'Information about the browser used by the buyer.',
                    nullable: true,
                  },
                  cart_items: {
                    description:
                      'An array of cart items that represents the line items of a transaction.',
                    items: {
                      description:
                        'nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh',
                      properties: {
                        categories: {
                          description:
                            'A list of strings containing product categories for the item.\nMax length per item: 50.',
                          items: {
                            maxLength: 50,
                            type: 'string',
                          },
                          maxItems: 100,
                          nullable: true,
                          type: 'array',
                        },
                        discount_amount: {
                          default: '0',
                          description:
                            'elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus',
                          maximum: 99999999,
                          nullable: true,
                          type: 'integer',
                        },
                        name: {
                          description:
                            'The name of the cart item. The value you set for this property may\nbe truncated if the maximum length accepted by a payment service\nprovider is less than 255 characters.',
                          example: 'GoPro HERO9 Camcorder',
                          maxLength: 255,
                          type: 'string',
                        },
                        product_type: {
                          description: 'The product type of the cart item.',
                          enum: [
                            'physical',
                            'discount',
                            'shipping_fee',
                            'sales_tax',
                            'digital',
                            'gift_card',
                            'store_credit',
                            'surcharge',
                          ],
                          example: 'physical',
                          nullable: true,
                          type: 'string',
                        },
                        quantity: {
                          description:
                            'The quantity of this item in the cart. This value cannot be negative\nor zero.',
                          example: '1',
                          maximum: 99999999,
                          minimum: 1,
                          type: 'integer',
                        },
                        tax_amount: {
                          default: '0',
                          description:
                            'ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit',
                          maximum: 99999999,
                          nullable: true,
                          type: 'integer',
                        },
                        unit_amount: {
                          description:
                            'The amount for an individual item represented as a monetary amount\nin the smallest currency unit for the given currency, for example\n`1299` USD cents represents `$12.99`.',
                          example: '37999',
                          maximum: 99999999,
                          type: 'integer',
                        },
                      },
                      required: ['name', 'quantity', 'unit_amount'],
                      title: 'Cart Item',
                      type: 'object',
                    },
                    maxItems: 249,
                    type: 'array',
                  },
                  connection_options: {
                    allOf: [
                      {
                        properties: {
                          'adyen-card': {
                            description:
                              'Additional options to be passed through to Adyen when processing\ncard transactions.',
                            nullable: true,
                            properties: {
                              additionalData: {
                                additionalProperties: {
                                  type: 'string',
                                },
                                description:
                                  'A key-value object representing additional data to be passed\nto Adyen.',
                                example: {
                                  'riskdata.operatorCode': 'operatorCode,',
                                  'riskdata.operatorCountry': 'operatorCountry',
                                },
                                type: 'object',
                              },
                            },
                            type: 'object',
                          },
                          'cybersource-anti-fraud': {
                            description:
                              'Additional options for Cybersource Decision Manager (anti-fraud).',
                            nullable: true,
                            properties: {
                              device_fingerprint_id: {
                                description: 'This field represents device fingerprint ID.',
                                example: 'yGeBAFYgFmM=',
                                type: 'string',
                              },
                              merchant_defined_data: {
                                additionalProperties: {
                                  type: 'string',
                                },
                                description:
                                  'This is a key-value object for merchant defined data.',
                                example: {
                                  field1: 'value1',
                                  field2: 'value2',
                                },
                                maxProperties: 100,
                                type: 'object',
                              },
                            },
                            type: 'object',
                          },
                        },
                        title: 'Connection Options',
                        type: 'object',
                      },
                    ],
                    description:
                      'Allows for passing optional configuration per connection to take\nadvantage of connection specific features. When provided, the data\nis only passed to the target connection type to prevent sharing\nconfiguration across connections.',
                    nullable: true,
                  },
                  payment_method: {
                    description:
                      'The optional payment method details to create an authorization for. This field is required for processing a card.',
                    oneOf: [
                      {
                        description: 'Card payment method details to use in a transaction.',
                        properties: {
                          buyer_external_identifier: {
                            description:
                              'The `external_identifier` of the buyer to associate this payment method\nto. If this field is provided then the `buyer_id` field\nneeds to be unset.',
                            example: 'user-789123',
                            type: 'string',
                          },
                          buyer_id: {
                            description:
                              'The ID of the buyer to associate this payment method to. If this field is\nprovided then the `buyer_external_identifier` field needs to be unset.',
                            example: 'fe26475d-ec3e-4884-9553-f7356683f7f9',
                            format: 'uuid',
                            type: 'string',
                          },
                          expiration_date: {
                            description: 'The expiration date of the card, formatted `MM/YY`.',
                            example: '11/25',
                            maxLength: 5,
                            minLength: 5,
                            pattern: '^\\d{2}/\\d{2}$',
                            type: 'string',
                          },
                          external_identifier: {
                            description:
                              'An external identifier that can be used to match the card against your own records. This can only be set if the `store` flag is set to `true`.',
                            example: 'card-323444',
                            nullable: true,
                            type: 'string',
                          },
                          method: {
                            description: '`card`.',
                            enum: ['card'],
                            example: 'card',
                            type: 'string',
                          },
                          number: {
                            description:
                              'The 13-19 digit number for this card as it can be found on the\nfront of the card.',
                            example: '4111111111111111',
                            maxLength: 19,
                            minLength: 13,
                            pattern: '^[0-9]{13,19}$',
                            type: 'string',
                          },
                          redirect_url: {
                            description:
                              'tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio',
                            example: 'https://example.com/callback',
                            format: 'uri',
                            nullable: true,
                            type: 'string',
                          },
                          security_code: {
                            description:
                              'The 3 or 4 digit security code often found on the card. This often\nreferred to as the CVV or CVD.',
                            example: '123',
                            maxLength: 4,
                            minLength: 3,
                            pattern: '^\\d{3,4}$',
                            type: 'string',
                          },
                        },
                        required: ['method', 'number', 'expiration_date', 'security_code'],
                        title: 'Card',
                        type: 'object',
                      },
                      {
                        description: 'Redirect payment method details to use in a transaction.',
                        properties: {
                          buyer_external_identifier: {
                            description:
                              'The `external_identifier` of the buyer to associate this payment method\nto. If this field is provided then the `buyer_id` field\nneeds to be unset.',
                            example: 'user-789123',
                            type: 'string',
                          },
                          buyer_id: {
                            description:
                              'The ID of the buyer to associate this payment method to. If this field is\nprovided then the `buyer_external_identifier` field needs to be unset.',
                            example: 'fe26475d-ec3e-4884-9553-f7356683f7f9',
                            format: 'uuid',
                            type: 'string',
                          },
                          country: {
                            description:
                              'The 2-letter ISO code of the country to use this payment method for.\nThis is used to select the payment service to use.',
                            example: 'US',
                            type: 'string',
                          },
                          currency: {
                            description:
                              'The ISO-4217 currency code to use this payment method for. This is\nused to select the payment service to use.',
                            example: 'USD',
                            type: 'string',
                          },
                          external_identifier: {
                            description:
                              'An external identifier that can be used to match the account against your own records. This can only be set if the `store` flag is set to `true`.',
                            example: 'account-23423423',
                            nullable: true,
                            type: 'string',
                          },
                          method: {
                            description:
                              'The method to use, this can be any of the methods that\nsupport redirect requests.\n\nWhen storing a new payment method, only `gocardless` and `stripedd`\nare currently supported.',
                            enum: ['paypal', 'banked', 'bitpay', 'gocardless', 'stripedd'],
                            example: 'paypal',
                            type: 'string',
                          },
                          redirect_url: {
                            description:
                              'The redirect URL to redirect a buyer to after they have authorized their\ntransaction.',
                            example: 'https://example.com/callback',
                            format: 'uri',
                            type: 'string',
                          },
                        },
                        required: ['method', 'redirect_url', 'country', 'currency'],
                        title: 'Redirect',
                        type: 'object',
                      },
                      {
                        description: 'Details for a previously stored payment method.',
                        properties: {
                          id: {
                            description:
                              'A ID that represents a previously stored payment method.\nThis ID can represent any type of payment method.',
                            example: '46973e9d-88a7-44a6-abfe-be4ff0134ff4',
                            type: 'string',
                          },
                          method: {
                            description: '`id`.',
                            enum: ['id'],
                            example: 'id',
                            type: 'string',
                          },
                          redirect_url: {
                            description:
                              'porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis',
                            example: 'https://example.com/callback',
                            format: 'uri',
                            type: 'string',
                          },
                          security_code: {
                            description:
                              'The 3 or 4 digit security code often found on the card. This often\nreferred to as the CVV or CVD.\n\nThe security code can only be set if the stored payment method\nrepresents a card.',
                            example: '123',
                            maxLength: 4,
                            minLength: 3,
                            pattern: '^\\d{3,4}$',
                            type: 'string',
                          },
                        },
                        required: ['method', 'id'],
                        title: 'Stored payment method request',
                        type: 'object',
                      },
                      {
                        description: 'Details for a Apple Pay payment method.',
                        properties: {
                          method: {
                            description: '`applepay`.',
                            enum: ['applepay'],
                            example: 'applepay',
                            type: 'string',
                          },
                          token: {
                            description:
                              'The encrypted (opaque) token that was passed to the `onpaymentauthorized`\ncallback by the Apple Pay integration.',
                            type: 'object',
                          },
                        },
                        required: ['method', 'token'],
                        title: 'Apple Pay payment method request',
                        type: 'object',
                      },
                      {
                        description: 'Details for a Google Pay payment method.',
                        properties: {
                          assurance_details: {
                            description:
                              'Information about the validation performed on the payment data. (See https://developers.google.com/pay/api/web/reference/response-objects#assurance-details-specifications).',
                            nullable: true,
                            properties: {
                              account_verified: {
                                description:
                                  'Indicates that card holder possession validation has been performed.',
                                nullable: true,
                                type: 'boolean',
                              },
                              card_holder_authenticated: {
                                description:
                                  'Indicates that identification and verifications was performed.',
                                nullable: true,
                                type: 'boolean',
                              },
                            },
                            type: 'object',
                          },
                          card_holder_name: {
                            description: 'Name of the card holder.',
                            nullable: true,
                            type: 'string',
                          },
                          method: {
                            description: '`googlepay`.',
                            enum: ['googlepay'],
                            example: 'googlepay',
                            type: 'string',
                          },
                          redirect_url: {
                            description:
                              'The redirect URL to redirect a buyer to after they have authorized their\ntransaction or payment method. This only applies to payment methods that\nrequire buyer approval.',
                            example: 'https://example.com/callback',
                            format: 'uri',
                            nullable: true,
                            type: 'string',
                          },
                          token: {
                            description:
                              'The encrypted (opaque) token returned by the Google Pay API that\nrepresents a payment method.',
                            type: 'object',
                          },
                        },
                        required: ['method', 'token'],
                        title: 'Google Pay payment method request',
                        type: 'object',
                      },
                      {
                        description:
                          'Checkout Session payment method details to use in a transaction.',
                        properties: {
                          buyer_external_identifier: {
                            description:
                              'The `external_identifier` of the buyer to associate this payment method\nto. If this field is provided then the `buyer_id` field\nneeds to be unset.',
                            example: 'user-789123',
                            type: 'string',
                          },
                          buyer_id: {
                            description:
                              'The ID of the buyer to associate this payment method to. If this field is\nprovided then the `buyer_external_identifier` field needs to be unset.',
                            example: 'fe26475d-ec3e-4884-9553-f7356683f7f9',
                            format: 'uuid',
                            type: 'string',
                          },
                          external_identifier: {
                            description:
                              'An external identifier that can be used to match the card against your own records. This can only be set if the `store` flag is set to `true`.',
                            example: 'card-323444',
                            nullable: true,
                            type: 'string',
                          },
                          id: {
                            description: 'The ID of the Checkout Session.',
                            example: '8d3fe99b-1422-42e6-bbb3-932d95ae5f79',
                            format: 'uuid',
                            type: 'string',
                          },
                          method: {
                            description: '`checkout-session`.',
                            enum: ['checkout-session'],
                            example: 'checkout-session',
                            type: 'string',
                          },
                          redirect_url: {
                            description:
                              'We strongly recommend providing a `redirect_url` either when 3-D\nSecure is enabled and `three_d_secure_data` is not provided, or when\nusing connections where 3DS is enabled. This value will be appended\nwith both a transaction ID and status\n(e.g. `https://example.com/callback?gr4vy_transaction_id=123\n&gr4vy_transaction_status=capture_succeeded`) after 3-D Secure has\ncompleted. For those cases, if the value is not present, the\ntransaction will be marked as failed.',
                            example: 'https://example.com/callback',
                            format: 'uri',
                            nullable: true,
                            type: 'string',
                          },
                        },
                        required: ['method', 'id'],
                        title: 'Checkout Session',
                        type: 'object',
                      },
                    ],
                  },
                  payment_source: {
                    description: 'The source of the transaction. Defaults to `ecommerce`.',
                    enum: ['ecommerce', 'moto', 'recurring', 'installment', 'card_on_file'],
                    example: 'ecommerce',
                    type: 'string',
                  },
                  statement_descriptor: {
                    allOf: [
                      {
                        description:
                          "The statement descriptor is the text to be shown on the buyer's statements.\n\nThe specific usage of these fields will depend on the capabilities of\nthe underlying PSP and bank. As a typical example, 'name' and\n'description' could be concatenated using '* ' as a separator, and\nthen the resulting descriptor would be truncated to 22 characters by\nthe issuing bank.",
                        properties: {
                          city: {
                            description: 'City from which the charge originated.',
                            example: 'London',
                            maxLength: 13,
                            minLength: 1,
                            nullable: true,
                            type: 'string',
                          },
                          description: {
                            description:
                              'A short description about the purchase.\n\nOther validations:\n1. Contains only Latin characters.\n2. Contain at least one letter\n3. Does not contain any of the special characters `< > \\ \' " *`\n4. Supports:\n  1. Lower case: `a-z`\n  2. Upper case: `A-Z`\n  3. Numbers: `0-9`\n  4. Spaces: ` `\n  5. Special characters: `. , _ - ? + /`.',
                            example: 'Card payment',
                            maxLength: 22,
                            minLength: 5,
                            nullable: true,
                            type: 'string',
                          },
                          name: {
                            description:
                              'Reflects your doing business as (DBA) name.\n\nOther validations:\n\n1. Contains only Latin characters.\n2. Contain at least one letter\n3. Does not contain any of the special characters `< > \\ \' " *`\n4. Supports:\n  1. Lower case: `a-z`\n  2. Upper case: `A-Z`\n  3. Numbers: `0-9`\n  4. Spaces: ` `\n  5. Special characters: `. , _ - ? + /`.',
                            example: 'GR4VY',
                            maxLength: 22,
                            minLength: 5,
                            nullable: true,
                            type: 'string',
                          },
                          phone_number: {
                            description:
                              "The value in the phone number field of a customer's statement which\nshould be formatted according to the\n[E164 number standard](https://www.twilio.com/docs/glossary/what-e164).",
                            example: '+1234567890',
                            maxLength: 20,
                            minLength: 5,
                            nullable: true,
                            pattern: '^\\+[1-9]\\d{1,14}$',
                            type: 'string',
                          },
                          url: {
                            description:
                              "The value in the URL/web address field of a customer's statement.",
                            example: 'www.gr4vy.com',
                            maxLength: 13,
                            minLength: 1,
                            nullable: true,
                            type: 'string',
                          },
                        },
                        title: 'Statement descriptor',
                        type: 'object',
                      },
                    ],
                    nullable: true,
                  },
                  three_d_secure_data: {
                    description:
                      'Pass through 3-D Secure data to support external 3-D Secure authorisation.\nIf using an external 3-D Secure provider, you should not pass\na `redirect_url` in the `payment_method` object for a transaction.',
                    oneOf: [
                      {
                        allOf: [
                          {
                            properties: {
                              cavv: {
                                description: 'The cardholder authentication value or AAV.',
                                example: '3q2+78r+ur7erb7vyv66vv8=',
                                type: 'string',
                              },
                              directory_response: {
                                description:
                                  'For 3-D Secure version 1, the enrolment response. For 3-D Secure version , the transaction status from the `ARes`.',
                                example: 'C',
                                maxLength: 1,
                                type: 'string',
                              },
                              eci: {
                                description:
                                  'The electronic commerce indicator for the 3DS transaction.',
                                example: '05',
                                maxLength: 2,
                                minLength: 1,
                                pattern: '^0?\\d$',
                                type: 'string',
                              },
                              version: {
                                description: 'The version of 3-D Secure that was used.',
                                pattern: '^[1-2].?[\\d+.?]{0,3}$',
                                type: 'string',
                              },
                            },
                            required: ['cavv', 'eci', 'version', 'directory_response'],
                            title: '3-D Secure Data',
                            type: 'object',
                          },
                          {
                            properties: {
                              authentication_response: {
                                description: 'The authentication response.',
                                example: true,
                                maxLength: 1,
                                type: 'string',
                              },
                              cavv_algorithm: {
                                description: 'The CAVV Algorithm used.',
                                maxLength: 1,
                                type: 'string',
                              },
                              xid: {
                                description: 'The transaction identifier.',
                                type: 'string',
                              },
                            },
                            required: ['authentication_response', 'cavv_algorithm', 'xid'],
                          },
                        ],
                        title: '3-D Secure Data Version 1',
                        type: 'object',
                      },
                      {
                        allOf: [
                          {
                            properties: {
                              cavv: {
                                description: 'The cardholder authentication value or AAV.',
                                example: '3q2+78r+ur7erb7vyv66vv8=',
                                type: 'string',
                              },
                              directory_response: {
                                description:
                                  'For 3-D Secure version 1, the enrolment response. For 3-D Secure version , the transaction status from the `ARes`.',
                                example: 'C',
                                maxLength: 1,
                                type: 'string',
                              },
                              eci: {
                                description:
                                  'The electronic commerce indicator for the 3DS transaction.',
                                example: '05',
                                maxLength: 2,
                                minLength: 1,
                                pattern: '^0?\\d$',
                                type: 'string',
                              },
                              version: {
                                description: 'The version of 3-D Secure that was used.',
                                pattern: '^[1-2].?[\\d+.?]{0,3}$',
                                type: 'string',
                              },
                            },
                            required: ['cavv', 'eci', 'version', 'directory_response'],
                            title: '3-D Secure Data',
                            type: 'object',
                          },
                          {
                            properties: {
                              authentication_response: {
                                description:
                                  'The transaction status from the challenge result\n(not required for frictionless).',
                                example: true,
                                maxLength: 1,
                                type: 'string',
                              },
                              directory_transaction_id: {
                                description: 'The transaction identifier.',
                                example: 'c4e59ceb-a382-4d6a-bc87-385d591fa09d',
                                type: 'string',
                              },
                            },
                            required: ['directory_transaction_id'],
                          },
                        ],
                        title: '3-D Secure Data Version 2',
                        type: 'object',
                      },
                    ],
                  },
                },
                required: ['amount', 'currency', 'payment_method'],
                title: 'Transaction (Create)',
                type: 'object',
              },
            },
          },
        },
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  description: 'A transaction record.',
                  properties: {
                    amount: {
                      description:
                        'The authorized amount for this transaction. This can be more than the\nactual captured amount and part of this amount may be refunded.',
                      example: '1299',
                      maximum: 99999999,
                      type: 'integer',
                    },
                    authorized_at: {
                      description:
                        'interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae',
                      example: '2013-07-16T19:23:00.000+00:00',
                      format: 'date-time',
                      nullable: true,
                      type: 'string',
                    },
                    avs_response_code: {
                      description:
                        'felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus',
                      enum: [
                        'no_match',
                        'match',
                        'partial_match_address',
                        'partial_match_postcode',
                        'unavailable',
                      ],
                      example: 'partial_match_address',
                      nullable: true,
                      type: 'string',
                    },
                    buyer: {
                      allOf: [
                        {
                          description:
                            'Snapshot of a buyer, as used when embedded inside other\nresources.',
                          properties: {
                            billing_details: {
                              allOf: [
                                {
                                  description: 'Billing details associated to a buyer.',
                                  properties: {
                                    address: {
                                      allOf: [
                                        {
                                          description: 'An address for the buyer.',
                                          properties: {
                                            city: {
                                              description: 'The city for the address.',
                                              example: 'London',
                                              maxLength: 100,
                                              minLength: 1,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            country: {
                                              description:
                                                'The country for the address in ISO 3166 format.',
                                              example: 'GB',
                                              maxLength: 2,
                                              minLength: 2,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            house_number_or_name: {
                                              description:
                                                'The house number or name for the address. Not all payment\nservices use this field but some do.',
                                              example: '10',
                                              maxLength: 255,
                                              minLength: 1,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            line1: {
                                              description: 'The first line of the address.',
                                              example: '10 Oxford Street',
                                              maxLength: 255,
                                              minLength: 1,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            line2: {
                                              description: 'The second line of the address.',
                                              example: 'New Oxford Court',
                                              maxLength: 255,
                                              minLength: 1,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            organization: {
                                              description:
                                                'The optional name of the company or organisation to add\nto the address.',
                                              example: 'Gr4vy',
                                              maxLength: 255,
                                              minLength: 1,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            postal_code: {
                                              description:
                                                'The postal code or zip code for the address.',
                                              example: '789123',
                                              maxLength: 50,
                                              minLength: 1,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            state: {
                                              description:
                                                'The state, county, or province for the address.',
                                              example: 'Greater London',
                                              maxLength: 255,
                                              minLength: 1,
                                              nullable: true,
                                              type: 'string',
                                            },
                                            state_code: {
                                              description:
                                                'The code of state, county, or province for the address in\nISO 3166-2 format.',
                                              example: 'GB-LND',
                                              maxLength: 6,
                                              minLength: 4,
                                              nullable: true,
                                              type: 'string',
                                            },
                                          },
                                          title: 'Address',
                                          type: 'object',
                                        },
                                      ],
                                      description: 'The billing address of the buyer.',
                                      nullable: true,
                                    },
                                    email_address: {
                                      description: 'The email address of the buyer.',
                                      example: 'john@example.com',
                                      maxLength: 320,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    first_name: {
                                      description: 'The first name(s) or given name of the buyer.',
                                      example: 'John',
                                      maxLength: 255,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    last_name: {
                                      description: 'The last name, or family name, of the buyer.',
                                      example: 'Lunn',
                                      maxLength: 255,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    phone_number: {
                                      description:
                                        'The phone number of the buyer. This number is formatted according to the\n[E164 number standard](https://www.twilio.com/docs/glossary/what-e164).',
                                      example: '+1234567890',
                                      maxLength: 50,
                                      minLength: 1,
                                      nullable: true,
                                      pattern: '^\\+[1-9]\\d{1,14}$',
                                      type: 'string',
                                    },
                                    tax_id: {
                                      allOf: [
                                        {
                                          description:
                                            'The tax ID information associated to a buyer.',
                                          properties: {
                                            kind: {
                                              description: 'The kind of tax ID.',
                                              enum: [
                                                'ae.trn',
                                                'au.abn',
                                                'ar.dni',
                                                'ar.cuil',
                                                'ar.cuit',
                                                'br.cnpj',
                                                'br.cpf',
                                                'ca.bn',
                                                'ca.gst_hst',
                                                'ca.pst_bc',
                                                'ca.pst_mb',
                                                'ca.pst_sk',
                                                'ca.qst',
                                                'ch.vat',
                                                'cl.tin',
                                                'es.cif',
                                                'eu.vat',
                                                'gb.vat',
                                                'hk.br',
                                                'id.nik',
                                                'id.npwp',
                                                'in.gst',
                                                'jp.cn',
                                                'jp.rn',
                                                'kr.brn',
                                                'li.uid',
                                                'mx.curp',
                                                'my.frp',
                                                'my.itn',
                                                'my.nric',
                                                'my.sst',
                                                'no.vat',
                                                'nz.gst',
                                                'ph.tin',
                                                'ru.inn',
                                                'ru.kpp',
                                                'sa.vat',
                                                'sg.gst',
                                                'sg.uen',
                                                'th.id',
                                                'th.vat',
                                                'tw.vat',
                                                'us.ein',
                                                'za.vat',
                                              ],
                                              example: 'gb.vat',
                                              type: 'string',
                                            },
                                            value: {
                                              description: 'The tax ID for the buyer.',
                                              example: '12345678931',
                                              maxLength: 50,
                                              minLength: 1,
                                              type: 'string',
                                            },
                                          },
                                          required: ['kind', 'value'],
                                          title: 'Tax ID',
                                          type: 'object',
                                        },
                                      ],
                                      description:
                                        'The tax information associated with the billing details.',
                                      nullable: true,
                                    },
                                    type: {
                                      description:
                                        'The type of this resource. Is always `billing-details`.',
                                      enum: ['billing-details'],
                                      example: 'billing-details',
                                      type: 'string',
                                    },
                                  },
                                  title: 'Billing details',
                                  type: 'object',
                                },
                              ],
                              description:
                                'The billing details associated with the buyer, which include the\naddress and tax ID.',
                              nullable: true,
                            },
                            display_name: {
                              description:
                                'A unique name for this buyer which is used in the Gr4vy admin panel to give a buyer a human readable name.',
                              example: 'John L.',
                              maxLength: 200,
                              minLength: 1,
                              nullable: true,
                              type: 'string',
                            },
                            external_identifier: {
                              description:
                                'An external identifier that can be used to match the buyer against your own records.',
                              example: 'user-789123',
                              maxLength: 200,
                              minLength: 1,
                              nullable: true,
                              type: 'string',
                            },
                            id: {
                              description: 'The unique Gr4vy ID for this buyer.',
                              example: 'fe26475d-ec3e-4884-9553-f7356683f7f9',
                              format: 'uuid',
                              type: 'string',
                            },
                            type: {
                              description: 'The type of this resource. Is always `buyer`.',
                              enum: ['buyer'],
                              example: 'buyer',
                              type: 'string',
                            },
                          },
                          title: 'Buyer (Snapshot)',
                          type: 'object',
                        },
                      ],
                      description: 'The buyer used for this transaction.',
                      nullable: true,
                    },
                    captured_amount: {
                      description:
                        'The captured amount for this transaction. This can be the total or a\nportion of the authorized amount.',
                      example: '999',
                      maximum: 99999999,
                      type: 'integer',
                    },
                    captured_at: {
                      description:
                        'ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt',
                      example: '2013-07-16T19:23:00.000+00:00',
                      format: 'date-time',
                      nullable: true,
                      type: 'string',
                    },
                    cart_items: {
                      description:
                        'An array of cart items that represents the line items of a transaction.',
                      items: {
                        description:
                          'nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat',
                        properties: {
                          categories: {
                            description:
                              'A list of strings containing product categories for the item.\nMax length per item: 50.',
                            items: {
                              maxLength: 50,
                              type: 'string',
                            },
                            maxItems: 100,
                            nullable: true,
                            type: 'array',
                          },
                          discount_amount: {
                            default: '0',
                            description:
                              'nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor',
                            maximum: 99999999,
                            nullable: true,
                            type: 'integer',
                          },
                          external_identifier: {
                            description:
                              'An external identifier for the cart item. This can be set to any value and is not sent to the payment service.',
                            example: 'item-789123',
                            maxLength: 200,
                            nullable: true,
                            type: 'string',
                          },
                          image_url: {
                            description: 'The URL for the image of the item.',
                            example: 'https://example.com/images/items/gopro.png',
                            format: 'url',
                            maxLength: 2083,
                            nullable: true,
                            type: 'string',
                          },
                          name: {
                            description:
                              'The name of the cart item. The value you set for this property may\nbe truncated if the maximum length accepted by a payment service\nprovider is less than 255 characters.',
                            example: 'GoPro HERO9 Camcorder',
                            maxLength: 255,
                            type: 'string',
                          },
                          product_type: {
                            description: 'The product type of the cart item.',
                            enum: [
                              'physical',
                              'discount',
                              'shipping_fee',
                              'sales_tax',
                              'digital',
                              'gift_card',
                              'store_credit',
                              'surcharge',
                            ],
                            example: 'physical',
                            nullable: true,
                            type: 'string',
                          },
                          product_url: {
                            description: 'The product URL for the item.',
                            example: 'https://example.com/items/gopro',
                            format: 'url',
                            maxLength: 2083,
                            nullable: true,
                            type: 'string',
                          },
                          quantity: {
                            description:
                              'The quantity of this item in the cart. This value cannot be negative\nor zero.',
                            example: '1',
                            maximum: 99999999,
                            minimum: 1,
                            type: 'integer',
                          },
                          sku: {
                            description: 'The SKU for the item.',
                            example: 'sku-789123',
                            maxLength: 200,
                            nullable: true,
                            type: 'string',
                          },
                          tax_amount: {
                            default: '0',
                            description:
                              'porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut',
                            maximum: 99999999,
                            nullable: true,
                            type: 'integer',
                          },
                          unit_amount: {
                            description:
                              'The amount for an individual item represented as a monetary amount\nin the smallest currency unit for the given currency, for example\n`1299` USD cents represents `$12.99`.',
                            example: '37999',
                            maximum: 99999999,
                            type: 'integer',
                          },
                        },
                        required: ['name', 'quantity', 'unit_amount'],
                        title: 'Cart Item',
                        type: 'object',
                      },
                      maxLength: 249,
                      type: 'array',
                    },
                    country: {
                      description:
                        'The 2-letter ISO code of the country of the transaction.\nThis is used to filter the payment services that is used to process the\ntransaction.\n',
                      example: 'US',
                      nullable: true,
                      type: 'string',
                    },
                    created_at: {
                      description:
                        'The date and time when this transaction was created in our system.',
                      example: '2013-07-16T19:23:00.000+00:00',
                      format: 'date-time',
                      type: 'string',
                    },
                    currency: {
                      description: 'The currency code for this transaction.',
                      example: 'USD',
                      type: 'string',
                    },
                    cvv_response_code: {
                      description:
                        'nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar',
                      enum: ['no_match', 'match', 'unavailable', 'not_provided'],
                      example: 'match',
                      nullable: true,
                      type: 'string',
                    },
                    external_identifier: {
                      description:
                        'An external identifier that can be used to match the transaction against your own records.',
                      example: 'user-789123',
                      nullable: true,
                      type: 'string',
                    },
                    id: {
                      description: 'The unique identifier for this transaction.',
                      example: 'fe26475d-ec3e-4884-9553-f7356683f7f9',
                      format: 'uuid',
                      type: 'string',
                    },
                    intent: {
                      description:
                        'The original `intent` used when the transaction was\n[created](#operation/authorize-new-transaction).',
                      enum: ['authorize', 'capture'],
                      example: 'authorize',
                      type: 'string',
                    },
                    is_subsequent_payment: {
                      default: false,
                      description:
                        'sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis',
                      example: true,
                      type: 'boolean',
                    },
                    merchant_account_id: {
                      description:
                        'The ID of the merchant account to which this transaction belongs to.',
                      example: 'default',
                      maximum: 22,
                      minimum: 1,
                      type: 'string',
                    },
                    merchant_initiated: {
                      default: false,
                      description:
                        'Indicates whether the transaction was initiated by the merchant (true)\nor customer (false).',
                      example: true,
                      type: 'boolean',
                    },
                    metadata: {
                      additionalProperties: {
                        type: 'string',
                      },
                      description:
                        'Additional information about the transaction stored as key-value pairs.',
                      example: {
                        key: 'value',
                      },
                      type: 'object',
                    },
                    method: {
                      enum: [
                        'afterpay',
                        'applepay',
                        'banked',
                        'bitpay',
                        'boleto',
                        'card',
                        'clearpay',
                        'dana',
                        'fortumo',
                        'gcash',
                        'gocardless',
                        'googlepay',
                        'grabpay',
                        'klarna',
                        'ovo',
                        'paymaya',
                        'paypal',
                        'pix',
                        'rabbitlinepay',
                        'scalapay',
                        'shopeepay',
                        'stripedd',
                        'truemoney',
                        'trustly',
                        'zippay',
                      ],
                      example: 'card',
                      type: 'string',
                    },
                    payment_method: {
                      allOf: [
                        {
                          description:
                            'Snapshot of a payment method, as used when embedded inside other\nresources.',
                          properties: {
                            approval_target: {
                              description:
                                'The browser target that an approval URL must be opened in. If `any` or `null`, then there is no specific requirement.',
                              enum: ['any', 'new_window'],
                              example: 'any',
                              nullable: true,
                              type: 'string',
                            },
                            approval_url: {
                              description:
                                'The optional URL that the buyer needs to be redirected to to further authorize their payment.',
                              example:
                                'https://api.example.app.gr4vy.com/payment-methods/ffc88ec9-e1ee-45ba-993d-b5902c3b2a8c/approve',
                              format: 'uri',
                              nullable: true,
                              type: 'string',
                            },
                            country: {
                              description:
                                'The 2-letter ISO code of the country this payment method can\nbe used for. If this value is `null` the payment method may be\nused in multiple countries.',
                              example: 'US',
                              nullable: true,
                              type: 'string',
                            },
                            currency: {
                              description:
                                'The ISO-4217 currency code that this payment method can be\nused for. If this value is `null` the payment method may be\nused for multiple currencies.',
                              example: 'USD',
                              nullable: true,
                              type: 'string',
                            },
                            details: {
                              description: 'A credit or debit card payment method.',
                              properties: {
                                bin: {
                                  description:
                                    'The first 6 digits of the full card number (the BIN).',
                                  example: '412345',
                                  type: 'string',
                                },
                                card_type: {
                                  description:
                                    'The type of card, one of `credit`, `debit` or `prepaid`.',
                                  enum: ['credit', 'debit', 'prepaid'],
                                  example: 'credit',
                                  type: 'string',
                                },
                              },
                              title: 'Card',
                              type: 'object',
                            },
                            expiration_date: {
                              description:
                                'The expiration date for this payment method. This is mostly used by cards\nwhere the card might have an expiration date.',
                              example: '11/25',
                              maxLength: 5,
                              minLength: 5,
                              nullable: true,
                              pattern: '^\\d{2}/\\d{2}$',
                              type: 'string',
                            },
                            external_identifier: {
                              description:
                                'An external identifier that can be used to match the payment method\nagainst your own records.',
                              example: 'user-789123',
                              nullable: true,
                              type: 'string',
                            },
                            id: {
                              description: 'The unique ID of the payment method.',
                              example: '77a76f7e-d2de-4bbc-ada9-d6a0015e6bd5',
                              format: 'uuid',
                              nullable: true,
                              type: 'string',
                            },
                            label: {
                              description:
                                'A label for the payment method. This can be the last 4 digits for a card,\nor the email address for an alternative payment method.',
                              example: '1111',
                              type: 'string',
                            },
                            method: {
                              description: 'The type of this payment method.',
                              enum: [
                                'afterpay',
                                'applepay',
                                'banked',
                                'bitpay',
                                'boleto',
                                'card',
                                'clearpay',
                                'dana',
                                'fortumo',
                                'gcash',
                                'gocardless',
                                'googlepay',
                                'grabpay',
                                'klarna',
                                'ovo',
                                'paymaya',
                                'paypal',
                                'pix',
                                'rabbitlinepay',
                                'scalapay',
                                'shopeepay',
                                'stripedd',
                                'truemoney',
                                'trustly',
                                'zippay',
                              ],
                              example: 'card',
                              type: 'string',
                            },
                            scheme: {
                              description:
                                'An additional label used to differentiate different sub-types of a payment\nmethod. Most notably this can include the type of card used in a\ntransaction.',
                              example: 'visa',
                              nullable: true,
                              type: 'string',
                            },
                            type: {
                              description: '`payment-method`.',
                              enum: ['payment-method'],
                              example: 'payment-method',
                              type: 'string',
                            },
                          },
                          title: 'Payment method (Snapshot)',
                          type: 'object',
                        },
                      ],
                      description: 'The payment method used for this transaction.',
                    },
                    payment_service: {
                      allOf: [
                        {
                          description: 'An active, configured payment service.',
                          properties: {
                            display_name: {
                              description: 'The custom name set for this service.',
                              example: 'Stripe (Main)',
                              maxLength: 50,
                              minLength: 1,
                              type: 'string',
                            },
                            id: {
                              description: 'The ID of this payment service.',
                              example: 'stripe-card-faaad066-30b4-4997-a438-242b0752d7e1',
                              maxLength: 200,
                              minLength: 1,
                              type: 'string',
                            },
                            method: {
                              description: 'The payment method that this services handles.',
                              enum: [
                                'afterpay',
                                'applepay',
                                'banked',
                                'bitpay',
                                'boleto',
                                'card',
                                'clearpay',
                                'dana',
                                'fortumo',
                                'gcash',
                                'gocardless',
                                'googlepay',
                                'grabpay',
                                'klarna',
                                'ovo',
                                'paymaya',
                                'paypal',
                                'pix',
                                'rabbitlinepay',
                                'scalapay',
                                'shopeepay',
                                'stripedd',
                                'truemoney',
                                'trustly',
                                'zippay',
                              ],
                              example: 'card',
                              type: 'string',
                            },
                            payment_service_definition_id: {
                              description:
                                'The ID of the payment service definition used to create this service.\n',
                              example: 'stripe-card',
                              maxLength: 50,
                              minLength: 1,
                              type: 'string',
                            },
                            type: {
                              description: 'The type of this resource.',
                              enum: ['payment-service'],
                              example: 'payment-service',
                              type: 'string',
                            },
                          },
                          title: 'A payment service',
                          type: 'object',
                        },
                      ],
                      description: 'The payment service used for this transaction.',
                    },
                    payment_service_transaction_id: {
                      description: "The payment service's unique ID for the transaction.",
                      example: 'charge_xYqd43gySMtori',
                      type: 'string',
                    },
                    payment_source: {
                      description: 'The source of the transaction. Defaults to `ecommerce`.',
                      enum: ['ecommerce', 'moto', 'recurring', 'installment', 'card_on_file'],
                      example: 'ecommerce',
                      type: 'string',
                    },
                    raw_response_code: {
                      description:
                        'This is the response code received from the payment service. This\ncan be set to any value and is not standardized across different\npayment services.',
                      example: 'incorrect-zip',
                      nullable: true,
                      type: 'string',
                    },
                    raw_response_description: {
                      description:
                        'This is the response description received from the payment service. This\ncan be set to any value and is not standardized across different\npayment services.',
                      example:
                        "The card's postal code is incorrect. Check the card's postal code or use a\ndifferent card.",
                      nullable: true,
                      type: 'string',
                    },
                    refunded_amount: {
                      description:
                        'The refunded amount for this transaction. This can be the total or a\nportion of the captured amount.',
                      example: '100',
                      maximum: 99999999,
                      type: 'integer',
                    },
                    scheme_transaction_id: {
                      description:
                        'An identifier for the transaction used by the scheme itself, when\navailable.\n\ne.g. the Visa Transaction Identifier, or Mastercard Trace ID.',
                      example: '123456789012345',
                      nullable: true,
                      type: 'string',
                    },
                    shipping_details: {
                      allOf: [
                        {
                          description: 'Shipping detail for a buyer.',
                          properties: {
                            address: {
                              allOf: [
                                {
                                  description: 'An address for the buyer.',
                                  properties: {
                                    city: {
                                      description: 'The city for the address.',
                                      example: 'London',
                                      maxLength: 100,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    country: {
                                      description:
                                        'The country for the address in ISO 3166 format.',
                                      example: 'GB',
                                      maxLength: 2,
                                      minLength: 2,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    house_number_or_name: {
                                      description:
                                        'The house number or name for the address. Not all payment\nservices use this field but some do.',
                                      example: '10',
                                      maxLength: 255,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    line1: {
                                      description: 'The first line of the address.',
                                      example: '10 Oxford Street',
                                      maxLength: 255,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    line2: {
                                      description: 'The second line of the address.',
                                      example: 'New Oxford Court',
                                      maxLength: 255,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    organization: {
                                      description:
                                        'The optional name of the company or organisation to add\nto the address.',
                                      example: 'Gr4vy',
                                      maxLength: 255,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    postal_code: {
                                      description: 'The postal code or zip code for the address.',
                                      example: '789123',
                                      maxLength: 50,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    state: {
                                      description:
                                        'The state, county, or province for the address.',
                                      example: 'Greater London',
                                      maxLength: 255,
                                      minLength: 1,
                                      nullable: true,
                                      type: 'string',
                                    },
                                    state_code: {
                                      description:
                                        'The code of state, county, or province for the address in\nISO 3166-2 format.',
                                      example: 'GB-LND',
                                      maxLength: 6,
                                      minLength: 4,
                                      nullable: true,
                                      type: 'string',
                                    },
                                  },
                                  title: 'Address',
                                  type: 'object',
                                },
                              ],
                              description:
                                'The physical shipping address associated to this buyer.',
                              nullable: true,
                            },
                            buyer_id: {
                              description: 'The unique ID for a buyer.',
                              example: '8724fd24-5489-4a5d-90fd-0604df7d3b83',
                              format: 'uuid',
                              type: 'string',
                            },
                            email_address: {
                              description: 'The email address of the buyer.',
                              example: 'john@example.com',
                              maxLength: 320,
                              minLength: 1,
                              nullable: true,
                              type: 'string',
                            },
                            first_name: {
                              description: 'The first name(s) or given name of the buyer.',
                              example: 'John',
                              maxLength: 255,
                              minLength: 1,
                              nullable: true,
                              type: 'string',
                            },
                            id: {
                              description: "The unique ID for a buyer's shipping detail.",
                              example: '8724fd24-5489-4a5d-90fd-0604df7d3b83',
                              format: 'uuid',
                              type: 'string',
                            },
                            last_name: {
                              description: 'The last name, or family name, of the buyer.',
                              example: 'Lunn',
                              maxLength: 255,
                              minLength: 1,
                              nullable: true,
                              type: 'string',
                            },
                            phone_number: {
                              description:
                                'The phone number of the buyer. This number is formatted according to the\n[E164 number standard](https://www.twilio.com/docs/glossary/what-e164).',
                              example: '+1234567890',
                              maxLength: 50,
                              minLength: 1,
                              nullable: true,
                              pattern: '^\\+[1-9]\\d{1,14}$',
                              type: 'string',
                            },
                            type: {
                              description:
                                'The type of this resource. Is always `shipping-details`.',
                              enum: ['shipping-details'],
                              example: 'shipping-details',
                              type: 'string',
                            },
                          },
                          title: 'Shipping detail',
                          type: 'object',
                        },
                      ],
                      description: 'The shipping details associated with the transaction.',
                      nullable: true,
                    },
                    statement_descriptor: {
                      allOf: [
                        {
                          description:
                            'hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum',
                          properties: {
                            city: {
                              description: 'City from which the charge originated.',
                              example: 'London',
                              maxLength: 13,
                              minLength: 1,
                              nullable: true,
                              type: 'string',
                            },
                            description: {
                              description:
                                'sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci',
                              example: 'Card payment',
                              maxLength: 22,
                              minLength: 5,
                              nullable: true,
                              type: 'string',
                            },
                            name: {
                              description:
                                'sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci',
                              example: 'GR4VY',
                              maxLength: 22,
                              minLength: 5,
                              nullable: true,
                              type: 'string',
                            },
                            phone_number: {
                              description:
                                'fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio aenean',
                              example: '+1234567890',
                              maxLength: 20,
                              minLength: 5,
                              nullable: true,
                              pattern: '^\\+[1-9]\\d{1,14}$',
                              type: 'string',
                            },
                            url: {
                              description:
                                "The value in the URL/web address field of a customer's statement.",
                              example: 'www.gr4vy.com',
                              maxLength: 13,
                              minLength: 1,
                              nullable: true,
                              type: 'string',
                            },
                          },
                          title: 'Statement descriptor',
                          type: 'object',
                        },
                      ],
                      nullable: true,
                    },
                    status: {
                      description:
                        'The status of the transaction. The status may change over time as\nasynchronous processing events occur.',
                      enum: [
                        'processing',
                        'buyer_approval_pending',
                        'authorization_succeeded',
                        'authorization_failed',
                        'authorization_declined',
                        'capture_pending',
                        'capture_succeeded',
                        'authorization_void_pending',
                        'authorization_voided',
                      ],
                      example: 'processing',
                      type: 'string',
                    },
                    three_d_secure: {
                      description:
                        'Details about the 3-D Secure challenge that was presented to\nthe buyer for this transaction, where applicable.',
                      properties: {
                        error_data: {
                          allOf: [
                            {
                              description:
                                'Details about the error resulting from 3DS processing a Transaction.',
                              properties: {
                                code: {
                                  description: 'The error code.',
                                  example: '305',
                                  maxLength: 3,
                                  minLength: 3,
                                  nullable: true,
                                  type: 'string',
                                },
                                component: {
                                  description:
                                    'Code indicating the 3-D Secure component that identified the error..',
                                  example: 'C',
                                  maxLength: 1,
                                  minLength: 1,
                                  nullable: true,
                                  type: 'string',
                                },
                                description: {
                                  description: 'The error description.',
                                  example: 'Invalid ThreeDSCompInd',
                                  maxLength: 2048,
                                  nullable: true,
                                  type: 'string',
                                },
                                detail: {
                                  description: 'Detail for the error.',
                                  example: "The threeDSCompInd must be 'Y' when successful",
                                  maxLength: 2048,
                                  nullable: true,
                                  type: 'string',
                                },
                              },
                              required: ['description', 'detail', 'component', 'code'],
                              title: '3-D Secure Error Data',
                              type: 'object',
                            },
                          ],
                          description: 'If the transaction had a 3DS error, information about it.',
                          nullable: true,
                          type: 'object',
                        },
                        method: {
                          description:
                            'The method used for 3DS authentication for this transaction.',
                          enum: ['challenge', 'frictionless'],
                          type: 'string',
                        },
                        response_data: {
                          description:
                            'The response for the 3DS authentication for this transaction.',
                          nullable: true,
                          oneOf: [
                            {
                              allOf: [
                                {
                                  properties: {
                                    cavv: {
                                      description: 'The cardholder authentication value or AAV.',
                                      example: '3q2+78r+ur7erb7vyv66vv8=',
                                      type: 'string',
                                    },
                                    directory_response: {
                                      description:
                                        'For 3-D Secure version 1, the enrolment response. For 3-D Secure version , the transaction status from the `ARes`.',
                                      example: 'C',
                                      maxLength: 1,
                                      type: 'string',
                                    },
                                    eci: {
                                      description:
                                        'The electronic commerce indicator for the 3DS transaction.',
                                      example: '05',
                                      maxLength: 2,
                                      minLength: 1,
                                      pattern: '^0?\\d$',
                                      type: 'string',
                                    },
                                    version: {
                                      description: 'The version of 3-D Secure that was used.',
                                      pattern: '^[1-2].?[\\d+.?]{0,3}$',
                                      type: 'string',
                                    },
                                  },
                                  required: ['cavv', 'eci', 'version', 'directory_response'],
                                  title: '3-D Secure Data',
                                  type: 'object',
                                },
                                {
                                  properties: {
                                    authentication_response: {
                                      description: 'The authentication response.',
                                      example: true,
                                      maxLength: 1,
                                      type: 'string',
                                    },
                                    cavv_algorithm: {
                                      description: 'The CAVV Algorithm used.',
                                      maxLength: 1,
                                      type: 'string',
                                    },
                                    xid: {
                                      description: 'The transaction identifier.',
                                      type: 'string',
                                    },
                                  },
                                  required: ['authentication_response', 'cavv_algorithm', 'xid'],
                                },
                              ],
                              title: '3-D Secure Data Version 1',
                              type: 'object',
                            },
                            {
                              allOf: [
                                {
                                  properties: {
                                    cavv: {
                                      description: 'The cardholder authentication value or AAV.',
                                      example: '3q2+78r+ur7erb7vyv66vv8=',
                                      type: 'string',
                                    },
                                    directory_response: {
                                      description:
                                        'For 3-D Secure version 1, the enrolment response. For 3-D Secure version , the transaction status from the `ARes`.',
                                      example: 'C',
                                      maxLength: 1,
                                      type: 'string',
                                    },
                                    eci: {
                                      description:
                                        'The electronic commerce indicator for the 3DS transaction.',
                                      example: '05',
                                      maxLength: 2,
                                      minLength: 1,
                                      pattern: '^0?\\d$',
                                      type: 'string',
                                    },
                                    version: {
                                      description: 'The version of 3-D Secure that was used.',
                                      pattern: '^[1-2].?[\\d+.?]{0,3}$',
                                      type: 'string',
                                    },
                                  },
                                  required: ['cavv', 'eci', 'version', 'directory_response'],
                                  title: '3-D Secure Data',
                                  type: 'object',
                                },
                                {
                                  properties: {
                                    authentication_response: {
                                      description:
                                        'The transaction status from the challenge result\n(not required for frictionless).',
                                      example: true,
                                      maxLength: 1,
                                      type: 'string',
                                    },
                                    directory_transaction_id: {
                                      description: 'The transaction identifier.',
                                      example: 'c4e59ceb-a382-4d6a-bc87-385d591fa09d',
                                      type: 'string',
                                    },
                                  },
                                  required: ['directory_transaction_id'],
                                },
                              ],
                              title: '3-D Secure Data Version 2',
                              type: 'object',
                            },
                          ],
                          type: 'object',
                        },
                        status: {
                          description: 'The status of the 3DS challenge for this transaction.',
                          enum: ['setup_error', 'error', 'declined', 'cancelled', 'complete'],
                          type: 'string',
                        },
                        version: {
                          description: 'The version of 3DS used for this transaction.',
                          example: '2.1.0',
                          pattern: '^[1-2].?[\\d+.?]{0,3}$',
                          type: 'string',
                        },
                      },
                      title: '3-D Secure Summary',
                      type: 'object',
                    },
                    type: {
                      description: 'The type of this resource. Is always `transaction`.',
                      enum: ['transaction'],
                      example: 'transaction',
                      type: 'string',
                    },
                    updated_at: {
                      description: 'Defines when the transaction was last updated.',
                      format: 'date-time',
                      type: 'string',
                    },
                    voided_at: {
                      description:
                        'tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla',
                      example: '2013-07-16T19:23:00.000+00:00',
                      format: 'date-time',
                      nullable: true,
                      type: 'string',
                    },
                  },
                  title: 'Transaction',
                  type: 'object',
                },
              },
            },
            description: 'Returns the created transaction.',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      description: 'Bad Request (HTTP 400).',
                      properties: {
                        code: {
                          description: '`bad_request`.',
                          enum: ['bad_request'],
                          example: 'bad_request',
                          type: 'string',
                        },
                        details: {
                          description:
                            'A list of detail objects that further clarify the reason for the error.',
                          items: {
                            description:
                              'Additional detail about the part of a request body that caused an issue.',
                            properties: {
                              location: {
                                description: 'The location where the error caused an issue.',
                                enum: ['query', 'body', 'path', 'header'],
                                example: 'body',
                                type: 'string',
                              },
                              message: {
                                description: 'A human readable message for this error detail.',
                                example: 'field required',
                                type: 'string',
                              },
                              pointer: {
                                description:
                                  'The exact item for which the validation did not succeed. This is a JSON\npointer for request bodies, while for query, path, and header parameters\nit is the name of the parameter.',
                                example: '/payment_method/number',
                                type: 'string',
                              },
                              type: {
                                description:
                                  'A unique identifier for the type of error that occurred.',
                                example: 'value_error.missing',
                                type: 'string',
                              },
                            },
                            title: 'Error details',
                            type: 'object',
                          },
                          type: 'array',
                        },
                        message: {
                          description:
                            'Describes the fields that are missing or incorrectly formatted in the API\nrequest.',
                          example: "Missing '****' field",
                          type: 'string',
                        },
                        status: {
                          description: '`400`.',
                          enum: ['400'],
                          example: '400',
                          type: 'integer',
                        },
                        type: {
                          description: '`error`.',
                          enum: ['error'],
                          example: 'error',
                          type: 'string',
                        },
                      },
                      title: 'Bad Request',
                      type: 'object',
                    },
                    {
                      description: 'Incorrect JSON (HTTP 400).',
                      properties: {
                        code: {
                          description: '`incorrect_json`.',
                          enum: ['incorrect_json'],
                          example: 'incorrect_json',
                          type: 'string',
                        },
                        details: {
                          description:
                            'A list of detail objects that further clarify the reason for the error.\nNot every error supports more detail.',
                          example: [],
                          items: {
                            description:
                              'Additional detail about the part of a request body that caused an issue.',
                            properties: {
                              location: {
                                description: 'The location where the error caused an issue.',
                                enum: ['query', 'body', 'path', 'header'],
                                example: 'body',
                                type: 'string',
                              },
                              message: {
                                description: 'A human readable message for this error detail.',
                                example: 'field required',
                                type: 'string',
                              },
                              pointer: {
                                description:
                                  'The exact item for which the validation did not succeed. This is a JSON\npointer for request bodies, while for query, path, and header parameters\nit is the name of the parameter.',
                                example: '/payment_method/number',
                                type: 'string',
                              },
                              type: {
                                description:
                                  'A unique identifier for the type of error that occurred.',
                                example: 'value_error.missing',
                                type: 'string',
                              },
                            },
                            title: 'Error details',
                            type: 'object',
                          },
                          type: 'array',
                        },
                        message: {
                          description:
                            'Incorrect JSON. The request body could not be parsed as valid JSON.',
                          example:
                            'Incorrect JSON. The request body could not be parsed as valid JSON.',
                          type: 'string',
                        },
                        status: {
                          description: '`400`.',
                          enum: ['400'],
                          example: '400',
                          type: 'integer',
                        },
                        type: {
                          description: '`error`.',
                          enum: ['error'],
                          example: 'error',
                          type: 'string',
                        },
                      },
                      title: 'Incorrect JSON',
                      type: 'object',
                    },
                  ],
                },
              },
            },
            description:
              'Returns an error if the request was badly formatted or missing required fields.',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  description: 'Unauthorized Error (HTTP 401).',
                  properties: {
                    code: {
                      description: '`unauthorized`.',
                      enum: ['unauthorized'],
                      example: 'unauthorized',
                      type: 'string',
                    },
                    details: {
                      description:
                        'A list of detail objects that further clarify the reason for the error.\nNot every error supports more detail.',
                      example: [],
                      items: {
                        description:
                          'Additional detail about the part of a request body that caused an issue.',
                        properties: {
                          location: {
                            description: 'The location where the error caused an issue.',
                            enum: ['query', 'body', 'path', 'header'],
                            example: 'body',
                            type: 'string',
                          },
                          message: {
                            description: 'A human readable message for this error detail.',
                            example: 'field required',
                            type: 'string',
                          },
                          pointer: {
                            description:
                              'The exact item for which the validation did not succeed. This is a JSON\npointer for request bodies, while for query, path, and header parameters\nit is the name of the parameter.',
                            example: '/payment_method/number',
                            type: 'string',
                          },
                          type: {
                            description: 'A unique identifier for the type of error that occurred.',
                            example: 'value_error.missing',
                            type: 'string',
                          },
                        },
                        title: 'Error details',
                        type: 'object',
                      },
                      type: 'array',
                    },
                    message: {
                      description: 'No valid API authentication found.',
                      enum: ['No valid API authentication found'],
                      example: 'No valid API authentication found',
                      type: 'string',
                    },
                    status: {
                      description: '`401`.',
                      enum: ['401'],
                      example: '401',
                      type: 'integer',
                    },
                    type: {
                      description: '`error`.',
                      enum: ['error'],
                      example: 'error',
                      type: 'string',
                    },
                  },
                  title: 'Unauthorized Error',
                  type: 'object',
                },
              },
            },
            description: 'Returns an error if no valid authentication was provided.',
          },
          '409': {
            content: {
              'application/json': {
                schema: {
                  description: 'Duplicate Record Error (HTTP 409).',
                  properties: {
                    code: {
                      description: '`duplicate_record`.',
                      enum: ['duplicate_record'],
                      example: 'duplicate_record',
                      type: 'string',
                    },
                    details: {
                      description:
                        'A list of detail objects that further clarify the reason for the error.\nNot every error supports more detail.',
                      example: [],
                      items: {
                        description:
                          'Additional detail about the part of a request body that caused an issue.',
                        properties: {
                          location: {
                            description: 'The location where the error caused an issue.',
                            enum: ['query', 'body', 'path', 'header'],
                            example: 'body',
                            type: 'string',
                          },
                          message: {
                            description: 'A human readable message for this error detail.',
                            example: 'field required',
                            type: 'string',
                          },
                          pointer: {
                            description:
                              'The exact item for which the validation did not succeed. This is a JSON\npointer for request bodies, while for query, path, and header parameters\nit is the name of the parameter.',
                            example: '/payment_method/number',
                            type: 'string',
                          },
                          type: {
                            description: 'A unique identifier for the type of error that occurred.',
                            example: 'value_error.missing',
                            type: 'string',
                          },
                        },
                        title: 'Error details',
                        type: 'object',
                      },
                      type: 'array',
                    },
                    message: {
                      description: 'Further details on the field that triggered the error.',
                      example: 'A duplicate ecord exists with this external_identifier value',
                      type: 'string',
                    },
                    status: {
                      description: '`409`.',
                      enum: ['409'],
                      example: '409',
                      type: 'integer',
                    },
                    type: {
                      description: '`error`.',
                      enum: ['error'],
                      example: 'error',
                      type: 'string',
                    },
                  },
                  title: 'Duplicate Record Error',
                  type: 'object',
                },
              },
            },
            description: 'Returns an error if duplicate resource has been found.',
          },
        },
        summary: 'New transaction',
        tags: ['Transactions'],
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  servers: [
    {
      url: 'https://dummy-api.com',
    },
  ],
};

const specInfo = {
  spec,
  method: 'post',
  endpoint: '/transactions',
};

export default specInfo;
