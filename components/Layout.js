import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { colors } from "../styles/theme";

export const ThemeContext = createContext({ darkMode: false });

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((darkMode) => darkMode === false);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      {children}
      <Footer />
      <style global jsx>{`
        body {
          background: ${darkMode ? colors.background : "#fff"};
          color: ${darkMode ? colors.color : "#000"};
        }
      `}</style>
    </ThemeContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
