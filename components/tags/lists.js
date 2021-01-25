import PropTypes from "prop-types";

export function Ol({ attribs, children, depth }) {
  return (
    <ol {...attribs}>
      {children}
      <style jsx>{`
        ol {
          margin: ${depth > 0 ? `0 0 0 ${20 * depth}px;` : "1em 0 1em 20px;"};
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
          margin: ${depth > 0 ? `0 0 0 ${20 * depth}px;` : "1em 0 1em 20px;"};
        }
      `}</style>
    </ul>
  );
}

export function Li({ children, checked, ...attribs }) {
  return (
    <li {...attribs}>
      {checked === true && (
        <input
          checked
          readOnly
          style={{ marginRight: "5px" }}
          type="checkbox"
        />
      )}
      {checked === false && (
        <input
          checked={false}
          readOnly
          style={{ marginRight: "5px" }}
          type="checkbox"
        />
      )}
      {children}
      <style jsx>{`
        li {
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.6;
          list-style-position: outside;
          text-align: justify;
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
