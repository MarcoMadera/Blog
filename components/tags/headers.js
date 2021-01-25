import PropTypes from "prop-types";

export function H1({ children, ...attribs }) {
  return (
    <h1 {...attribs}>
      {children}
      <style jsx>{`
        h1 {
          margin: 0;
          font-size: 2em;
          font-weight: 600;
        }
      `}</style>
    </h1>
  );
}

export function H2({ children, ...attribs }) {
  return (
    <h2 {...attribs}>
      {children}
      <style jsx>{`
        h2 {
          margin: 0;
          font-size: 1.5em;
          font-weight: 600;
        }
      `}</style>
    </h2>
  );
}

export function H3({ children, ...attribs }) {
  return (
    <h3 {...attribs}>
      {children}
      <style jsx>{`
        h3 {
          margin: 0;
          font-size: 1.1em;
          font-weight: 600;
        }
      `}</style>
    </h3>
  );
}

H1.propTypes = {
  children: PropTypes.node,
};
H2.propTypes = {
  children: PropTypes.node,
};
H3.propTypes = {
  children: PropTypes.node,
};
