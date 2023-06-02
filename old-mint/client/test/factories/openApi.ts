import { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

import getRelevantApiReferenceInfo from '@/api-reference/getRelevantApiReferenceInfo';
import { ConfigContextType } from '@/context/ConfigContext';
import type { GeneratedRequestExamplesParams } from '@/layouts/ApiSupplemental';
import { MDXContentState } from '@/types/mdxContentController';
import { PageMetaTags } from '@/types/metadata';
import type { OpenApiFile } from '@/types/openApi';
import { getOpenApiPlaygroundProps } from '@/ui/MDXContentController/getOpenApiPlaygroundProps';
import { getParamGroupsFromApiComponents } from '@/utils/api';

export type CreateOpenApiFileParams = {
  filename?: string;
  spec?: OpenAPI.Document;
};

export const createOpenApiFile = ({
  filename = 'openApiFiles.json',
  spec,
}: CreateOpenApiFileParams): OpenApiFile => {
  return {
    filename,
    spec: spec ?? createOpenApiSpec(),
  };
};

export type CreateOpenApiSpecParams =
  | CreateOpenApiV2SpecParams
  | CreateOpenApiV3SpecParams
  | CreateOpenApiV3_1SpecParams;

export const createOpenApiSpec = (
  params: CreateOpenApiSpecParams | undefined = { version: '3.1' }
): OpenAPI.Document => {
  switch (params.version) {
    case '2':
      return createOpenApiV2Spec(params);
    case '3':
      return createOpenApiV3Spec(params);
    case '3.1':
      return createOpenApiV3_1Spec(params);
  }
};

type CreateOpenApiV2SpecParams = {
  version: '2';
  securitySchemes?: OpenAPIV2.SecurityDefinitionsObject;
  globalSecurity?: OpenAPIV2.SecurityRequirementObject[];
  paths?: OpenAPIV2.PathsObject;
};

type CreateOpenApiV3SpecParams = {
  version: '3';
  securitySchemes?: { [key: string]: OpenAPIV3.SecuritySchemeObject };
  globalSecurity?: OpenAPIV3.SecurityRequirementObject[];
  paths?: OpenAPIV3.PathsObject;
};

type CreateOpenApiV3_1SpecParams = {
  version: '3.1';
  securitySchemes?: Record<string, OpenAPIV3_1.SecuritySchemeObject>;
  globalSecurity?: OpenAPIV3_1.SecurityRequirementObject[];
  paths?: OpenAPIV3_1.PathsObject;
};

const defaultInfo = {
  title: 'My API',
  version: '1.0.0',
};

const createOpenApiV2Spec = ({
  securitySchemes = {},
  globalSecurity = [],
  paths = {},
}: CreateOpenApiV2SpecParams): OpenAPIV2.Document => {
  return {
    swagger: '2.0',
    info: defaultInfo,
    paths,
    security: globalSecurity,
    securityDefinitions: securitySchemes,
  };
};

const createOpenApiV3Spec = ({
  securitySchemes = {},
  globalSecurity = [],
  paths = {},
}: CreateOpenApiV3SpecParams): OpenAPIV3.Document => {
  return {
    openapi: '3.0.3',
    info: defaultInfo,
    paths,
    security: globalSecurity,
    components: {
      securitySchemes,
    },
  };
};

const createOpenApiV3_1Spec = ({
  securitySchemes = {},
  globalSecurity = [],
  paths = {},
}: CreateOpenApiV3_1SpecParams): OpenAPIV3_1.Document => {
  return {
    openapi: '3.1.0',
    info: defaultInfo,
    paths,
    security: globalSecurity,
    components: {
      securitySchemes,
    },
  };
};

type SchemaObjectType = OpenAPIV3_1.NonArraySchemaObjectType | OpenAPIV3_1.ArraySchemaObjectType;

export type GenerateOpenApiFileParams = {
  path?: string;
  method?: keyof typeof OpenAPIV3.HttpMethods;
  requestContentType?: string;
  requestType?: SchemaObjectType;
  parameters?: {
    name: string;
    type: 'string' | 'number' | 'boolean';
    in: 'path' | 'header';
    required: boolean;
  }[];
  security?: {
    name: string;
    type: 'basic' | 'bearer' | 'apiKey';
  }[];
  securityType?: 'global' | 'local';
};

const createSecurityScheme = (
  name: string,
  type: 'basic' | 'bearer' | 'apiKey'
): OpenAPIV3_1.SecuritySchemeObject => {
  switch (type) {
    case 'apiKey':
      return {
        type: 'apiKey',
        name,
        in: 'header',
      };
    default:
      return {
        type: 'http',
        scheme: type,
      };
  }
};

const generateRequestBody = (
  contentType: string,
  requestType: SchemaObjectType
): OpenAPIV3_1.RequestBodyObject => {
  return {
    content: {
      [contentType]: generateSchema(requestType),
    },
  };
};

const generateSchema = (requestType: SchemaObjectType): OpenAPIV3_1.MediaTypeObject => {
  switch (requestType) {
    case 'boolean':
      return {
        schema: {
          type: 'boolean',
          example: true,
        },
      };
    case 'string':
      return {
        schema: {
          type: 'string',
          example: 'example',
        },
      };
    case 'number':
      return {
        schema: {
          type: 'number',
          example: 3.14,
        },
      };
    case 'integer':
      return {
        schema: {
          type: 'integer',
          example: 4,
        },
      };
    case 'object':
      return {
        schema: {
          type: 'object',
          properties: {
            'property-array': {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Ronan',
                  },
                  tall: {
                    type: 'boolean',
                    example: 'true',
                  },
                  score: {
                    type: 'number',
                    example: 100,
                  },
                },
                required: ['name', 'tall'],
              },
            },
            'property-string': {
              type: 'string',
              example: 'example',
            },
            'property-boolean': {
              type: 'boolean',
              example: 'false',
            },
            'property-object': {
              type: 'object',
              properties: {
                'property-with-example-value': {
                  type: 'string',
                  example: 'example value',
                },
                'property-without-example-value': {
                  type: 'string',
                },
                'property-with-numeric-example': {
                  type: 'integer',
                  example: 3,
                },
                'property-with-boolean-example': {
                  type: 'boolean',
                  example: false,
                },
                'property-with-object-example': {
                  type: 'object',
                  properties: {
                    foo: {
                      type: 'string',
                    },
                    bar: {
                      type: 'string',
                    },
                  },
                  example: {
                    foo: '',
                    bar: '',
                  },
                },
              },
              required: [
                'property-with-example-value',
                'property-without-example-value',
                'property-with-numeric-example',
                'property-with-boolean-example',
                'property-with-object-example',
              ],
            },
          },
          required: ['property-array', 'property-string', 'property-boolean', 'property-object'],
        },
      };
    case 'array':
      return {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Ronan',
              },
              tall: {
                type: 'boolean',
                example: 'true',
              },
              score: {
                type: 'number',
                example: 100,
              },
              address: {
                type: 'object',
                properties: {
                  'street 1': {
                    type: 'string',
                    example: '500 treat ave',
                  },
                  'street 2': {
                    type: 'string',
                  },
                  zip: {
                    type: 'integer',
                    example: 12345,
                  },
                },
                required: ['street 1', 'zip'],
              },
            },
            required: ['name', 'tall'],
          },
        },
      };
    case 'null':
      return {
        schema: {
          type: 'null',
        },
      };
  }
};

export const generateOpenApiFile = ({
  path = '/test/endpoint',
  method = 'GET',
  requestContentType = 'application/json',
  requestType,
  parameters = [],
  security = [],
  securityType = 'global',
}: GenerateOpenApiFileParams): OpenApiFile => {
  const securityList: OpenAPIV3_1.SecurityRequirementObject[] | undefined =
    security.length > 0 ? [Object.fromEntries(security.map(({ name }) => [name, []]))] : undefined;
  const parameterList: OpenAPIV3_1.ParameterObject[] = parameters.map(
    ({ name, type, in: location, required }) => {
      return {
        in: location,
        name,
        required,
        schema: {
          type,
        },
      };
    }
  );

  const requestBody: OpenAPIV3_1.RequestBodyObject | undefined = requestType
    ? generateRequestBody(requestContentType, requestType)
    : undefined;

  return createOpenApiFile({
    spec: createOpenApiSpec({
      version: '3.1',
      securitySchemes: Object.fromEntries(
        security.map(({ name, type }) => [name, createSecurityScheme(name, type)])
      ),
      globalSecurity: securityType === 'global' ? securityList : undefined,
      paths: {
        [path]: {
          [OpenAPIV3.HttpMethods[method]]: {
            parameters: parameterList,
            security: securityType === 'local' ? securityList : undefined,
            requestBody,
            responses: {},
          },
        },
      },
    }),
  });
};

export const createApiPlaygroundContextFromSpec = ({
  spec,
  method,
  endpoint,
}: {
  spec: OpenAPI.Document;
  method: string;
  endpoint: string;
}): { initConfigContext: ConfigContextType; initMDXContentContext: MDXContentState } => {
  const openApiFiles = [createOpenApiFile({ spec })];
  const openApiString = `${method} ${endpoint}`;

  const openApiPlaygroundProps = getOpenApiPlaygroundProps(
    0,
    undefined,
    openApiFiles,
    openApiString
  );
  const selectedApiComponents =
    openApiPlaygroundProps?.apiComponentsByContentType?.[0]?.apiComponents;
  const paramGroupDict = getParamGroupsFromApiComponents(
    selectedApiComponents,
    undefined,
    undefined
  );
  const paramGroups = Object.entries(paramGroupDict).map(([groupName, params]) => {
    return {
      name: groupName,
      params,
    };
  });
  const pageMetadata: PageMetaTags = {
    openapi: openApiString,
  };
  const apiReferenceData = getRelevantApiReferenceInfo(pageMetadata, openApiFiles);
  return {
    initConfigContext: {
      openApiFiles,
      apiReferenceData,
    },
    initMDXContentContext: {
      apiPlaygroundMode: 'show',
      openApiPlaygroundProps,
      api: `${method} https://api.ronanapi.com${endpoint}`,
      paramGroups,
      selectedBodyContentType: 'application/json',
    } as MDXContentState,
  };
};

export const createGeneratedRequestExamplesParamsFromSpec = ({
  spec,
  method,
  endpoint,
}: {
  spec: OpenAPI.Document;
  method: string;
  endpoint: string;
}): { configContext: ConfigContextType; args: GeneratedRequestExamplesParams } => {
  const openApiFiles = [createOpenApiFile({ spec })];
  const openApiString = `${method} ${endpoint}`;
  const pageMetadata: PageMetaTags = {
    openapi: openApiString,
  };
  const apiReferenceData = getRelevantApiReferenceInfo(pageMetadata, openApiFiles);
  const openApiPlaygroundProps = getOpenApiPlaygroundProps(
    0,
    undefined,
    openApiFiles,
    openApiString
  );
  const selectedApiComponents =
    openApiPlaygroundProps?.apiComponentsByContentType?.[0]?.apiComponents;
  const paramGroupDict = getParamGroupsFromApiComponents(
    selectedApiComponents,
    undefined,
    undefined
  );

  return {
    args: {
      paramGroupDict,
      apiPlaygroundInputs: {},
      apiBaseIndex: 0,
      endpointStr: `${method} https://api.ronanapi.com${endpoint}`,
      authMethod: undefined,
      authName: undefined,
    },
    configContext: { openApiFiles, apiReferenceData },
  };
};

export const generateGeneratedRequestExamplesArgs = (
  params: GenerateOpenApiFileParams
): { args: GeneratedRequestExamplesParams; configContext: ConfigContextType } => {
  const openApiFiles = [generateOpenApiFile(params)];
  const openApiString = `${params.method} ${params.path}`;
  const pageMetadata: PageMetaTags = {
    openapi: openApiString,
  };

  const apiReferenceData = getRelevantApiReferenceInfo(pageMetadata, openApiFiles);

  const openApiPlaygroundProps = getOpenApiPlaygroundProps(
    0,
    undefined,
    openApiFiles,
    `${params.method} ${params.path}`
  );
  const selectedApiComponents =
    openApiPlaygroundProps?.apiComponentsByContentType?.[0]?.apiComponents;
  const paramGroupDict = getParamGroupsFromApiComponents(
    selectedApiComponents,
    undefined,
    undefined
  );

  return {
    args: {
      paramGroupDict,
      apiPlaygroundInputs: {},
      apiBaseIndex: 0,
      endpointStr: `${params.method} https://api.ronanapi.com${params.path}`,
      authMethod: undefined,
      authName: undefined,
    },
    configContext: { openApiFiles, apiReferenceData },
  };
};
