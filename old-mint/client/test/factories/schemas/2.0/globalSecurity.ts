import { OpenAPIV2 } from 'openapi-types';

const spec: OpenAPIV2.Document = {
  swagger: '2.0',
  info: {
    version: '2.0.0',
    title: 'Ronan',
    description: 'Ronan API',
  },
  host: 'api.ronan.com',
  basePath: '/api/v2',
  schemes: ['https', 'http'],
  security: [
    {
      token: [],
      Bearer: [],
      'api-key': [],
      'access-key': [],
    },
  ],
  securityDefinitions: {
    token: {
      type: 'apiKey',
      description: 'apiKey to be passed as token in query parameter.',
      name: 'token',
      in: 'query',
    },
    Bearer: {
      type: 'basic',
    },
    'api-key': {
      type: 'apiKey',
      description: 'apiKey to be passed as token in query parameter.',
      name: 'api-key',
      in: 'header',
    },
    'access-key': {
      type: 'apiKey',
      description: 'apiKey to be passed as token in query parameter.',
      name: 'access-key',
      in: 'header',
    },
  },
  paths: {
    '/news': {
      get: {
        summary: 'Get the news items',
        parameters: [
          {
            name: 'accept',
            in: 'header',
            type: 'string',
            description: 'Specify return format.',
            enum: ['application/json', 'application/xml (deprecated)'],
            default: 'application/json',
            required: true,
          },
          {
            name: 'page',
            in: 'query',
            type: 'integer',
            description:
              'Page offset.\nFor optimization, performance and technical reasons, page offsets are limited from 0 - 100000.  Limit the query results by other parameters such as date.',
            default: 0,
          },
          {
            name: 'pageSize',
            in: 'query',
            type: 'integer',
            description: 'Number of results returned.',
            default: 15,
            maximum: 100,
          },
          {
            name: 'displayOutput',
            in: 'query',
            type: 'string',
            description:
              'Specify headline only (headline), headline + teaser (abstract), or headline + full body (full) text',
            default: 'headline',
            enum: ['full', 'abstract', 'headline'],
          },
          {
            name: 'date',
            in: 'query',
            type: 'string',
            format: 'yyyy-mm-dd',
            description:
              'The date to query for news. Shorthand for date_from and date_to if they are the same',
          },
          {
            name: 'dateFrom',
            in: 'query',
            type: 'string',
            format: 'yyyy-mm-dd',
            description: 'Date to query from point in time. Sorted by published date',
          },
          {
            name: 'dateTo',
            in: 'query',
            type: 'string',
            format: 'yyyy-mm-dd',
            description: 'Date to query to point in time. Sorted by published date',
          },
          {
            name: 'updatedSince',
            in: 'query',
            type: 'integer',
            format: 'int64',
            description: 'The last updated Unix timestamp (UTC) to pull and sort by',
          },
          {
            name: 'publishedSince',
            in: 'query',
            type: 'integer',
            format: 'Unix timestamp',
            description: 'The last published Unix timestamp (UTC) to pull and sort by',
          },
          {
            name: 'sort',
            in: 'query',
            type: 'string',
            format: 'field, field:direction',
            description:
              'Allows control of results sorting.  Default is created, DESC.\n \nSort Fields\n  * id\n  * created\n  * updated\n \nSort Order Direction\n  * asc (ascending)\n  * desc (descending)',
            enum: [
              'id:asc',
              'id:desc',
              'created:asc',
              'created:desc',
              'updated:asc',
              'updated:desc',
            ],
          },
          {
            name: 'isin',
            in: 'query',
            type: 'string',
            format: 'csv',
            description: 'One or more ISINs separated by a comma.  Maximum 50.',
          },
          {
            name: 'cusip',
            in: 'query',
            type: 'string',
            format: 'csv',
            description:
              'One or more CUSIPs separated by a comma.  Maximum 50.  License agreement required.',
          },
          {
            name: 'tickers',
            in: 'query',
            type: 'string',
            format: 'csv',
            description: 'One or more ticker symbols separated by a comma.  Maximum 50.',
          },
          {
            name: 'channels',
            in: 'query',
            type: 'string',
            format: 'csv',
            description: 'One or more channel names or IDs separated by a comma',
          },
          {
            name: 'topics',
            in: 'query',
            type: 'string',
            format: 'csv',
            description:
              'One or more words/phrases separated by a comma; searches Title, Tags, and Body in order of priority.',
          },
          {
            name: 'authors',
            in: 'query',
            type: 'string',
            format: 'csv',
            description: 'One or more authors separated by a comma',
          },
          {
            name: 'content_types',
            in: 'query',
            type: 'string',
            format: 'csv',
            description: 'One or more content types separated by a comma',
          },
        ],
        responses: {
          '200': {
            description: 'success',
            schema: {
              type: 'string',
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
  endpoint: '/news',
};

export default specInfo;
