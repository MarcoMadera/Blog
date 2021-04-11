import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";

export function Abbr({ children, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    <abbr {...attribs}>
      {children}
      <style jsx>{`
        abbr:after {
          border-color: ${darkMode ? colors.dark_primary : colors.primary};
        }
      `}</style>
      <style jsx>{`
        abbr {
          position: relative;
          text-decoration: none;
        }
        abbr:after {
          border-style: dashed;
          border-width: 0 0 2px;
          bottom: 0px;
          content: "";
          width: 100%;
          left: 0;
          position: absolute;
        }
        @media print {
          abbr:after {
            border: none;
            content: " (" attr(title) ") ";
            position: unset;
          }
        }
      `}</style>
    </abbr>
  );
}

export function Blockquote({ children }) {
  const { darkMode } = useDarkMode();

  return (
    <blockquote>
      {children}
      <style jsx>{`
        blockquote {
          border-left: 5px solid
            ${darkMode ? colors.dark_primary : colors.primary};
        }
      `}</style>
      <style jsx>{`
        blockquote {
          margin-left: 30px;
          margin-right: 30px;
          padding-left: 10px;
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
}

export function Dialog({ children, ...attr }) {
  const { darkMode } = useDarkMode();
  return (
    <dialog {...attr}>
      {children}
      <style jsx>{`
        dialog {
          border-color: ${colors.primary};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          background: ${darkMode ? colors.dark_background : colors.background};
        }
      `}</style>
      <style jsx>{`
        dialog {
          margin: 0 auto;
          padding: 10px;
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
    <kbd {...attribs}>
      {children}
      <style jsx>{`
        kbd {
          background-color: #eee;
          border: 1px solid #b4b4b4;
          border-radius: 3px;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
            0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
          color: #333;
          display: inline-block;
          font-family: monospace;
          font-size: 0.85em;
          font-weight: 700;
          line-height: 1;
          padding: 2px 4px;
          white-space: nowrap;
        }
      `}</style>
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
