import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useCurrentPath } from '@/hooks/useCurrentPath';

/**
 * @param hiddenPages array of paths to hide from search engines without a leading slash
 * @returns Metadata tags
 */
export const CanonicalTags = ({ hiddenPages }: { hiddenPages: string[] | undefined }) => {
  const router = useRouter();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const currentPath = useCurrentPath();
  const currentUrl = origin + router.basePath + currentPath;

  const isHidden = hiddenPages?.includes(currentPath.slice(1));

  return (
    <Head>
      <meta key="og:url" name="og:url" content={currentUrl} />
      <link rel="canonical" href={currentUrl} />
      {isHidden && <meta name="robots" content="noindex" />}
    </Head>
  );
};
