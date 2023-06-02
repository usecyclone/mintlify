import { useMemo } from 'react';

import { useMDXContentReducer } from '@/context/MDXContentContext';
import { useInitialMDXContentValues } from '@/hooks/useMDXContentController/useInitialMDXContentContext/useInitialMDXContentValues';
import { useMDXContentCallbacks } from '@/hooks/useMDXContentController/useMDXContentCallbacks/useMDXContentCallbacks';
import { UseMDXContentControllerOptions } from '@/hooks/useMDXContentController/useMDXContentController';

export const useInitialMDXContentContext = (options: UseMDXContentControllerOptions) => {
  const { tableOfContents, pageMetadata, apiComponents } = options;

  // Get callbacks
  const callbacks = useMDXContentCallbacks(options);

  // Get initial values.
  const {
    examples,
    openApiProps,
    contentWidth,
    selectedBodyContentType,
    paramGroups,
    isApi,
    apiPlayground,
  } = useInitialMDXContentValues({
    ...options,
    ...callbacks,
  });

  // Set initial values.
  const ctx = useMDXContentReducer({
    tableOfContents,
    pageMetadata,
    apiComponents,
    isApi,
    selectedBodyContentType,
    ...examples,
    ...openApiProps,
    ...contentWidth,
    ...paramGroups,
    ...apiPlayground,
  });

  // Return context and callbacks for usage in hooks that depend on the context/state.
  // If the object is used as dependency in other hooks, useMemo prevents infinite renders.
  return useMemo(
    () => ({
      ctx,
      ...callbacks,
    }),
    [callbacks, ctx]
  );
};
