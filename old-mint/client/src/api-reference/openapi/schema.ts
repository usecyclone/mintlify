import { OpenAPI, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

import { foldAllOfIntoSchema } from '@/openapi';
import { OpenApiFile, SchemaV3 } from '@/types/openApi';

import { getOpenApiSpecVersion } from '.';

export type OpenApiSchemaData = {
  schema: SchemaV3;
  example?: unknown;
};

export const getOpenApiSchemaData = (
  openApiSchemaMetadataStr: string,
  openApiFiles: OpenApiFile[]
): OpenApiSchemaData | undefined => {
  let schemaObj: undefined | SchemaV3 = undefined;
  let openApiSchemaExample: unknown = undefined;
  const schema = getFirstMatchingSchema(openApiSchemaMetadataStr, openApiFiles as OpenApiFile[]);
  if (schema != undefined) {
    schemaObj = schema as SchemaV3;
  }
  openApiSchemaExample = getSchemaExample(schemaObj as SchemaV3);
  const openApiSchemaData: OpenApiSchemaData | undefined = schemaObj
    ? {
        schema: schemaObj,
        example: openApiSchemaExample,
      }
    : undefined;
  return openApiSchemaData;
};

/**
 *
 * @param openApiModelStr openapi-schema metadata string
 * @param openApiFiles
 * @returns First schema that matches the openApiModelStr
 */
export const getFirstMatchingSchema = (openApiSchemaStr: string, openApiFiles: OpenApiFile[]) => {
  const openApiFile = openApiFiles.find((openApiFile) => {
    const { spec } = openApiFile;
    const schemas = getSchemas(spec);
    const schema = schemas?.[openApiSchemaStr];
    return schema != undefined;
  });
  if (openApiFile != undefined) {
    return getSchemas(openApiFile.spec)?.[openApiSchemaStr];
  }
  return undefined;
};

const getSchemas = (openApiSpec: OpenAPI.Document) => {
  const version = getOpenApiSpecVersion(openApiSpec);
  if (version < 3) return undefined;
  return (openApiSpec as OpenAPIV3.Document | OpenAPIV3_1.Document)?.components?.schemas;
};

// TODO: Replace recursivelyConstructExample with getSchemaExample
export const getSchemaExample = (schema: SchemaV3, result = {}): unknown => {
  if (schema.allOf) {
    schema = foldAllOfIntoSchema(schema);
  }
  if (schema.example) {
    return schema.example;
  }
  if (schema.properties) {
    const propertiesWithExamples: Record<string, unknown> = {};

    Object.entries(schema.properties).forEach(([propertyName, propertyValue]) => {
      propertiesWithExamples[propertyName] = getSchemaExample(propertyValue);
    });

    return { ...result, ...propertiesWithExamples };
  }
  if ((schema as OpenAPIV3.ArraySchemaObject)?.items) {
    return [getSchemaExample((schema as OpenAPIV3.ArraySchemaObject).items as SchemaV3)];
  }
  let example = null;
  if (schema.default) {
    example = schema.default;
  } else if (schema.enum && schema.enum?.length > 0) {
    example = schema.enum[0];
  } else if (schema.type) {
    example = schema.type;
  }
  return example;
};
