import { Component } from '@/enums/components';
import {
  createExpandable,
  createParamField,
  foldAllOfIntoSchema,
  getAllOpenApiParameters,
  getProperties,
} from '@/openapi';
import { getOpenApiOperationMethodAndEndpoint } from '@/openapi';
import { getParameterType } from '@/openapi/getParameterType';
import { Config } from '@/types/config';
import { OpenApiFile } from '@/types/openApi';
import { ApiComponent } from '@/ui/ApiPlayground';
import { ParamItemType } from '@/utils/api';

export type OpenApiPlaygroundProps = {
  api?: string;
  apiComponentsByContentType?: {
    contentType: string;
    apiComponents: ApiComponent[];
  }[];
};

export function getOpenApiPlaygroundProps(
  apiBaseIndex: number,
  mintConfig: Config | undefined,
  openApiFiles: OpenApiFile[],
  openApiEndpoint: string | undefined
): OpenApiPlaygroundProps {
  // Detect when OpenAPI is missing
  if (!openApiEndpoint || !openApiFiles) {
    return {};
  }

  const { method, endpoint, operation, path, securityHeaders } =
    getOpenApiOperationMethodAndEndpoint(openApiEndpoint, openApiFiles);
  // Detect when OpenAPI string is missing the operation (eg. GET)
  if (!operation) {
    return {};
  }

  // Get the api string with the correct baseUrl
  // endpoint in OpenAPI refers to the path
  // servers are only in OpenAPI >3
  const openApiServers = openApiFiles?.reduce((acc, file: OpenApiFile) => {
    return acc.concat((file.spec as any)?.servers);
  }, []);
  const configBaseUrl =
    mintConfig?.api?.baseUrl ??
    openApiServers?.map((server: { url: string } | undefined) => server?.url);
  const baseUrl =
    configBaseUrl && Array.isArray(configBaseUrl) ? configBaseUrl[apiBaseIndex] : configBaseUrl;
  const api = `${method} ${baseUrl}${endpoint}`;

  // Get ApiComponents to show in the ApiPlayground
  const parameters = getAllOpenApiParameters(path, operation);
  const bodyContent = operation.requestBody?.content;
  // If undefined, add an empty content type to add parameters
  const contentTypes: [string, unknown][] = bodyContent ? Object.entries(bodyContent) : [['', {}]];

  const apiComponentsByContentType = contentTypes?.map(
    ([contentTypeName, contentTypeValue]: [string, unknown]): {
      contentType: string;
      apiComponents: ApiComponent[];
    } => {
      const apiComponents: ApiComponent[] = [];
      securityHeaders.forEach((header: unknown) => {
        if (typeof header !== 'object') return;
        const headerObj = header as Record<string, unknown>;
        apiComponents.push(
          createParamField({
            auth: headerObj.name,
            required: true,
            type: 'string',
            default: headerObj.default,
            placeholder: headerObj.placeholder,
          }) as ApiComponent
        );
      });
      // Get the Parameter ApiComponents
      parameters.forEach((parameter: unknown) => {
        apiComponents.push(parameterToParamField(parameter) as ApiComponent);
      });
      let bodySchema =
        typeof contentTypeValue === 'object'
          ? (contentTypeValue as Record<string, unknown>)?.schema
          : undefined;

      if (
        bodySchema &&
        typeof bodySchema === 'object' &&
        (bodySchema as Record<string, unknown>)?.allOf
      ) {
        bodySchema = foldAllOfIntoSchema(bodySchema);
      }
      // Get the Body ApiComponents
      if (typeof bodySchema === 'object' && (bodySchema as Record<string, unknown>)?.properties) {
        apiComponents.push(...bodySchemaObjectToParamArr(bodySchema as Record<string, unknown>));
      }
      return {
        contentType: contentTypeName,
        apiComponents,
      };
    }
  );

  return {
    api,
    apiComponentsByContentType,
  };
}

const parameterToParamField = (parameter: unknown) => {
  if (typeof parameter !== 'object') return;
  const parameterObj = parameter as Record<string, unknown>;

  const { name, required, schema, in: paramType, example, oneOf } = parameterObj;
  const enumValue =
    typeof schema === 'object' ? (schema as Record<string, unknown>)?.enum : undefined;
  const type = schema == null ? parameterObj?.type : getParameterType(schema);
  return createParamField({
    ...(typeof paramType === 'string' && { [paramType]: name }),
    required,
    type,
    ...(typeof schema === 'object' && {
      default: (schema as Record<string, unknown>)?.default,
    }),
    placeholder: example || enumValue,
    ...(Array.isArray(oneOf) && {
      oneOf: oneOf.map((schemaObj: Record<string, unknown>) => createParamField(schemaObj)),
    }),
  });
};

const bodySchemaObjectToParamArr = (
  schemaObj: Record<string, unknown>,
  parameterLength?: number
): ApiComponent[] => {
  const bodyParamFields: ApiComponent[] = [];
  if (Array.isArray(schemaObj?.allOf)) {
    schemaObj = foldAllOfIntoSchema(schemaObj);
  }
  if (typeof schemaObj?.properties !== 'object') return [];
  Object.entries(schemaObj?.properties as object)?.forEach(
    ([property, propertyValue]: [string, unknown], i: number) => {
      if (typeof propertyValue !== 'object') return [];
      let propertyValueObj = propertyValue as Record<string, unknown>;
      if (
        propertyValueObj?.allOf &&
        Array.isArray(propertyValueObj?.allOf) &&
        propertyValueObj.allOf.length > 0
      ) {
        propertyValueObj = foldAllOfIntoSchema(propertyValueObj);
      }
      const items = propertyValueObj?.items as ParamItemType;
      const required = Array.isArray(schemaObj.required) && schemaObj.required?.includes(property);
      const type = getParameterType(propertyValueObj);
      const bodyDefault =
        schemaObj.example && typeof schemaObj.example === 'object'
          ? JSON.stringify((schemaObj.example as object)[property as keyof object])
          : undefined;
      const example = propertyValueObj?.example;
      const last = parameterLength ? i + 1 === parameterLength : false;
      let children:
        | {
            name: Component;
            children: unknown;
          }[]
        | undefined;
      if (propertyValueObj?.properties && typeof propertyValueObj?.properties === 'object') {
        const requiredArr = Array.isArray(propertyValueObj?.required)
          ? propertyValueObj?.required
          : [];
        const properties = getProperties(propertyValueObj?.properties, requiredArr);
        children = [createExpandable(properties)];
      } else if (propertyValueObj?.items && typeof propertyValueObj?.items === 'object') {
        const itemsObj = propertyValueObj?.items as Record<string, unknown>;
        if (itemsObj?.properties && typeof itemsObj?.properties === 'object') {
          const requiredArr = Array.isArray(itemsObj?.required) ? itemsObj?.required : [];
          const properties = getProperties(itemsObj?.properties, requiredArr);
          children = [createExpandable(properties)];
        }
      }

      const oneOf = Array.isArray(propertyValueObj?.oneOf)
        ? {
            oneOf: propertyValueObj?.oneOf.map((schemaObj: Record<string, unknown>) => {
              if (Array.isArray(schemaObj?.allOf)) {
                schemaObj = { title: schemaObj.title, ...foldAllOfIntoSchema(schemaObj) };
              }
              const params =
                typeof schemaObj?.properties === 'object'
                  ? Object.entries(schemaObj?.properties as object).map(
                      ([property, propertyValue]: [string, unknown]) => {
                        if (typeof propertyValue !== 'object') return;
                        return { ...parameterToParamField(propertyValue), name: property };
                      }
                    )
                  : [];
              return { title: schemaObj.title, params };
            }),
          }
        : undefined;
      const paramField = createParamField(
        {
          ...(items && { items }),
          body: property,
          required,
          ...(type && { type }),
          ...(bodyDefault && { default: bodyDefault }),
          ...(propertyValueObj.enum !== undefined && { enum: propertyValueObj.enum }),
          ...(example !== undefined && { example }),
          last,
          ...(oneOf && oneOf),
        },
        children
      );
      bodyParamFields.push(paramField as ApiComponent);
    }
  );
  return bodyParamFields;
};
