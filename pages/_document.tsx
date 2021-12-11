import { Head, Main, NextScript, Html } from "next/document";
import { ReactElement } from "react";
import { siteMetadata } from "site.config";

export default function Document(): ReactElement {
  return (
    <Html lang={siteMetadata.language}>
      <Head />
      <body>
        <Main />
        <div id="global" />
        <div id="notification" />
        <div id="cookiesDialog" />
        <div id="toolTip" />
        <div>
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
