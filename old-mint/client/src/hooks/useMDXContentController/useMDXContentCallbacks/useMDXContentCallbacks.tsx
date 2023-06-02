import { ReactElement, useCallback, useContext, useMemo } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import {
  ApiPlaygroundOptionsType,
  useApiPlaygroundCallback,
} from '@/hooks/useMDXContentController/useApiPlayground';
import { useGetContentWidthCallback } from '@/hooks/useMDXContentController/useMDXContentCallbacks/useGetContentWidthCallback';
import { UseMDXContentControllerOptions } from '@/hooks/useMDXContentController/useMDXContentController';
import { ApiComponent } from '@/types/apiComponent';
import { MDXContentState } from '@/types/mdxContentController';
import { PageMetaTags } from '@/types/metadata';
import { createUserDefinedExamples } from '@/ui/MDXContentController/createUserDefinedExamples';
import {
  getOpenApiPlaygroundProps,
  OpenApiPlaygroundProps,
} from '@/ui/MDXContentController/getOpenApiPlaygroundProps';

export type MDXContentCallbacksType = {
  getIsApi: ({ api }: PageMetaTags, props: OpenApiPlaygroundProps | undefined) => boolean;
  getApiPlayground: (state: ApiPlaygroundOptionsType) => {
    generatedRequestExamples: null | ReactElement;
    api: string;
    apiPlaygroundMode: string;
  };
  createUserExamples: (ac: ApiComponent[]) => {
    requestExample: undefined | ReactElement;
    responseExample: undefined | ReactElement;
  };
  getContentWidth: (
    state: Pick<MDXContentState, 'pageMetadata' | 'responseExample' | 'requestExample' | 'isApi'>
  ) => {
    contentWidth: string;
    isWideSize: boolean;
  };
  getOpenApiProps: (baseIndex: number) => OpenApiPlaygroundProps;
};

export const useMDXContentCallbacks = ({ pageMetadata }: UseMDXContentControllerOptions) => {
  const { mintConfig, openApiFiles } = useContext(ConfigContext);
  const getOpenApiProps = useCallback(
    (baseIndex: number) =>
      getOpenApiPlaygroundProps(baseIndex, mintConfig, openApiFiles, pageMetadata.openapi),
    [mintConfig, openApiFiles, pageMetadata.openapi]
  );
  const getIsApi = useCallback(
    ({ api }: PageMetaTags, props: OpenApiPlaygroundProps | undefined) =>
      (api?.length ?? 0) > 0 || (props?.api?.length ?? 0) > 0,
    []
  );
  const createUserExamples = useCallback((ac: ApiComponent[]) => createUserDefinedExamples(ac), []);
  const getContentWidth = useGetContentWidthCallback();
  const getApiPlayground = useApiPlaygroundCallback();

  // Return callbacks, if the object is used as a dependency in other hooks, useMemo prevents infinite renders.
  return useMemo(
    () =>
      ({
        createUserExamples,
        getContentWidth,
        getApiPlayground,
        getIsApi,
        getOpenApiProps,
      } as MDXContentCallbacksType),
    [createUserExamples, getApiPlayground, getContentWidth, getIsApi, getOpenApiProps]
  );
};
