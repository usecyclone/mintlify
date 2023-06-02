import { createContext } from 'react';

import { ApiReferenceData } from '@/api-reference/getRelevantApiReferenceInfo';
import { ContextDisplayNameEnum } from '@/enums/ContextDisplayNameEnum';
import { Config } from '@/types/config';
import { Groups } from '@/types/metadata';
import { OpenApiFile } from '@/types/openApi';

export type ConfigContextType = {
  mintConfig?: Config;
  navWithMetadata?: Groups;
  openApiFiles: OpenApiFile[];
  subdomain?: string;
  apiReferenceData: ApiReferenceData;
};

export const ConfigContext = createContext<ConfigContextType>({
  // TODO - add default values for all context to improve error handling
  openApiFiles: [],
  apiReferenceData: {
    isApi: false,
    isValidOpenApi: false,
  },
});
ConfigContext.displayName = ContextDisplayNameEnum.ConfigContext;
