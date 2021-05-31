import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";
import styles from "./text.module.css";
export function Abbr({ children, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    <abbr className={styles.abbr} {...attribs}>
      {children}
      <style jsx>{`
        abbr:after {
          border-color: ${darkMode ? colors.dark_primary : colors.primary};
        }
      `}</style>
    </abbr>
  );
}

export function Blockquote({ children }) {
  const { darkMode } = useDarkMode();

  return (
    <blockquote className={styles.blockquote}>
      {children}
      <style jsx>{`
        blockquote {
          border-left: 5px solid
            ${darkMode ? colors.dark_primary : colors.primary};
        }
      `}</style>
    </blockquote>
  );
}

export function Dialog({ children, ...attr }) {
  const { darkMode } = useDarkMode();
  return (
    <dialog className={styles.dialog} {...attr}>
      {children}
      <style jsx>{`
        dialog {
          border-color: ${colors.primary};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          background: ${darkMode ? colors.dark_background : colors.background};
        }
      `}</style>
    </dialog>
  );
}

export function Hr({ ...attr }) {
  const { darkMode } = useDarkMode();
  return (
    <>
      <hr {...attr} />
      <style jsx>{`
        hr {
          border: 1px solid ${darkMode ? "#45535d" : "#e1e8ed"};
          border-bottom: 0px;
          border-left: 0px;
          border-right: 0px;
          margin: 0.5em 0;
        }
      `}</style>
    </>
  );
}

export function Kbd({ children, ...attribs }) {
  return (
    <kbd className={styles.kbd} {...attribs}>
      {children}
    </kbd>
  );
}

export function P({ children }) {
  return (
    <p>
      {children}
      <style jsx>{`
        p {
          -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
          break-inside: avoid; /* IE 10+ */
          line-height: 25.6px;
          margin: 1em 0;
          page-break-inside: avoid; /* Firefox */
        }
      `}</style>
    </p>
  );
}

Abbr.propTypes = {
  children: PropTypes.node,
};
Blockquote.propTypes = {
  children: PropTypes.node,
};
Dialog.propTypes = {
  children: PropTypes.node,
};
Kbd.propTypes = {
  children: PropTypes.node,
};
P.propTypes = {
  children: PropTypes.node,
};
