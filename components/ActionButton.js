import { useContext } from "react";
import { ThemeContext } from "./Layout";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";
const ActionButton = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <button>
      {children}
      <style jsx>{`
        button {
          color: ${colors.white};
          background-color: ${darkMode ? colors.dark_primary : colors.primary};
          border-color: ${darkMode ? colors.dark_secondary : colors.secondary};
          cursor: pointer;
          display: inline-block;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          user-select: none;
          border: 1px solid transparent;
          padding: 0.375rem 2rem;
          font-family: Arial;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: 28px;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }
        button:not(:disabled):not(.disabled):hover {
          color: ${colors.white};
          background-color: ${darkMode
            ? colors.dark_secondary
            : colors.secondary};
          border-color: ${darkMode ? colors.dark_secondary : colors.secondary};
          text-decoration: none;
        }
        button:not(:disabled):not(.disabled):active {
          color: ${colors.white};
          background-color: ${darkMode ? colors.dark_primary : colors.primary};
          border-color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        button:not(:disabled):not(.disabled):focus {
          box-shadow: 0 0 0 0.2rem rgba(181, 0, 0, 0.3);
          outline: none;
        }
      `}</style>
    </button>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node,
};

export default ActionButton;
