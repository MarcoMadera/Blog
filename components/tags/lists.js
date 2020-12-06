import { PropTypes } from "prop-types";

export const Ol = ({ attribs, children }) => {
  return (
    <ol {...attribs}>
      {children}
      <style jsx>{`
        ol {
          margin: 0.5em 0;
        }
        ol :global(ol),
        ol :global(ul) {
          margin: 0;
        }
        ol :global(li) {
          margin-left: 20px;
        }
      `}</style>
    </ol>
  );
};

export const Ul = ({ attribs, children }) => {
  return (
    <ul {...attribs}>
      {children}
      <style jsx>{`
        ul {
          margin: 0.5em 0;
        }
        ul :global(ol),
        ul :global(ul) {
          margin: 0;
        }
        ul :global(li) {
          margin-left: 20px;
        }
      `}</style>
    </ul>
  );
};

export const Li = ({ children, checked }) => {
  return (
    <li>
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
        }
      `}</style>
    </li>
  );
};
