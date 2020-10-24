import { useRouter } from "next/router";
import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import "../styles/globals.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    // update page url minimal google analytics
    const handleRouteChange = () => {
      window.ma.trackEvent("Category", "Action", "Label", "Value");
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    // Reset focus on page change
    Router.events.on("routeChangeStart", () => {
      document.body.setAttribute("tabIndex", "-1");
    });

    document.body.addEventListener("blur", () => {
      document.body.removeAttribute("tabIndex");
    });
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default App;
