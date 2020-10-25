import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";
const Layout = ({ children }) => {
  return (
    <>
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
