import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import React, { useContext, useMemo } from 'react';

import { OpenApiData } from '@/api-reference/openapi';
import { Heading } from '@/components/Heading';
import { ConfigContext } from '@/context/ConfigContext';
import { useMDXContent } from '@/hooks/useMDXContent';
import { foldAllOfIntoSchema } from '@/openapi';

import ExpandableFields from './ExpandableFields';

const Body = () => {
  const { apiReferenceData } = useContext(ConfigContext);

  const [{ selectedBodyContentType }] = useMDXContent();

  const bodySchema = useMemo(() => {
    if (!apiReferenceData.isValidOpenApi && apiReferenceData.openApiData == undefined) {
      return;
    }
    const { operationObject, version } = apiReferenceData.openApiData as OpenApiData;
    if (version < 3) {
      return;
    }
    const operationObject3 = operationObject as
      | OpenAPIV3_1.OperationObject
      | OpenAPIV3.OperationObject;
    const bodyContent = (
      operationObject3?.requestBody as OpenAPIV3.RequestBodyObject | OpenAPIV3_1.RequestBodyObject
    )?.content;
    const contentType = selectedBodyContentType || (bodyContent && Object.keys(bodyContent)[0]);
    if (!contentType) return;
    const bs =
      bodyContent &&
      (bodyContent[contentType]?.schema as OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject);
    if (bs?.allOf) {
      return foldAllOfIntoSchema(bs);
    }
    return bs;
  }, [selectedBodyContentType, apiReferenceData]);
  if (!apiReferenceData.isValidOpenApi && apiReferenceData.openApiData == undefined) {
    return null;
  }
  if (
    bodySchema?.properties === undefined &&
    bodySchema?.anyOf === undefined &&
    bodySchema?.oneOf === undefined
  )
    return null;

  return (
    <>
      <Heading level={3} id="body" className="mb-4 mt-14">
        Body
      </Heading>
      <ExpandableFields schema={bodySchema} />
    </>
  );
};

export default Body;
