import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";

export function Details({ children }) {
  const { darkMode } = useDarkMode();

  return (
    <details>
      {children}
      <style jsx>{`
        details {
          border: 1px solid ${colors.accents1};
        }
        details > summary::marker {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        details > summary::-webkit-details-marker {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        details[open] summary {
          border-bottom: 1px solid ${colors.accents1};
        }
      `}</style>
      <style jsx>{`
        :global(summary) {
          font-weight: bold;
          margin: -0.5em -0.5em 0;
          padding: 0.5em;
        }
        details {
          border-radius: 4px;
          padding: 0.5em 0.5em 0;
        }

        details[open] {
          padding: 0.5em;
        }
        details[open] summary {
          margin-bottom: 0.5em;
        }
      `}</style>
    </details>
  );
}
export function Select({ children, name }) {
  const { darkMode } = useDarkMode();

  return (
    <select name={name}>
      {children}
      <style jsx>{`
        select {
          background: ${darkMode ? colors.dark_background : colors.background};
          border: 1px solid ${colors.accents1};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
      `}</style>
      <style jsx>{`
        select {
          border-radius: 4px;
          padding: 0.5em;
        }
      `}</style>
    </select>
  );
}

Details.propTypes = {
  children: PropTypes.node,
};
Select.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};
