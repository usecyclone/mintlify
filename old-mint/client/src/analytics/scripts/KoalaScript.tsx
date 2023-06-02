import Script from 'next/script';

export default function KoalaScript({ koala }: { koala?: KoalaConfigInterface }) {
  if (!koala?.publicApiKey) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        id="koala"
        dangerouslySetInnerHTML={{
          __html: `
          !(function (t) {
            if (window.ko) return;
            (window.ko = []),
              [
                "identify",
                "track",
                "removeListeners",
                "open",
                "on",
                "off",
                "qualify",
                "ready",
              ].forEach(function (t) {
                ko[t] = function () {
                  var n = [].slice.call(arguments);
                  return n.unshift(t), ko.push(n), ko;
                };
              });
            var n = document.createElement("script");
            (n.async = !0),
              n.setAttribute(
                "src",
                "https://cdn.getkoala.com/v1/${koala.publicApiKey}/sdk.js"
              ),
              (document.body || document.head).appendChild(n);
          })();
          `,
        }}
      />
    </>
  );
}
