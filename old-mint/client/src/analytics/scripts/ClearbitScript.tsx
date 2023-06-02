import Script from 'next/script';

export default function ClearbitScript({ clearbit }: { clearbit?: ClearbitConfigInterface }) {
  if (!clearbit?.publicApiKey) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://tag.clearbitscripts.com/v1/${clearbit.publicApiKey}/tags.js`}
      />
    </>
  );
}
