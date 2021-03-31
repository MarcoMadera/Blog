import { colors } from "../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../hooks/useDarkMode";

export default function ActionButton({ children, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    <button {...attribs}>
      {children}
      <style jsx>{`
        button {
          background-color: ${darkMode
            ? colors.dark_secondary
            : colors.primary};
          border-color: ${darkMode ? colors.dark_secondary : colors.primary};
        }
      `}</style>
      <style jsx>{`
        button {
          border: 1px solid;
          border-radius: 28px;
          color: ${colors.white};
          cursor: pointer;
          display: inline-block;
          font-family: Arial;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 0.375rem 2rem;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          text-align: center;
          user-select: none;
          vertical-align: middle;
        }
        button:not(:disabled):not(.disabled):hover {
          background-color: ${colors.dark_tertiary};
          border-color: ${colors.dark_tertiary};
          color: ${colors.white};
          text-decoration: none;
        }
        button:not(:disabled):not(.disabled):active {
          background-color: ${colors.dark_tertiary};
          border-color: ${colors.dark_tertiary};
          color: ${colors.white};
        }
        button:not(:disabled):not(.disabled):focus {
          box-shadow: 0 0 0 0.2rem rgba(119, 60, 60, 0.3);
          outline: none;
        }
      `}</style>
    </button>
  );
}

ActionButton.propTypes = {
  children: PropTypes.node,
};
