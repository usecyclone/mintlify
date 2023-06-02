export {};
declare global {
  interface Window {
    gtag: (str: string, eventName: string, object) => void;
  }
}
