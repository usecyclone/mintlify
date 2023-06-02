import { OpenAPIV2 } from 'openapi-types';
import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import { OpenApiData } from '@/api-reference/openapi';
import { Heading } from '@/components/Heading';
import { ParamField } from '@/components/Param';
import { ConfigContext } from '@/context/ConfigContext';
import { MarkdownComponents } from '@/layouts/OpenApiFields';
import { getParameterType } from '@/openapi/getParameterType';
import { Parameter } from '@/types/openApi';

const Parameters = () => {
  const { apiReferenceData } = useContext(ConfigContext);
  if (!apiReferenceData.isValidOpenApi && apiReferenceData.openApiData == undefined) {
    return null;
  }
  const { parameters, version } = apiReferenceData.openApiData as OpenApiData;
  if (parameters.length === 0) {
    return null;
  }
  const paramsByLocation = parameters.reduce(
    (acc, param) => {
      if (!['path', 'query', 'header', 'cookie'].includes(param.in)) {
        return acc;
      }
      acc[param.in as 'path' | 'query' | 'header' | 'cookie'].push(param);
      return acc;
    },
    {
      path: [] as Parameter[],
      query: [] as Parameter[],
      header: [] as Parameter[],
      cookie: [] as Parameter[],
    }
  );

  return (
    <>
      <ParameterGroup
        id={'header'}
        version={version}
        title="Headers"
        params={paramsByLocation.header}
      />
      <ParameterGroup
        id={'path'}
        version={version}
        title="Path Parameters"
        params={paramsByLocation.path}
      />
      <ParameterGroup
        id={'query'}
        version={version}
        title="Query Parameters"
        params={paramsByLocation.query}
      />
      <ParameterGroup
        id={'cookie'}
        version={version}
        title="Cookies"
        params={paramsByLocation.cookie}
      />
    </>
  );
};

export const ParameterGroup = ({
  id,
  title,
  version,
  params,
  showLocation,
}: {
  id: string;
  title: string;
  version: number;
  params: Parameter[];
  showLocation?: boolean;
}) => {
  if (params.length === 0) {
    return null;
  }

  return (
    <>
      <Heading level={3} id={id} className="mb-4 mt-14">
        {title}
      </Heading>
      {params.map((parameter, i) => {
        const { name, description, required, schema, in: paramType } = parameter;
        const paramName = { [paramType]: name };
        const type =
          version < 3 && schema == undefined
            ? (parameter as OpenAPIV2.ParameterObject)?.type
            : getParameterType(schema);
        return (
          <ParamField
            key={i}
            {...paramName}
            required={required}
            type={type}
            location={showLocation ? paramType : undefined}
            default={schema?.default}
            enum={schema?.enum}
          >
            <ReactMarkdown components={MarkdownComponents}>
              {description || schema?.description || schema?.title || ''}
            </ReactMarkdown>
          </ParamField>
        );
      })}
    </>
  );
};

export default Parameters;
