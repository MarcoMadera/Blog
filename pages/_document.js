import Document, { Head, Main, NextScript, Html } from "next/document";
import { siteMetadata } from "site.config";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={siteMetadata.language}>
        <Head />
        <body>
          <Main />
          <div id="global" />
          <div id="notification" />
          <div id="cookiesDialog" />
          <div>
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}
