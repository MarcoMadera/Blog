import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
export const Details = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <details>
      {children}
      <style jsx>{`
        :global(summary) {
          font-weight: bold;
          margin: -0.5em -0.5em 0;
          padding: 0.5em;
        }
        details {
          border: 1px solid ${colors.accents1};
          border-radius: 4px;
          padding: 0.5em 0.5em 0;
        }
        details > summary::marker {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        details > summary::-webkit-details-marker {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        details[open] {
          padding: 0.5em;
        }
        details[open] summary {
          border-bottom: 1px solid ${colors.accents1};
          margin-bottom: 0.5em;
        }
      `}</style>
    </details>
  );
};
export const Select = ({ children, name }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <select name={name}>
      {children}
      <style jsx>{`
        select {
          background: ${darkMode ? colors.dark_background : colors.background};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          border: 1px solid ${colors.accents1};
          border-radius: 4px;
          padding: 0.5em;
        }
      `}</style>
    </select>
  );
};

Details.propTypes = {
  children: PropTypes.node,
};
Select.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};
