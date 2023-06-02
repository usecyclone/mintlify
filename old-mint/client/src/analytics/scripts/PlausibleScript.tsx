import Script from 'next/script';

export default function PlausibleScript({ plausible }: { plausible?: PlausibleConfigInterface }) {
  if (!plausible?.domain) {
    return null;
  }

  return (
    <Script
      strategy="afterInteractive"
      data-domain={plausible.domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
