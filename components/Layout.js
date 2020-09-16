import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import PropTypes from "prop-types";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
