import { ApiInputValue } from '@mintlify/components/dist/Api/types';
import axios from 'axios';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext, useMemo, useCallback } from 'react';

import { ApiPlayground as GenericApiPlayground, RequestPathHeader } from '@/components/Api';
import { RequestMethods } from '@/components/Api/types';
import { ConfigContext } from '@/context/ConfigContext';
import { Event } from '@/enums/events';
import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';
import { useMDXContent } from '@/hooks/useMDXContent';
import { useSetApiBaseIndexCallback } from '@/hooks/useMDXContentController/useMDXContentCallbacks/useSetApiBaseIndexCallback';
import { useSetApiPlaygroundInputsCallback } from '@/hooks/useMDXContentController/useMDXContentCallbacks/useSetApiPlaygroundInputsCallback';
import { getAuthParamName } from '@/openapi/apiExampleGeneration/getAuthParamName';
import { jsonSyntaxHighlight } from '@/pages/api/utils';
import { ApiComponent as ApiComponentType } from '@/types/apiComponent';
import { extractBaseAndPath, extractMethodAndEndpoint, getApiContext } from '@/utils/api';

export type ApiComponent = ApiComponentType & {
  contentType?: string;
  name?: string;
  attributes?: {
    type: string;
    name: string;
    value: string;
  }[];
};

export const APIBASE_CONFIG_STORAGE = 'apiBaseIndex';

export function ApiPlayground() {
  const { basePath } = useRouter();
  const { mintConfig, openApiFiles } = useContext(ConfigContext);
  const [apiBaseIndex, setApiBaseIndex] = useState(0);
  const trackApiPlaygroundCall = useAnalyticsContext(Event.APIPlaygroundCall);

  const [
    {
      apiPlaygroundMode,
      openApiPlaygroundProps,
      pageMetadata,
      api,
      paramGroups,
      selectedBodyContentType,
    },
  ] = useMDXContent();

  const contentType = selectedBodyContentType ?? pageMetadata.contentType;
  const onApiBaseIndexChange = useSetApiBaseIndexCallback();
  const onInputDataChange = useSetApiPlaygroundInputsCallback();

  const { method, endpoint } = extractMethodAndEndpoint(api);

  const { base: apiBase, path } = useMemo(() => {
    try {
      const extracted = extractBaseAndPath(
        endpoint,
        apiBaseIndex,
        mintConfig?.api?.baseUrl,
        openApiFiles
      );
      return { base: extracted.base, path: extracted.path };
    } catch (e) {
      // Invalid URL. Keep the default empty strings.
    }
    return { base: '', path: '' };
  }, [apiBaseIndex, endpoint, mintConfig?.api?.baseUrl, openApiFiles]);

  const [isSendingRequest, setIsSendingResponse] = useState<boolean>(false);
  const authParamName = getAuthParamName(
    mintConfig?.api?.auth?.name,
    mintConfig?.api?.auth?.method
  );
  const setAuthPrefix = mintConfig?.api?.auth?.inputPrefix && authParamName;
  const [inputData, setInputData] = useState<Record<string, Record<string, ApiInputValue>>>(
    setAuthPrefix
      ? {
          Authorization: {
            [authParamName]: mintConfig.api?.auth?.inputPrefix ?? '',
          },
        }
      : {}
  );
  const [apiResponse, setApiResponse] = useState<string>();

  useEffect(() => {
    const configuredApiBaseIndex = window.localStorage.getItem(APIBASE_CONFIG_STORAGE);
    if (configuredApiBaseIndex != null) {
      const storedApiBaseIndex = parseInt(configuredApiBaseIndex, 10);
      setApiBaseIndex(storedApiBaseIndex);
      if (onApiBaseIndexChange) {
        onApiBaseIndexChange(storedApiBaseIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const onChangeApiBaseSelection = useCallback(
    (base: string) => {
      if (mintConfig?.api == null || !Array.isArray(mintConfig.api?.baseUrl)) {
        return;
      }
      const index = mintConfig.api.baseUrl.indexOf(base);
      if (index >= 0) {
        window.localStorage.setItem(APIBASE_CONFIG_STORAGE, index.toString());
        setApiBaseIndex(index);
        onApiBaseIndexChange?.(index);
      }
    },
    [mintConfig?.api, onApiBaseIndexChange]
  );

  const makeApiRequest = useCallback(async () => {
    setIsSendingResponse(true);
    const apiContext = getApiContext(apiBase, path, inputData, contentType, mintConfig?.api);
    let response = undefined;
    let highlightedJson = undefined;
    if (apiContext.formData && method === 'POST') {
      const { url, formData, headers } = apiContext;
      try {
        response = (
          await axios.post(url, formData, {
            headers,
          })
        ).data;
        if (response) {
          highlightedJson = jsonSyntaxHighlight(response);
        }
      } catch (error: any) {
        const response = error.response;
        if (response.data) {
          highlightedJson = jsonSyntaxHighlight(response.data);
        }
      } finally {
        setIsSendingResponse(false);
      }
    } else {
      try {
        const { data } = await axios.post(`${basePath || ''}/api/request`, {
          method,
          ...apiContext,
        });

        if (data.response) {
          response = data.response;
        }

        if (data.highlightedJson) {
          highlightedJson = data.highlightedJson;
        }
      } catch (error: any) {
        if (error?.highlightedJson) {
          highlightedJson = error.highlightedJson;
        }
      } finally {
        setIsSendingResponse(false);
      }
    }
    trackApiPlaygroundCall({
      request: {
        method,
        ...apiContext,
      },
      response,
    }).catch(console.error);
    if (highlightedJson) {
      setApiResponse(highlightedJson);
    }
  }, [
    apiBase,
    basePath,
    contentType,
    inputData,
    method,
    mintConfig?.api,
    path,
    trackApiPlaygroundCall,
  ]);

  const contentTypeOptions = useMemo(
    () => openApiPlaygroundProps.apiComponentsByContentType?.map(({ contentType }) => contentType),
    [openApiPlaygroundProps.apiComponentsByContentType]
  );

  if (!method) {
    return <p>Missing request method in API definition.</p>;
  }

  return (
    <GenericApiPlayground
      method={method as RequestMethods}
      paramGroups={paramGroups}
      paramValues={inputData}
      isSendingRequest={isSendingRequest}
      onChangeParamValues={(newInputs) => {
        setInputData(newInputs);
        if (onInputDataChange) {
          onInputDataChange(newInputs);
        }
      }}
      onSendRequest={makeApiRequest}
      hideUserInteractivity={apiPlaygroundMode === 'simple'}
      header={
        <RequestPathHeader
          method={method as RequestMethods}
          baseUrls={Array.isArray(mintConfig?.api?.baseUrl) ? mintConfig?.api?.baseUrl : undefined}
          defaultBaseUrl={
            Array.isArray(mintConfig?.api?.baseUrl) ? mintConfig?.api?.baseUrl[0] : undefined
          }
          onBaseUrlChange={onChangeApiBaseSelection}
          path={path}
          contentTypeOptions={contentTypeOptions}
        />
      }
      response={
        apiResponse ? (
          <div className="p-4 max-h-60 whitespace-pre overflow-scroll border-t border-gray-200 dark:border-gray-700  dark:text-gray-300 font-mono text-xs leading-5">
            <span className="language-json max-h-72 overflow-scroll">{parse(apiResponse)}</span>
          </div>
        ) : undefined
      }
    />
  );
}
