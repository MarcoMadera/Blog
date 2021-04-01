import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import "../styles/globals.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { siteMetadata } from "../site.config";
import { DarkModeContextProvider } from "../context/DarkModeContext";
import { CookiesContextProvider } from "../context/CookiesContext";
import { NotificationContextProvider } from "../context/NotificationContext";
export default function App({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <DarkModeContextProvider>
      <CookiesContextProvider>
        <NotificationContextProvider>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link
              rel="preconnect dns-prefetch"
              href="https://www.google-analytics.com"
            />
            <link
              rel="preconnect dns-prefetch"
              href="https://res.cloudinary.com"
            />
            <link
              rel="preload"
              as="image"
              href="https://marcomadera.com/favicon-48x48.png"
            />
            <link
              rel="manifest"
              href={`${siteMetadata.siteUrl}/manifest.json`}
            />
            <link
              rel="icon"
              type="image/png"
              href={`${siteMetadata.siteUrl}/favicon-32x32.png`}
            />
            <link
              rel="apple-touch-icon"
              href={`${siteMetadata.siteUrl}/favicon-32x32.png`}
            />
            <link
              rel="sitemap"
              type="application/xml"
              title="Sitemap"
              href={`${siteMetadata.siteUrl}/sitemap.xml`}
            />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationContextProvider>
      </CookiesContextProvider>
    </DarkModeContextProvider>
  );
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
