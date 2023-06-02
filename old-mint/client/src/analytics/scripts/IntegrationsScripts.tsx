import { useContext } from 'react';

import { IS_PROD } from '@/constants';
import { ConfigContext } from '@/context/ConfigContext';

import FrontChatScript from './FrontChatScript';

const IntegrationsScripts = () => {
  const { mintConfig } = useContext(ConfigContext);
  if (!IS_PROD) return null;
  return (
    <>
      <FrontChatScript frontchat={mintConfig?.integrations?.frontchat} />
    </>
  );
};

export default IntegrationsScripts;
