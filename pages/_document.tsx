import { Head, Main, NextScript, Html } from "next/document";
import { ReactElement } from "react";
import { siteMetadata } from "site.config";

export default function Document(): ReactElement {
  return (
    <Html lang={siteMetadata.language}>
      <Head>
        <link
          rel="preload"
          as="font"
          href="/fonts/Matter-Medium.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/Matter-Regular.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/Matter-Medium.woff"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/Matter-Regular.woff"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `@font-face {
              font-display: swap;
              font-family: Matter;
              font-style: normal;
              font-weight: 500;
              src: url(/fonts/Matter-Medium.woff2) format("woff2"),
                url(/fonts/Matter-Medium.woff) format("woff");
            }
            @font-face {
              font-display: swap;
              font-family: Matter;
              font-style: normal;
              font-weight: 400;
              src: url(/fonts/Matter-Regular.woff2) format("woff2"),
                url(/fonts/Matter-Regular.woff) format("woff");
            }`,
          }}
        ></style>
      </Head>
      <body>
        <Main />
        <div id="global" />
        <div id="notification" />
        <div id="cookiesDialog" />
        <div id="toolTip" />
        <div id="notes" />
        <div>
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
