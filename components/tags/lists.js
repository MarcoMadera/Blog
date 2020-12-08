import PropTypes from "prop-types";

export const Ol = ({ attribs, children, depth }) => {
  return (
    <ol {...attribs}>
      {children}
      <style jsx>{`
        ol {
          margin: ${depth === 0 ? "1em 0;" : depth > 0 ? "0 0 0 20px;" : "0;"};
        }
      `}</style>
    </ol>
  );
};

export const Ul = ({ attribs, children, depth }) => {
  return (
    <ul {...attribs}>
      {children}
      <style jsx>{`
        ul {
          margin: ${depth === 0 ? "1em 0;" : depth > 0 ? "0 0 0 20px;" : "0;"};
        }
      `}</style>
    </ul>
  );
};

export const Li = ({ children, checked, ...attribs }) => {
  return (
    <li {...attribs}>
      {checked === true && (
        <input
          style={{ marginRight: "5px" }}
          type="checkbox"
          checked
          readOnly
        />
      )}
      {checked === false && (
        <input
          style={{ marginRight: "5px" }}
          type="checkbox"
          checked={false}
          readOnly
        />
      )}
      {children}
      <style jsx>{`
        li {
          list-style-position: inside;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.6;
          text-align: justify;
        }
      `}</style>
    </li>
  );
};

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
