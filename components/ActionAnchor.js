import { useContext } from "react";
import { ThemeContext } from "./Layout";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";

export default function ActionAnchor({ children, href, ...attribs }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <a href={href} rel="noopener noreferrer" target="_blank" {...attribs}>
        {children}
      </a>
      <style jsx>{`
        a {
          background-color: ${darkMode
            ? colors.dark_secondary
            : colors.primary};
          border: 1px solid transparent;
          border-color: ${darkMode ? colors.dark_secondary : colors.primary};
          border-radius: 28px;
          color: ${colors.white};
          cursor: pointer;
          display: inline-block;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 0.375rem 2rem;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          text-align: center;
          text-decoration: none;
          user-select: none;
          vertical-align: middle;
        }
        a:not(:disabled):not(.disabled):hover {
          background-color: ${colors.dark_tertiary};
          border-color: ${colors.dark_tertiary};
          color: ${colors.white};
          text-decoration: none;
        }
        a:not(:disabled):not(.disabled):active {
          background-color: ${colors.dark_tertiary};
          border-color: ${colors.dark_tertiary};
          color: ${colors.white};
        }
        a:not(:disabled):not(.disabled):focus {
          box-shadow: 0 0 0 0.2rem rgba(181, 0, 0, 0.3);
          outline: none;
        }
      `}</style>
    </>
  );
}

ActionAnchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};