import { useContext } from "react";
import { ThemeContext } from "./Layout";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";
const ActionAnchor = ({ children, href }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
      <style jsx>{`
        a {
          color: #fff;
          background-color: ${darkMode ? colors.darkPrimary : colors.primary};
          border-color: ${darkMode ? colors.darkSeconday : colors.secondary};
          cursor: pointer;
          display: inline-block;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          user-select: none;
          border: 1px solid transparent;
          padding: 0.375rem 2rem;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: 28px;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          margin: 20px 20px 0 0;
        }
        a:not(:disabled):not(.disabled):hover {
          color: #fff;
          background-color: ${darkMode
            ? colors.darkSecondary
            : colors.secondary};
          border-color: ${darkMode ? colors.darkSecondary : colors.secondary};
          text-decoration: none;
        }
        a:not(:disabled):not(.disabled):active {
          color: #fff;
          background-color: ${darkMode ? colors.darkPrimary : colors.primary};
          border-color: ${darkMode ? colors.darkPrimary : colors.primary};
        }
        a:not(:disabled):not(.disabled):focus {
          box-shadow: 0 0 0 0.2rem rgba(181, 0, 0, 0.3);
          outline: none;
        }
      `}</style>
    </>
  );
};

ActionAnchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

export default ActionAnchor;
