import { useMemo } from 'react';

import { useApiPlayground } from '@/hooks/useMDXContentController/useApiPlayground';
import { useSelectedContentType } from '@/hooks/useMDXContentController/useInitialMDXContentContext/useSelectedContentType';
import { useInitialParamGroups } from '@/hooks/useMDXContentController/useMDXContentCallbacks/useInitialParamGroups';
import { MDXContentCallbacksType } from '@/hooks/useMDXContentController/useMDXContentCallbacks/useMDXContentCallbacks';
import { UseMDXContentControllerOptions } from '@/hooks/useMDXContentController/useMDXContentController';

export const useInitialMDXContentValues = (
  options: MDXContentCallbacksType & UseMDXContentControllerOptions
) => {
  const {
    getIsApi,
    getOpenApiProps,
    apiComponents,
    createUserExamples,
    pageMetadata,
    getContentWidth,
  } = options;
  const openApiProps = useMemo(() => getOpenApiProps(0), [getOpenApiProps]);
  const isApi = useMemo(
    () => getIsApi(pageMetadata, openApiProps),
    [getIsApi, openApiProps, pageMetadata]
  );
  const examples = useMemo(
    () => createUserExamples(apiComponents),
    [apiComponents, createUserExamples]
  );
  const paramGroups = useInitialParamGroups({
    apiComponents,
    pageMetadata,
    openApiPlaygroundProps: openApiProps,
  });
  const apiPlayground = useApiPlayground({
    apiBaseIndex: 0,
    isApi,
    ...paramGroups,
    pageMetadata,
    openApiPlaygroundProps: openApiProps,
    apiPlaygroundInputs: {},
  });
  const selectedBodyContentType = useSelectedContentType(openApiProps);
  const contentWidth = useMemo(
    () =>
      getContentWidth({
        pageMetadata,
        isApi,
        ...examples,
      }),
    [examples, getContentWidth, isApi, pageMetadata]
  );

  // return values, if the object is used as dependency in other hooks, useMemo prevents infinite renders.
  return useMemo(
    () => ({
      ...options,
      openApiProps,
      paramGroups,
      isApi,
      apiPlayground,
      examples,
      selectedBodyContentType,
      contentWidth,
    }),
    [
      apiPlayground,
      contentWidth,
      examples,
      isApi,
      openApiProps,
      options,
      paramGroups,
      selectedBodyContentType,
    ]
  );
};
