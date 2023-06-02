import Script from 'next/script';

export default function FrontChatScript({ frontchat }: { frontchat?: string }) {
  if (!frontchat) {
    return null;
  }

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="https://chat-assets.frontapp.com/v1/chat.bundle.js"
      />
      <Script
        id="frontchat"
        strategy="afterInteractive"
      >{`window.FrontChat('init', {chatId: '${frontchat}', useDefaultLauncher: true});`}</Script>
    </>
  );
}
