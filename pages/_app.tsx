import Router from "next/router";
import NProgress from "nprogress";
import Layout from "components/Layout";
import "styles/globals.css";
import { DarkModeContextProvider } from "context/DarkModeContext";
import { CookiesContextProvider } from "context/CookiesContext";
import { NotificationContextProvider } from "context/NotificationContext";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import GlobalHead from "components/GlobalHead";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <DarkModeContextProvider>
      <CookiesContextProvider>
        <NotificationContextProvider>
          <GlobalHead />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationContextProvider>
      </CookiesContextProvider>
    </DarkModeContextProvider>
  );
}
