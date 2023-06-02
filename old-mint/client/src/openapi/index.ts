import { Component } from '@/enums/components';
import { OpenApiFile } from '@/types/openApi';
import { extractMethodAndEndpoint } from '@/utils/api';

export const createParamField = (
  attributes: Record<string, unknown>,
  children?: {
    name: Component;
    children: unknown;
  }[]
) => {
  const attributesArray = Object.entries(attributes).map(([key, value]) => {
    return {
      type: 'mdx',
      name: key,
      value,
    };
  });
  return {
    type: Component.ParamField,
    attributes: attributesArray,
    children,
  };
};

export const createExpandable = (children: unknown) => {
  return {
    name: Component.Expandable,
    children,
  };
};

export const getProperties = (properties: object, required: string[] = []): any[] => {
  return Object.entries(properties).map(([property, propertyValue]: any) => {
    if (propertyValue.allOf) {
      propertyValue = foldAllOfIntoSchema(propertyValue);
    }
    let children;
    if (propertyValue.properties) {
      const nestedProperties = getProperties(propertyValue.properties, propertyValue.required);
      children = [createExpandable(nestedProperties)];
    }
    return createParamField(
      {
        body: property,
        required: required?.includes?.(property),
        ...propertyValue,
      },
      children
    );
  });
};

export const getAllOpenApiParameters = (path: any, operation: any) =>
  (path?.parameters || []).concat(operation?.parameters || []);

export const getTypeName = (type: string[] | string) => {
  return Array.isArray(type) ? type.join(' | ') : type;
};

export const foldAllOfIntoSchema = (schema: any) => {
  const allOfResolution = combineAllOfIntoObject(schema.allOf);

  const folded = { ...allOfResolution, ...schema };

  // combine properties from base schema and allOf
  if (schema.properties || allOfResolution.properties) {
    folded.properties = {
      ...schema.properties,
      ...allOfResolution.properties,
    };
  }

  delete folded.allOf;
  return folded;
};

export const combineAllOfIntoObject = (allOf: any[]): any => {
  let description: string | undefined = undefined;
  let type: string | undefined = undefined;
  let combinedProperties: object = {};
  let combinedRequired: string[] = [];
  let combinedExample: any = undefined;
  let oneOf: any = undefined;

  allOf.forEach((item) => {
    if (item.allOf) {
      item = foldAllOfIntoSchema(item);
    }
    if (item.oneOf) {
      oneOf = item.oneOf;
    }

    if (!description && item.description) {
      description = item.description;
    }
    if (!type && item.type) {
      type = item.type;
    }
    if (item.properties) {
      combinedProperties = { ...combinedProperties, ...item.properties };
    }
    if (item.required) {
      combinedRequired = [...combinedRequired, ...item.required];
    }
    if (item.example) {
      if (item.type === 'object') {
        combinedExample = { ...combinedExample, ...item.example };
      } else {
        combinedExample = item.example;
      }
    }
  });

  const combinedObject = {
    description,
    type,
    properties: Object.keys(combinedProperties).length > 0 ? combinedProperties : undefined,
    required: combinedRequired,
    example: combinedExample,
    oneOf,
  };

  return combinedObject;
};

export const getSecurityHeaders = (file: any, operation: any): any[] => {
  try {
    const securitySchemes = file?.components?.securitySchemes ?? file?.securityDefinitions ?? {};
    if (operation.security) {
      return Object.keys(operation.security[0])
        .map((securityName) => securitySchemes[securityName])
        .filter((scheme: any) => scheme?.type === 'apiKey' && scheme?.in === 'header');
    } else if (file.security) {
      return Object.keys(file.security[0])
        .map((securityName) => securitySchemes[securityName])
        .filter((scheme: any) => scheme?.type === 'apiKey' && scheme?.in === 'header');
    }
  } catch {
    return [];
  }
  return [];
};

export const getOpenApiOperationMethodAndEndpoint = (
  endpointStr: string,
  openApiFiles: OpenApiFile[]
): any => {
  const { endpoint, method, filename } = extractMethodAndEndpoint(endpointStr);

  let path;
  let apiFile: any;
  const m: string = method?.toLowerCase() as string;
  openApiFiles.forEach((file) => {
    const openApiFile: any = file.spec;
    const openApiPath = openApiFile.paths && openApiFile.paths[endpoint];
    const isFilenameOrNone = !filename || filename === file.filename;
    if (openApiPath && isFilenameOrNone) {
      path = openApiPath;
      apiFile = openApiFile;
    }
  });

  if (path == null) {
    return {};
  }

  let operation: any;
  if (method) {
    operation = path[m];
  } else {
    const firstOperationKey = Object.keys(path)[0];
    operation = path[firstOperationKey];
  }

  const securityHeaders = getSecurityHeaders(apiFile, operation);

  return {
    method,
    endpoint,
    operation,
    path,
    securityHeaders,
  };
};
