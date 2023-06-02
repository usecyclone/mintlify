import { useCallback } from 'react';

import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useMDXContent } from '@/hooks/useMDXContent';

export const useSetSelectedBodyContentType = () => {
  const [, dispatch] = useMDXContent();
  return useCallback(
    (x: string) =>
      dispatch({
        type: MDXContentActionEnum.SET_SELECTED_BODY_CONTENT_TYPE,
        payload: x,
      }),
    [dispatch]
  );
};
