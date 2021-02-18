import PropTypes from "prop-types";

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
          margin: ${depth > 0 ? `0 0 0 ${20 * depth}px` : "1em 0"};
        }
      `}</style>
    </ul>
  );
}

export function Li({ children, checked = null, ...attribs }) {
  return (
    <li {...attribs}>
      {checked === true && (
        <>
          <label>
            <input checked readOnly type="checkbox" />
          </label>
        </>
      )}
      {checked === false && (
        <>
          <label>
            <input checked={false} readOnly type="checkbox" />
          </label>
        </>
      )}
      {children}
      <style jsx>{`
        li {
          position: relative;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.6;
          display: ${checked === null ? "list-item" : "flex"};
          align-items: center;
          list-style-position: outside;
          margin-left: ${checked === null ? "20px" : "0"};
          text-align: justify;
        }
        input {
          clip: rect(0, 0, 0, 0);
          width: 0;
          height: 0;
          padding: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          top: 0;
          left: 0;
        }
        label {
          position: relative;
          display: inline-flex;
          border-radius: 3px;
          padding: 3px;
          cursor: pointer;
          width: 1rem;
          height: 1rem;
          border: 1px solid ${checked === true ? "unset" : "#cccccc4d"};
          align-items: center;
          justify-content: center;
          background-color: ${checked === true ? "#ce3a3a" : "unset"};
          margin-right: 5px;
        }
        label:focus-within,
        label:active {
          outline-style: dashed;
          outline-width: 2px;
          outline-color: #b50000;
        }
        label:after {
          position: absolute;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
          background-image: ${checked === true
            ? "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3E%3C/svg%3E\")"
            : "unset"};
          background-position-x: 50%;
          background-position-y: center;
          background-size: 50% 50%;
          background-repeat: no-repeat;
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
