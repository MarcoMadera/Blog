import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
export const P = ({ children }) => {
  return (
    <p>
      {children}
      <style jsx>{`
        p {
          margin: 1em 0;
          line-height: 25.6px;
        }
      `}</style>
    </p>
  );
};
export const Abbr = ({ children, ...attribs }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <abbr {...attribs}>
      {children}
      <style jsx>{`
        abbr {
          text-decoration: none;
          position: relative;
        }
        abbr:after {
          content: "";
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0px;
          border-width: 0 0 2px;
          border-style: dashed;
          border-color: ${darkMode ? colors.dark_primary : colors.primary};
        }
      `}</style>
    </abbr>
  );
};
export const Kbd = ({ children, ...attribs }) => {
  return (
    <kbd {...attribs}>
      {children}
      <style jsx>{`
        kbd {
          background-color: #eee;
          font-family: monospace;
          border-radius: 3px;
          border: 1px solid #b4b4b4;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
            0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
          color: #333;
          display: inline-block;
          font-size: 0.85em;
          font-weight: 700;
          line-height: 1;
          padding: 2px 4px;
          white-space: nowrap;
        }
      `}</style>
    </kbd>
  );
};
export const Blockquote = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <blockquote>
      {children}
      <style jsx>{`
        blockquote {
          border-left: 5px solid
            ${darkMode ? colors.dark_primary : colors.primary};
          padding-left: 10px;
          margin-left: 30px;
          margin-right: 30px;
        }
        @media screen and (min-width: 0px) and (max-width: 500px) {
          blockquote {
            margin-left: 15px;
            margin-right: 15px;
          }
        }
      `}</style>
    </blockquote>
  );
};

P.propTypes = {
  children: PropTypes.node,
};
Abbr.propTypes = {
  children: PropTypes.node,
};
Kbd.propTypes = {
  children: PropTypes.node,
};
Blockquote.propTypes = {
  children: PropTypes.node,
};
