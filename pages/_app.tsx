import Layout from "components/Layout";
import "styles/globals.css";
import { DarkModeContextProvider } from "context/DarkModeContext";
import { CookiesContextProvider } from "context/CookiesContext";
import { NotificationContextProvider } from "context/NotificationContext";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import GlobalHead from "components/GlobalHead";
import { ToolTipContextProvider } from "context/ToolTipContext";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <DarkModeContextProvider>
      <ToolTipContextProvider>
        <CookiesContextProvider>
          <NotificationContextProvider>
            <GlobalHead />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationContextProvider>
        </CookiesContextProvider>
      </ToolTipContextProvider>
    </DarkModeContextProvider>
  );
}
