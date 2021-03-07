import Document, { Head, Main, NextScript, Html } from "next/document";
import { getSiteMetaData } from "../utils/helpers";

export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

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
