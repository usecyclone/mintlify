import { useCallback, useContext, useMemo } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { MDXContentState } from '@/types/mdxContentController';
import { getParamGroupsFromApiComponents } from '@/utils/api';

export type ParamGroupsOptionsType = Partial<
  Pick<
    MDXContentState,
    'openApiPlaygroundProps' | 'apiComponents' | 'pageMetadata' | 'selectedBodyContentType'
  >
>;

export const useInitialParamGroups = (state: ParamGroupsOptionsType) => {
  const getParamGroups = useParamGroupsCallback();
  return useMemo(() => getParamGroups(state), [getParamGroups, state]);
};

export const useParamGroupsCallback = () => {
  const { mintConfig } = useContext(ConfigContext);

  return useCallback(
    (state: ParamGroupsOptionsType) => {
      const { pageMetadata, openApiPlaygroundProps, apiComponents, selectedBodyContentType } =
        state;

      const selectedApiComponentsByContentType =
        openApiPlaygroundProps?.apiComponentsByContentType?.find(({ contentType }) => {
          if (!selectedBodyContentType) {
            return true;
          }

          return contentType === selectedBodyContentType;
        });

      const selectedApiComponents = selectedApiComponentsByContentType?.apiComponents;

      const paramGroupDict = getParamGroupsFromApiComponents(
        selectedApiComponents ?? apiComponents,
        pageMetadata?.authMethod || mintConfig?.api?.auth?.method,
        mintConfig?.api?.auth?.name
      );
      const paramGroups = Object.entries(paramGroupDict).map(([groupName, params]) => {
        return {
          name: groupName,
          params,
        };
      });

      return { paramGroupDict, paramGroups };
    },
    [mintConfig?.api?.auth?.method, mintConfig?.api?.auth?.name]
  );
};
