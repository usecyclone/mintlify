import { useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useContentWidth } from '@/hooks/useMDXContentController/useContentWidth';
import { useCurrentTableOfContentsSection } from '@/hooks/useMDXContentController/useCurrentTableOfContentsSection';
import { useInitialMDXContentContext } from '@/hooks/useMDXContentController/useInitialMDXContentContext/useInitialMDXContentContext';
import { useParamGroups } from '@/hooks/useMDXContentController/useParamGroups';
import { useReactiveApiPlayground } from '@/hooks/useMDXContentController/useReactiveApiPlayground';
import { MDXContentControllerProps } from '@/ui/MDXContentController/MDXContentController';

export type UseMDXContentControllerOptions = Omit<MDXContentControllerProps, 'children'>;

/**
 * Manages MDXContentController state.
 */
export const useMDXContentController = (options: UseMDXContentControllerOptions) => {
  const { ctx, getIsApi, getOpenApiProps } = useInitialMDXContentContext(options);
  const [state, dispatch] = ctx;

  // Gets OpenApiPlaygroundProps and dispatches state update.
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_OPEN_API_PLAYGROUND_PROPS,
      payload: getOpenApiProps(state.apiBaseIndex),
    });
  }, [dispatch, getOpenApiProps, state.apiBaseIndex]);

  // Gets isApi and dispatches state update.
  useEffect(() => {
    if (state.pageMetadata.api || state.openApiPlaygroundProps.api) {
      dispatch({
        type: MDXContentActionEnum.SET_IS_API,
        payload: getIsApi(state.pageMetadata, state.openApiPlaygroundProps),
      });
    }
  }, [dispatch, getIsApi, state.openApiPlaygroundProps, state.pageMetadata]);

  // Other hooks
  useCurrentTableOfContentsSection(ctx);
  useContentWidth(ctx);
  useParamGroups(ctx);
  useReactiveApiPlayground(ctx);

  return [state, dispatch] as MDXContentContextType;
};
