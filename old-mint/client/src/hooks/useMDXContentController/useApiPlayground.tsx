import { ReactNode, useCallback, useContext, useMemo } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { GeneratedRequestExamples } from '@/layouts/ApiSupplemental';
import { MDXContentState } from '@/types/mdxContentController';

export type ApiPlaygroundOptionsType = Pick<
  MDXContentState,
  | 'isApi'
  | 'openApiPlaygroundProps'
  | 'pageMetadata'
  | 'requestExample'
  | 'paramGroupDict'
  | 'apiPlaygroundInputs'
  | 'apiBaseIndex'
  | 'selectedBodyContentType'
>;

export const useApiPlayground = (state: ApiPlaygroundOptionsType) => {
  const getApiPlayground = useApiPlaygroundCallback();
  return useMemo(() => getApiPlayground(state), [getApiPlayground, state]);
};

export const useApiPlaygroundCallback = () => {
  const { mintConfig } = useContext(ConfigContext);
  return useCallback(
    (state: ApiPlaygroundOptionsType) => {
      const {
        openApiPlaygroundProps,
        apiPlaygroundInputs,
        apiBaseIndex,
        paramGroupDict,
        requestExample,
        pageMetadata,
        selectedBodyContentType,
      } = state;

      // TODO - make this undefined when nothing exists
      const api = openApiPlaygroundProps?.api ?? pageMetadata.api ?? '';
      const apiPlaygroundMode = mintConfig?.api?.playground?.mode ?? 'show';
      const authMethod = pageMetadata.auth ?? mintConfig?.api?.auth?.method;
      const authName = mintConfig?.api?.auth?.name;
      let generatedRequestExamples: ReactNode = null;
      if (!requestExample && api !== '') {
        generatedRequestExamples = (
          <GeneratedRequestExamples
            paramGroupDict={paramGroupDict}
            apiPlaygroundInputs={apiPlaygroundInputs}
            apiBaseIndex={apiBaseIndex}
            endpointStr={api}
            authMethod={authMethod}
            authName={authName}
            selectedBodyContentType={selectedBodyContentType}
          />
        );
      }
      return { apiPlaygroundMode, api, generatedRequestExamples };
    },
    [mintConfig?.api?.auth?.method, mintConfig?.api?.auth?.name, mintConfig?.api?.playground?.mode]
  );
};
