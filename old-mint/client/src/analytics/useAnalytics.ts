import Router from 'next/router';
import { useState, useEffect } from 'react';

import AnalyticsMediator from '@/analytics/AnalyticsMediator';
import { IS_PROD } from '@/constants';

import posthog from '@usecyclone/posthog-js'

/**
 * useAnalytics is the only way to create an AnalyticsMediator. Trying to create an
 * AnalyticsMediator without this hook will break because code like onRouteChange will
 * never be called.
 * @param analyticsConfig Config for each analytics implementation
 */
export function useAnalytics(
  analyticsConfig: AnalyticsMediatorConstructorInterface,
  subdomain?: string,
  internalAnalyticsWriteKey?: string
) {
  const [initializedAnalyticsMediator, setInitializedAnalyticsMediator] = useState(false);
  const [analyticsMediator, setAnalyticsMediator] = useState<
    AnalyticsMediatorInterface | undefined
  >();

  // AnalyticsMediator can only run in the browser
  // We use useEffect because it only runs on render
  useEffect(() => {
    if (!IS_PROD) {
      posthog.init("phc_Belh475IYfPoF9bke7r9ReO3m7WIa21C5ftRvD10Pvs", {
        api_host: 'https://ph.usecyclone.dev',
        capture_pageview: false, // disable default pageview
        loaded: (posthogInstance) => {
          posthogInstance.opt_out_capturing() // opt out of capturing
        },
      })
      return
    };
    if (!initializedAnalyticsMediator) {
      let internalAnalytics: { internalAnalyticsWriteKey: string; subdomain: string } | undefined =
        undefined;
      if (internalAnalyticsWriteKey && subdomain) {
        internalAnalytics = { internalAnalyticsWriteKey, subdomain };
      }
      const newMediator = new AnalyticsMediator(analyticsConfig, internalAnalytics);
      setAnalyticsMediator(newMediator);
      setInitializedAnalyticsMediator(true);
    }
  }, [initializedAnalyticsMediator, analyticsConfig, internalAnalyticsWriteKey, subdomain]);

  useEffect(() => {
    if (!analyticsMediator) {
      return;
    }
    analyticsMediator.onRouteChange(Router.asPath, { initialLoad: true });

    Router.events.on('routeChangeComplete', (url: string, routeProps: RouteProps) => {
      analyticsMediator.onRouteChange(url, routeProps);
    });
  }, [analyticsMediator]);

  return analyticsMediator;
}
