import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
