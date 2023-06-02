import { useContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { useMDXContent } from '@/hooks/useMDXContent';
import { PageHeader } from '@/ui/MDXContentController/PageHeader';
import { getSectionTitle } from '@/utils/paths/getSectionTitle';

export const Header = () => {
  const { mintConfig } = useContext(ConfigContext);
  const currentPath = useCurrentPath();
  const [{ pageMetadata }] = useMDXContent();
  return (
    <PageHeader
      pageMetadata={pageMetadata}
      section={getSectionTitle(currentPath, mintConfig?.navigation ?? [])}
    />
  );
};
