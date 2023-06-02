import { useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useParamGroupsCallback } from '@/hooks/useMDXContentController/useMDXContentCallbacks/useInitialParamGroups';

export const useParamGroups = (ctx: MDXContentContextType) => {
  const [state, dispatch] = ctx;
  const getParamGroups = useParamGroupsCallback();

  const { openApiPlaygroundProps, selectedBodyContentType, pageMetadata, apiComponents } = state;

  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_PARAM_GROUPS,
      payload: getParamGroups({
        openApiPlaygroundProps,
        selectedBodyContentType,
        pageMetadata,
        apiComponents,
      }),
    });
  }, [
    apiComponents,
    dispatch,
    getParamGroups,
    openApiPlaygroundProps,
    pageMetadata,
    selectedBodyContentType,
  ]);
};
