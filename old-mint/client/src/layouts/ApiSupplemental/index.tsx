// TO DO: Add OpenApi types instead of using 'any'

/* eslint-disable @typescript-eslint/no-explicit-any */
import parse from 'html-react-parser';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { useMemo, useContext } from 'react';

import { CodeBlock } from '@/components/CodeBlock';
import { CodeGroup } from '@/components/CodeGroup';
import { ConfigContext } from '@/context/ConfigContext';
import { useMDXContent } from '@/hooks/useMDXContent';
import { foldAllOfIntoSchema, getOpenApiOperationMethodAndEndpoint } from '@/openapi';
import { generateRequestExamples } from '@/openapi/apiExampleGeneration/generateApiRequestExamples';
import { Param } from '@/utils/api';

const getFirstDefaultResponseContentType = (response: any): string | undefined => {
  return response.content ? Object.keys(response.content)[0] : undefined;
};

const getSimpleExample = (response: any, selectedResponseContentType?: string): string | void => {
  if (response?.content == null) {
    return;
  }

  const firstDefaultResponseContentType = getFirstDefaultResponseContentType(response);
  const contentType = selectedResponseContentType || firstDefaultResponseContentType;

  if (contentType == null) {
    return;
  }

  const examples = response.content[contentType]?.examples;
  if (!examples) {
    return;
  }

  return examples['example-1']?.value || examples['Example1']?.value || examples['example1']?.value;
};

// TODO: Replace with more type-safe getSchemaExample
const recursivelyConstructExample = (schema: any, result = {}): any => {
  if (schema.allOf) {
    schema = foldAllOfIntoSchema(schema);
  }
  if (schema.example) {
    return schema.example;
  }

  if (schema.properties) {
    const propertiesWithExamples: Record<string, any> = {};

    Object.entries(schema.properties).forEach(([propertyName, propertyValue]): any => {
      propertiesWithExamples[propertyName] = recursivelyConstructExample(propertyValue);
    });

    return { ...result, ...propertiesWithExamples };
  }

  if (schema.items) {
    return [recursivelyConstructExample(schema.items)];
  }

  let returnValue = null;
  if (schema.default) {
    returnValue = schema.default;
  } else if (schema.enum?.length > 0) {
    returnValue = schema.enum[0];
  } else if (schema.type) {
    returnValue = schema.type;
  }

  return returnValue;
};

const recursivelyCheckIfHasExample = (schema: any): boolean => {
  if (schema.allOf) {
    schema = foldAllOfIntoSchema(schema);
  }
  if (schema.example) {
    return true;
  }

  if (schema.properties) {
    return Object.values(schema.properties).some((propertyValue): any => {
      return recursivelyCheckIfHasExample(propertyValue);
    });
  }

  if (schema.items) {
    return recursivelyCheckIfHasExample(schema.items);
  }

  return false;
};

const generatedNestedExample = (response: any, selectedResponseContentType?: string) => {
  const firstDefaultResponseContentType = getFirstDefaultResponseContentType(response);
  const contentType = selectedResponseContentType || firstDefaultResponseContentType;

  if (
    contentType == null ||
    response?.content?.hasOwnProperty(contentType) == null ||
    response.content[contentType]?.schema == null
  ) {
    return '';
  }

  const schema = response.content[contentType].schema;
  const constructedExample = recursivelyConstructExample(schema);
  const hasExample = recursivelyCheckIfHasExample(schema);

  if (hasExample) {
    return constructedExample;
  }

  return '';
};

export type GeneratedRequestExamplesParams = {
  paramGroupDict: Record<string, Param[]>;
  apiPlaygroundInputs: Record<string, Record<string, string>>;
  apiBaseIndex: number;
  authMethod: string | undefined;
  authName: string | undefined;
  endpointStr?: string;
  selectedBodyContentType?: string;
};

// TO DO: Simplify this code. The config context is available in useApiPlaygroundCallback
// where this component is called from. We should remove the useContext dependency as take in the
// values we need as props.
export function GeneratedRequestExamples({
  paramGroupDict,
  apiPlaygroundInputs,
  apiBaseIndex,
  authMethod,
  authName,
  endpointStr,
  selectedBodyContentType,
}: GeneratedRequestExamplesParams) {
  const { mintConfig, openApiFiles } = useContext(ConfigContext);

  return generateRequestExamples(
    endpointStr,
    mintConfig?.api?.baseUrl,
    apiBaseIndex,
    paramGroupDict,
    apiPlaygroundInputs,
    authMethod,
    authName,
    openApiFiles,
    selectedBodyContentType,
    mintConfig?.api?.request?.example?.showOptionalParams
  );
}

export function OpenApiResponseExample({ openapi }: { openapi?: string }) {
  const { openApiFiles } = useContext(ConfigContext);
  const [{ selectedResponseContentType }] = useMDXContent();

  const { operation } =
    openapi != null && openApiFiles != null
      ? getOpenApiOperationMethodAndEndpoint(openapi, openApiFiles)
      : { operation: undefined };

  const exampleResponses = useMemo(() => {
    if (openapi == null) {
      return [];
    }

    if (operation?.responses != null) {
      let hasValidExample = false;
      const responseExamples = Object.entries(operation.responses)
        .sort()
        .map(([status, res]) => {
          if (res == null || (typeof res === 'object' && !('content' in res))) {
            return [status, null];
          }
          const simpleExample = getSimpleExample(res, selectedResponseContentType);
          if (simpleExample) {
            return [status, simpleExample];
          }

          return [status, generatedNestedExample(res, selectedResponseContentType)];
        })
        .map(([status, example]) => {
          let codeBody;
          if (example == null) {
            codeBody = 'This response has no body data.';
          } else if (example === '') {
            codeBody = 'This response does not have an example.';
          } else {
            hasValidExample = true;
            const stringifiedCode = JSON.stringify(example, undefined, 2);
            codeBody = parse(Prism.highlight(stringifiedCode, Prism.languages.json, 'json'));
          }
          return (
            <CodeBlock filename={status} key={status}>
              <pre className="language-json">
                <code className="language-json">{codeBody}</code>
              </pre>
            </CodeBlock>
          );
        });

      // if there are no valid examples, don't display example response window
      return hasValidExample ? responseExamples : [];
    }

    return [];
  }, [openapi, operation?.responses, selectedResponseContentType]);

  return <CodeGroup isSmallText>{exampleResponses}</CodeGroup>;
}

export const OpenApiSchemaExample = () => {
  const { apiReferenceData } = useContext(ConfigContext);
  if (apiReferenceData?.openApiSchemaData && apiReferenceData?.openApiSchemaData?.example) {
    const stringifiedExample = JSON.stringify(
      apiReferenceData?.openApiSchemaData?.example,
      null,
      2
    );
    return (
      <CodeGroup isSmallText>
        <CodeBlock filename="Example" key={`schema-example`}>
          <pre className="language-json">
            <code className="language-json">
              {parse(Prism.highlight(stringifiedExample, Prism.languages.json, 'json'))}
            </code>
          </pre>
        </CodeBlock>
      </CodeGroup>
    );
  }
  return null;
};
