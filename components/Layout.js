import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { colors } from "../styles/theme";

export const ThemeContext = createContext({
  darkMode: true,
});

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    if (darkMode === false) {
      localStorage.setItem("theme", "dark");
      return setDarkMode(true);
    } else {
      localStorage.setItem("theme", "light");
      return setDarkMode(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <a href="#main">Saltar al contenido</a>
      <Navbar />
      {children}
      <Footer />
      <style global jsx>{`
        body {
          background: ${darkMode ? colors.dark_background : colors.background};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
        @media print {
          body {
            color: ${colors.black};
            background: ${colors.white};
          }
        }
      `}</style>
      <style jsx>{`
        a {
          background-color: ${darkMode
            ? colors.dark_accents2
            : colors.accents2};
          box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 5px;
          color: inherit;
          display: block;
          font-size: 18px;
          left: 0px;
          margin: 0 auto;
          padding: 1rem 5rem;
          position: fixed;
          right: 0;
          transition: 0.3s ease 0s;
          text-decoration: none;
          top: -280px;
          width: fit-content;
        }
        a:focus {
          transform: translateY(300px);
        }
        @media print {
          a {
            display: none;
          }
        }
      `}</style>
    </ThemeContext.Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
