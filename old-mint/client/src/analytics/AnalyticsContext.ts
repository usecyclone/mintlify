import { createContext } from 'react';

import { ContextDisplayNameEnum } from '@/enums/ContextDisplayNameEnum';

const AnalyticsContext = createContext({
  analyticsMediator: undefined,
} as {
  analyticsMediator: AnalyticsMediatorInterface | undefined;
});
AnalyticsContext.displayName = ContextDisplayNameEnum.AnalyticsContext;

export default AnalyticsContext;
