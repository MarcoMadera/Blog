import { bool } from "prop-types";

export const Ol = (props) => {
  return (
    <ol {...props}>
      {props.children}
      <style jsx>{`
        ol {
          padding: 0;
          margin: 1rem 0;
        }
      `}</style>
    </ol>
  );
};

export const Ul = (props) => {
  return (
    <ul {...props}>
      {props.children}
      <style jsx>{`
        ul {
          padding: 0;
          margin: 1rem 0;
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
          list-style-position: outside;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 0;
          padding: 0 20px 0 0;
          margin-left: 20px;
        }
      `}</style>
    </li>
  );
};
