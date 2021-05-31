import PropTypes from "prop-types";
import styles from "./lists.module.css";
export function Ol({ attribs, children, depth }) {
  return (
    <ol {...attribs}>
      {children}
      <style jsx>{`
        ol {
          margin: ${depth > 0 ? `0 0 0 ${20 * depth}px` : "1em 0"};
        }
      `}</style>
    </ol>
  );
}

export function Ul({ attribs, children, depth }) {
  return (
    <ul {...attribs}>
      {children}
      <style jsx>{`
        ul {
          margin: ${depth > 0 ? "0 0 0 20px" : "1em 0"};
        }
      `}</style>
    </ul>
  );
}

export function Li({ children, checked = null, ...attribs }) {
  return (
    <li {...attribs} className={styles.li}>
      {checked === true && (
        <label>
          <input checked readOnly type="checkbox" />
        </label>
      )}
      {checked === false && (
        <label>
          <input checked={false} readOnly type="checkbox" />
        </label>
      )}
      {children}
      <style jsx>{`
        li {
          margin-left: ${checked === null ? "20px" : "0"};
          margin-top: ${checked === null ? "5px" : "0"};
          list-style-type: ${checked === null ? "revert" : "none"};
        }
        label {
          background-color: ${checked === true ? "#ce3a3a" : "unset"};
          border: 1px solid ${checked === true ? "unset" : "#cccccc4d"};
        }
        label:after {
          background-image: ${checked === true
            ? "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3E%3C/svg%3E\")"
            : "unset"};
        }
      `}</style>
    </li>
  );
}

Ol.propTypes = {
  attribs: PropTypes.object,
  children: PropTypes.node,
  depth: PropTypes.number,
};
Ul.propTypes = {
  attribs: PropTypes.object,
  children: PropTypes.node,
  depth: PropTypes.number,
};
Li.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
};
