import PropTypes from "prop-types";
import styles from "./headers.module.css";
export function H1({ children, ...attribs }) {
  return (
    <h1 {...attribs} className={styles.h1}>
      {children}
    </h1>
  );
}

export function H2({ children, ...attribs }) {
  return (
    <h2 {...attribs} className={styles.h2}>
      {children}
    </h2>
  );
}

export function H3({ children, ...attribs }) {
  return (
    <h3 {...attribs} className={styles.h3}>
      {children}
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
