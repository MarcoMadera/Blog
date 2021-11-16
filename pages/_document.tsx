// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Main, NextScript, Html } from "next/document";
import { ReactElement } from "react";
import { siteMetadata } from "site.config";

export default class MyDocument extends Document {
  render(): ReactElement {
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
}
