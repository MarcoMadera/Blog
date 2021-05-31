import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";
import styles from "./interactive.module.css";
export function Details({ children }) {
  const { darkMode } = useDarkMode();

  return (
    <details className={styles.details}>
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
    </details>
  );
}
export function Select({ children, name }) {
  const { darkMode } = useDarkMode();

  return (
    <select name={name} className={styles.select}>
      {children}
      <style jsx>{`
        select {
          background: ${darkMode ? colors.dark_background : colors.background};
          border: 1px solid ${colors.accents1};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
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
