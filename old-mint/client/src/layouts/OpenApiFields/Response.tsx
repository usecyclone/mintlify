import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import React, { useMemo, useCallback, ChangeEvent, useContext } from 'react';

import { ApiReferenceData } from '@/api-reference/getRelevantApiReferenceInfo';
import { OpenApiData } from '@/api-reference/openapi';
import { Heading } from '@/components/Heading';
import { ConfigContext } from '@/context/ConfigContext';
import { useMDXContent } from '@/hooks/useMDXContent';
import { useSetSelectedResponseContentType } from '@/hooks/useMDXContentController/useSetSelectedResponseContentType';
import { foldAllOfIntoSchema } from '@/openapi';
import { Schema } from '@/types/openApi';

import ExpandableFields from './ExpandableFields';

const SUCCESS_CODE_REGEX = /^2[0-9][0-9]$/;

const Response = () => {
  const { apiReferenceData } = useContext(ConfigContext);
  const [{ selectedResponseContentType }] = useMDXContent();
  const [responseSchema, responseContentTypes] = useResponseInformation(
    apiReferenceData,
    selectedResponseContentType
  );

  const onChangeResponseContentType = useSetSelectedResponseContentType();
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => onChangeResponseContentType(e.target.value),
    [onChangeResponseContentType]
  );
  if (!responseSchema) return null;
  return (
    <>
      <div className="flex -mt-4 items-center">
        <Heading level={3} id="response" className="mb-4 mt-14 flex-1">
          Response
        </Heading>
        {responseContentTypes.length > 1 && (
          <div className="mt-4 font-mono text-sm flex items-center space-x-2.5">
            <select
              id="contentType"
              name="contentType"
              className="text-right bg-transparent focus:outline-0 cursor-pointer text-gray-600 dark:text-gray-400"
              onChange={onChange}
            >
              {responseContentTypes.map((option, i) => (
                <option key={`${option}-${i}`}>{option}</option>
              ))}
            </select>
            <svg
              width="3"
              height="24"
              viewBox="0 -9 3 24"
              className="text-gray-500 overflow-visible dark:text-gray-400 dark:group-hover:text-gray-500 rotate-90"
            >
              <path
                d="M0 0L3 3L0 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        )}
      </div>
      <ExpandableFields schema={responseSchema} />
    </>
  );
};

const useResponseInformation = (
  apiReferenceData: ApiReferenceData,
  selectedResponseContentType?: string
): [Schema | undefined, string[]] => {
  return useMemo(() => {
    if (!apiReferenceData.isValidOpenApi && apiReferenceData.openApiData == undefined) {
      return [undefined, []];
    }
    const { operationObject, version } = apiReferenceData.openApiData as OpenApiData;
    const responses = operationObject?.responses;
    if (responses === undefined) {
      return [undefined, []];
    }

    // find first success response (2XX), ordered numerically
    const firstSuccessResponse = Object.entries(responses)
      .filter(([statusCode]) => SUCCESS_CODE_REGEX.test(statusCode))
      .sort()
      .map(([_, response]) => response)[0];
    if (firstSuccessResponse === undefined) {
      return [undefined, []];
    }

    if (version < 3) {
      const response = firstSuccessResponse as OpenAPIV2.ResponseObject;
      return [response.schema, []];
    } else {
      const response = firstSuccessResponse as
        | OpenAPIV3.ResponseObject
        | OpenAPIV3_1.ResponseObject;
      if (response.content === undefined) {
        return [undefined, []];
      }

      const responseContentTypes = Object.keys(response.content);
      const targetContentType = selectedResponseContentType ?? responseContentTypes[0];
      if (targetContentType === undefined) {
        return [undefined, []];
      }

      const responseSchema = response.content[targetContentType]?.schema as
        | OpenAPIV3.SchemaObject
        | OpenAPIV3_1.SchemaObject
        | undefined;
      if (responseSchema?.allOf) {
        return [foldAllOfIntoSchema(responseSchema), responseContentTypes];
      }
      return [responseSchema, responseContentTypes];
    }
  }, [apiReferenceData, selectedResponseContentType]);
};

export default Response;
