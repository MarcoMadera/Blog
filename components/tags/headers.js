import PropTypes from "prop-types";

export const H1 = ({ children, ...attribs }) => {
  return (
    <h1 {...attribs}>
      {children}
      <style jsx>{`
        h1 {
          font-size: 2em;
          margin: 0;
          font-weight: 600;
        }
      `}</style>
    </h1>
  );
};
export const H2 = ({ children, ...attribs }) => {
  return (
    <h2 {...attribs}>
      {children}
      <style jsx>{`
        h2 {
          font-size: 1.5em;
          margin: 0;
          font-weight: 600;
        }
      `}</style>
    </h2>
  );
};
export const H3 = ({ children, ...attribs }) => {
  return (
    <h3 {...attribs}>
      {children}
      <style jsx>{`
        h3 {
          font-size: 1.1em;
          margin: 0;
          font-weight: 600;
        }
      `}</style>
    </h3>
  );
};

H1.propTypes = {
  children: PropTypes.node,
};
H2.propTypes = {
  children: PropTypes.node,
};
H3.propTypes = {
  children: PropTypes.node,
};
