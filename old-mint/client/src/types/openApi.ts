import { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

export type OpenApiFile = {
  filename: string;
  spec: OpenAPI.Document;
};

export type PathItemObject =
  | OpenAPIV2.PathItemObject
  | OpenAPIV3.PathItemObject
  | OpenAPIV3_1.PathItemObject;

export type OperationObject =
  | OpenAPIV2.OperationObject
  | OpenAPIV3.OperationObject
  | OpenAPIV3_1.OperationObject;

export type Parameter = OpenAPIV2.Parameter | OpenAPIV3.ParameterObject;
export type Response =
  | OpenAPIV2.ResponseObject
  | OpenAPIV3.ResponseObject
  | OpenAPIV3_1.ResponseObject;

export type Schema = OpenAPIV2.SchemaObject | OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;

export type SchemaV3 = OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;
