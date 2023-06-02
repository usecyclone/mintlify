import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';

import { ConfigContext } from '@/context/ConfigContext';

/**
 * @returns Path with a leading slash, after removing the /_sites/{subdomain} the middleware rewrites.
 */
export function useCurrentPath() {
  const router = useRouter();
  const { subdomain } = useContext(ConfigContext);
  const withoutBasePathRemoval = '/_sites/' + subdomain;
  const withBasePathRemoval = router.basePath + withoutBasePathRemoval;

  return useMemo(() => {
    if (router.asPath.startsWith(withoutBasePathRemoval)) {
      return router.asPath.substring(withoutBasePathRemoval.length).split('#')[0];
    }
    if (router.asPath.startsWith(withBasePathRemoval)) {
      return router.asPath.substring(withBasePathRemoval.length).split('#')[0];
    }

    return router.asPath.split('#')[0];
  }, [router.asPath, withBasePathRemoval, withoutBasePathRemoval]);
}
