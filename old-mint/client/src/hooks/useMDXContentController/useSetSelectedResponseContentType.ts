import { useCallback } from 'react';

import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useMDXContent } from '@/hooks/useMDXContent';

export const useSetSelectedResponseContentType = () => {
  const [, dispatch] = useMDXContent();
  return useCallback(
    (x: string) =>
      dispatch({
        type: MDXContentActionEnum.SET_SELECTED_RESPONSE_CONTENT_TYPE,
        payload: x,
      }),
    [dispatch]
  );
};
