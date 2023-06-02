import type { PostData, Param as PostParam } from 'har-format';
import parse from 'html-react-parser';
import HTTPSnippet from 'httpsnippet';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';

import { CodeBlock } from '@/components/CodeBlock';
import { CodeGroup } from '@/components/CodeGroup';
import { OpenApiFile } from '@/types/openApi';

import { extractBaseAndPath, extractMethodAndEndpoint, Param } from '../../utils/api';

type ExampleSnippet = {
  filename: string;
  code: string;
  prism: {
    grammar: Prism.Grammar;
    language: string;
  };
};

export function generateRequestExamples(
  endpointStr: string | undefined,
  baseUrlConfig: string[] | string | undefined,
  apiBaseIndex: number,
  params: Record<string, Param[]>,
  apiPlaygroundInputs: Record<string, Record<string, string>>,
  authMethod: string | undefined,
  authName: string | undefined,
  openApiFiles?: OpenApiFile[],
  selectedBodyContentType?: string,
  showOptionalParams?: boolean
): JSX.Element | null {
  if (endpointStr == null) {
    return null;
  }

  const { endpoint, method } = extractMethodAndEndpoint(endpointStr);

  try {
    const { base, path } = extractBaseAndPath(endpoint, apiBaseIndex, baseUrlConfig, openApiFiles);

    let url = base + path;
    const headers: { name: string; value: string }[] = [];

    if (authMethod === 'bearer') {
      headers.push({
        name: 'Authorization',
        value: `Bearer ${apiPlaygroundInputs.Authorization?.Bearer ?? '<token>'}`,
      });
    } else if (authMethod === 'basic') {
      const [username, password] = Object.values(apiPlaygroundInputs.Authorization ?? []);
      let authKey = `${username ? username : 'username'}:${password ? password : 'password'}`;
      if (username && password) {
        authKey = Buffer.from(authKey).toString('base64');
      }

      headers.push({
        name: 'Authorization',
        value: `Basic ${authKey}`,
      });
    } else {
      params.Authorization?.forEach((param) => {
        const paramValue = apiPlaygroundInputs.Authorization?.[param.name];
        if (paramValue) {
          headers.push({
            name: param.name,
            value: paramValue.toString(),
          });
        } else {
          headers.push({
            name: param.name,
            value: param.placeholder?.toString() ?? `<${param.name.toLowerCase()}>`,
          });
        }
      });
    }

    params.Header?.forEach((param) => {
      const paramValue = apiPlaygroundInputs.Header?.[param.name];
      if (paramValue) {
        headers.push({
          name: param.name,
          value: paramValue.toString(),
        });
      } else if (param.required || showOptionalParams) {
        headers.push({
          name: param.name,
          value: param.placeholder?.toString() ?? `<${param.name.toLowerCase()}>`,
        });
      }
    });

    if (apiPlaygroundInputs?.Path) {
      Object.entries(apiPlaygroundInputs.Path).map(([path, value]) => {
        url = url.replace(`{${path}}`, value);
      });
    }

    const queryString: { name: string; value: string }[] = [];

    if (apiPlaygroundInputs?.Query) {
      Object.entries(apiPlaygroundInputs.Query).map(([query, value]) => {
        if (!value) return;
        queryString.push({
          name: query,
          value: value.toString(),
        });
      });
    }

    const bodyData = apiPlaygroundInputs.Body
      ? Object.fromEntries(Object.entries(apiPlaygroundInputs.Body).filter(([_, v]) => v))
      : {};

    // populate required fields if not filled
    gatherRequiredFields(params.Body, bodyData, showOptionalParams);

    // convert body to shape accepted by HTTPSnippet
    const postData = getPostData(bodyData, selectedBodyContentType, params.Body);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const snippet = new HTTPSnippet({
      method: method || '',
      url,
      queryString,
      headers,
      postData,
    });

    const snippets: ExampleSnippet[] = [
      {
        filename: 'cURL',
        code: decodeURI(snippet.convert('shell').toString()),
        prism: {
          grammar: Prism.languages.bash,
          language: 'bash',
        },
      },
      {
        filename: 'Python',
        code: decodeURI(snippet.convert('python').toString()),
        prism: {
          grammar: Prism.languages.python,
          language: 'python',
        },
      },
      {
        filename: 'JavaScript',
        code: decodeURI(snippet.convert('javascript').toString()),
        prism: {
          grammar: Prism.languages.js,
          language: 'javascript',
        },
      },
      {
        filename: 'Node',
        code: decodeURI(snippet.convert('node').toString()),
        prism: {
          grammar: Prism.languages.js,
          language: 'javascript',
        },
      },
      {
        filename: 'Go',
        code: decodeURI(snippet.convert('go').toString()),
        prism: {
          grammar: Prism.languages.go,
          language: 'go',
        },
      },
      {
        filename: 'Java',
        code: decodeURI(snippet.convert('java').toString()),
        prism: {
          grammar: Prism.languages.java,
          language: 'java',
        },
      },
    ];

    return (
      <CodeGroup isSmallText>
        {snippets.map((snippet) => {
          return (
            <CodeBlock filename={snippet.filename} key={snippet.filename}>
              <pre className={`language-${snippet.prism.language}`}>
                <code className={`language-${snippet.prism.language}`}>
                  {parse(
                    Prism.highlight(snippet.code, snippet.prism.grammar, snippet.prism.language)
                  )}
                </code>
              </pre>
            </CodeBlock>
          );
        })}
      </CodeGroup>
    );
  } catch (e) {
    // Invalid endpoint. extractBaseAndpath will throw an error when the base URL is invalid.
    return null;
  }
}

const getPostData = (
  bodyData: any,
  selectedBodyContentType?: string,
  bodyParams?: Param[]
): PostData | undefined => {
  // if body is empty, don't display body
  if (!bodyData || Object.keys(bodyData).length <= 0) {
    return undefined;
  }

  // if body type is form data, convert to a list of form params
  if (selectedBodyContentType === 'multipart/form-data') {
    return {
      mimeType: 'multipart/form-data',
      params: Object.entries(bodyData).flatMap(([name, value]) =>
        convertToFormData(name, value, bodyParams)
      ),
    };
  }

  return {
    mimeType: 'application/json',
    text: JSON.stringify(bodyData, undefined, 2),
  };
};

const convertToFormData = (name: string, value: any, bodyParams?: Param[]): PostParam[] => {
  if (value instanceof FileList) {
    const paramType = bodyParams?.find(({ name: paramName }) => paramName === name)?.type;

    if (paramType === 'file') {
      // form data should be a single filename
      return [{ name, fileName: value[0]?.name }];
    } else if (paramType === 'array') {
      // form data should be an array of filenames, indicated with "[]" in field name
      const paramName = name.endsWith('[]') ? name : `${name}[]`;

      // FileList has no .map() function, must iterate
      const params: PostParam[] = [];
      for (let i = 0; i < value.length; i++) {
        const fileName = value.item(i)?.name;
        params.push({
          name: paramName,
          fileName,
        });
      }

      return params;
    }
  }
  return [
    {
      name,
      value: typeof value === 'object' ? JSON.stringify(value, undefined, 2) : value?.toString?.(),
    },
  ];
};

const gatherRequiredFields = (
  properties: Param[] | undefined,
  bodyData: any = {},
  showOptionalParams?: boolean
) => {
  properties?.forEach((param) => {
    if (!param.required && !showOptionalParams) {
      return;
    }

    if (param.type === 'object') {
      if (!(param.name in bodyData)) {
        // if this is an object with no defined properties, use the supplied example if it exists
        if (param.properties === undefined || param.properties.length === 0) {
          bodyData[param.name] = typeof param.example === 'object' ? param.example : {};
          return;
        }

        bodyData[param.name] = {};
      }
      gatherRequiredFields(param.properties, bodyData[param.name], showOptionalParams);
      return;
    }

    if (param.name in bodyData) {
      return;
    }

    if (param.example) {
      bodyData[param.name] = param.example;
      return;
    }

    if (param.items?.type === 'object') {
      const arrayObjectData = {};
      gatherRequiredFields(param.properties, arrayObjectData, showOptionalParams);
      bodyData[param.name] = [arrayObjectData];
      return;
    }

    switch (param.type) {
      case 'array':
        bodyData[param.name] = [];
        break;
      case 'boolean':
        bodyData[param.name] = false;
        break;
      case 'number':
      case 'integer':
        bodyData[param.name] = 0;
        break;
      case 'string':
      default:
        bodyData[param.name] = `<${param.name.toLowerCase()}>`;
        break;
    }
  });
};
