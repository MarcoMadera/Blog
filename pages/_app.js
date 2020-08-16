import "../styles/globals.css";
import "katex/dist/katex.min.css";
import Layout from "../components/Layout";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
