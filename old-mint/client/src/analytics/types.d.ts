type RouteProps = {
  initialLoad?: boolean;
  shallow?: boolean;
};

type AmplitudeConfigInterface = {
  apiKey?: string;
};

type ClearbitConfigInterface = {
  publicApiKey?: string;
};

type FathomConfigInterface = {
  siteId?: string;
};

type GoogleAnalyticsConfigInterface = {
  measurementId?: string;
};

type GoogleTagManagerConfigInterface = {
  tagId?: string;
};

type HotjarConfigInterface = {
  hjid?: string;
  hjsv?: string;
};

type KoalaConfigInterface = {
  publicApiKey?: string;
};

type LogrocketConfigInterface = {
  appId?: string;
};

type MixpanelConfigInterface = {
  projectToken?: string;
};

type PirschConfigInterface = {
  id?: string;
};

type PostHogConfigInterface = {
  apiKey?: string;
  apiHost?: string;
};

type PlausibleConfigInterface = {
  domain?: string;
};

// We can use & instead of | because all keys are optional
type ConfigInterface = AmplitudeConfigInterface &
  ClearbitConfigInterface &
  FathomConfigInterface &
  GoogleAnalyticsConfigInterface &
  GoogleTagManagerConfigInterface &
  HotjarConfigInterface &
  KoalaConfigInterface &
  LogrocketConfigInterface &
  MixpanelConfigInterface &
  PirschConfigInterface &
  PostHogConfigInterface &
  PlausibleConfigInterface;

type AnalyticsMediatorConstructorInterface = {
  amplitude?: AmplitudeConfigInterface;
  clearbit?: ClearbitConfigInterface;
  fathom?: FathomConfigInterface;
  ga4?: GoogleAnalyticsConfigInterface;
  gtm?: GoogleTagManagerConfigInterface;
  hotjar?: HotjarConfigInterface;
  koala?: KoalaConfigInterface;
  logrocket?: LogrocketConfigInterface;
  mixpanel?: MixpanelConfigInterface;
  pirsch?: PirschConfigInterface;
  plausible?: PlausibleConfigInterface;
  posthog?: PostHogConfigInterface;
};

interface AnalyticsMediatorInterface {
  createEventListener(eventName: string): (eventConfig: object) => Promise<void>;
  onRouteChange(url: string, routeProps: RouteProps): void;
}
