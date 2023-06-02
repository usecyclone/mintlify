import { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

import { OpenApiFile, PathItemObject, Parameter, OperationObject } from '@/types/openApi';

export type OpenApiData = {
  method: string;
  endpoint: string;
  filename?: string;
  // spec: OpenAPI.Document; // TODO: Add back after removing openApiFiles (Might be too much data to pass around)
  operationObject?: OperationObject;
  version: number;
  parameters: Parameter[];
  securityParameters: Parameter[];
};

export const getOpenApiData = (openApiStr: string, openApiFiles: OpenApiFile[]) => {
  let isValidOpenApi = false;
  let openApiData: OpenApiData | undefined = undefined;
  try {
    const { method, endpoint, filename } = parseOpenApiString(openApiStr);
    const { pathItemObject, spec } = getSpecAndPathItemObject(openApiFiles, endpoint, filename);
    const version = getOpenApiSpecVersion(spec);
    const isMethodValid = getIsValidHttpMethod(method, version);
    const operationObject = isMethodValid
      ? getOperationObject(pathItemObject, method, version)
      : undefined;
    const parameters = unifyParameters(pathItemObject, operationObject);
    let securityParameters: Parameter[] = [];
    if (version >= 3) {
      const securitySchemes = (spec as OpenAPIV3.Document | OpenAPIV3_1.Document).components
        ?.securitySchemes;
      const securityRequirements = operationObject?.security ?? spec.security;
      securityParameters = evaluateSecurity(securityRequirements, securitySchemes);
    }
    openApiData = {
      method,
      endpoint,
      filename,
      operationObject,
      version,
      parameters,
      securityParameters,
    };
    isValidOpenApi = true;
  } catch (e) {
    console.error(e);
  }
  return { openApiData, isValidOpenApi };
};

/**
 *
 * @param str either the openapi or api string defined in the frontmatter
 * @returns method: API method (GET, POST, PUT, DELETE, PATCH)
 *          endpoint: API endpoint
 *          filename: filename of the openapi file (if applicable)
 */
export const parseOpenApiString = (
  str: string
): { method: string; endpoint: string; filename?: string } => {
  const components = str.trim().split(/\s+/);
  let filename: string | undefined;
  let method: string;
  let endpoint: string;
  if (components.length === 2) {
    [method, endpoint] = components;
  } else if (components.length === 3) {
    [filename, method, endpoint] = components;
  } else {
    throw new Error('improperly formatted openapi string');
  }
  method = method.toLowerCase();
  if (!['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'].includes(method)) {
    throw new Error('invalid http method');
  }
  return {
    method,
    endpoint,
    filename,
  };
};

/**
 * @param openApiFiles array of openapi files
 * @param endpoint the endpoint to find in the openapi files
 * @param filename the filename of the openapi file (if applicable)
 */
export const getSpecAndPathItemObject = (
  openApiFiles: OpenApiFile[],
  endpoint: string,
  filename?: string
): {
  pathItemObject: PathItemObject;
  spec: OpenAPI.Document;
} => {
  let pathItemObject: PathItemObject | undefined;
  let spec: OpenAPI.Document | undefined;
  openApiFiles.forEach((file) => {
    const openApiFile = file.spec;
    const openApiPath = openApiFile.paths && openApiFile.paths[endpoint];
    const isFilenameOrNone = !filename || filename === file.filename;
    if (openApiPath && isFilenameOrNone) {
      pathItemObject = openApiPath;
      spec = openApiFile;
    }
  });
  if (pathItemObject == null || spec == null) {
    throw new Error('No path value found');
  }
  return {
    pathItemObject,
    spec,
  };
};

export const getOpenApiSpecVersion = (spec: OpenAPI.Document) => {
  const untypedSpec: { openapi?: string; swagger?: string } = spec;
  let versionStr: string | undefined = undefined;
  if (untypedSpec?.openapi) {
    versionStr = untypedSpec.openapi;
  }
  if (untypedSpec?.swagger) {
    versionStr = untypedSpec.swagger;
  }
  if (versionStr == undefined) {
    throw new Error('No openapi or swagger version found');
  }
  const version = parseFloat(versionStr.substring(0, 3));
  if (version <= 1) {
    throw new Error('Invalid openapi or swagger version found');
  }
  return version;
};

export const getIsValidHttpMethod = (method: string, openApiVersion: number) => {
  if (openApiVersion < 3) {
    return Object.values(OpenAPIV2.HttpMethods).includes(method as OpenAPIV2.HttpMethods);
  }
  return Object.values(OpenAPIV3.HttpMethods).includes(method as OpenAPIV3.HttpMethods);
};

export const getOperationObject = (
  pathItemObject: PathItemObject,
  method: string,
  openApiVersion: number
):
  | OpenAPIV2.OperationObject
  | OpenAPIV3.OperationObject
  | OpenAPIV3_1.OperationObject
  | undefined => {
  if (openApiVersion < 3) {
    return (pathItemObject as OpenAPIV2.PathItemObject)[method as OpenAPIV2.HttpMethods] as
      | OpenAPIV2.OperationObject
      | undefined;
  }
  return (pathItemObject as OpenAPIV3.PathItemObject | OpenAPIV3_1.PathItemObject)[
    method as OpenAPIV3.HttpMethods
  ] as OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject | undefined;
};

export const unifyParameters = (
  pathItemObject: PathItemObject,
  operationObject:
    | OpenAPIV2.OperationObject
    | OpenAPIV3.OperationObject
    | OpenAPIV3_1.OperationObject
    | undefined
): Array<Parameter> => {
  const pathItemObjectParameters: Array<Parameter> =
    (pathItemObject?.parameters as Array<Parameter> | undefined) || [];
  const operationObjectParameters: Array<Parameter> =
    (operationObject?.parameters as Array<Parameter> | undefined) || [];
  return pathItemObjectParameters.concat(operationObjectParameters);
};

export const evaluateSecurity = (
  securityRequirements?:
    | OpenAPIV3.SecurityRequirementObject[]
    | OpenAPIV3_1.SecurityRequirementObject[],
  securitySchemes?:
    | OpenAPIV3.ComponentsObject['securitySchemes']
    | OpenAPIV3_1.ComponentsObject['securitySchemes']
): Parameter[] => {
  if (
    securityRequirements === undefined ||
    securityRequirements.length === 0 ||
    securitySchemes === undefined
  ) {
    return [];
  }

  // for now, just evaluate the first security option
  return Object.keys(securityRequirements[0]).flatMap((securityName) => {
    const securityScheme = securitySchemes?.[securityName] as
      | OpenAPIV3.SecuritySchemeObject
      | OpenAPIV3_1.SecuritySchemeObject
      | undefined;
    if (securityScheme === undefined) {
      return [];
    }
    return convertSecuritySchemeToParameters(securityScheme);
  });
};

const convertSecuritySchemeToParameters = (
  securityScheme: OpenAPIV3.SecuritySchemeObject | OpenAPIV3_1.SecuritySchemeObject
): Parameter[] => {
  switch (securityScheme.type) {
    case 'apiKey':
      if (!['header', 'query', 'cookie'].includes(securityScheme.in)) {
        return [];
      }
      return [
        {
          name: securityScheme.name,
          description: securityScheme.description,
          required: true,
          in: securityScheme.in,
          schema: {
            type: 'string',
          },
        },
      ];
    case 'http':
      const defaultDescription =
        securityScheme.scheme === 'basic'
          ? 'Basic authentication header of the form `Basic <encoded-value>`, where `<encoded-value>` is the base64-encoded string `username:password`.'
          : 'Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.';
      return [
        {
          name: 'Authorization',
          description: securityScheme.description ?? defaultDescription,
          required: true,
          in: 'header',
          schema: {
            type: 'string',
          },
        },
      ];
    case 'oauth2':
    case 'openIdConnect':
      return [];
  }
};
