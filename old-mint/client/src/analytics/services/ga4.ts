import { AnalyticsService } from '@/analytics/AnalyticsService';

// GA4 setup happens by placing GA4Script.
// This implementation only exists to send custom events using window.gtag.
export default class GA4Analytics extends AnalyticsService {
  measurementId: string | undefined;

  init(implementationConfig: ConfigInterface) {
    this.measurementId = implementationConfig.measurementId;
  }

  createEventListener(eventName: string) {
    if (this.measurementId && window.gtag) {
      return async function capture(_: object) {
        window.gtag('event', eventName, {});
      };
    }
    return async function doNothing(_: object) {
      return;
    };
  }

  onRouteChange(url: string): void {
    if (this.measurementId && window.gtag) {
      window.gtag('config', this.measurementId, {
        page_path: url,
      });
    }
  }
}
