import PropTypes from "prop-types";
import styles from "./table.module.css";
export function Table({ children, ...attribs }) {
  return (
    <table className={styles.table} {...attribs}>
      {children}
    </table>
  );
}

export function Th({ children, colspan, ...attribs }) {
  return (
    <th colSpan={colspan} className={styles.th} {...attribs}>
      {children}
    </th>
  );
}

export function Td({ align, children, colspan, ...attribs }) {
  return (
    <td colSpan={colspan} className={styles.td} {...attribs}>
      {children}
      <style jsx>{`
        td {
          text-align: ${align ?? "center"};
        }
      `}</style>
    </td>
  );
}

Table.propTypes = {
  children: PropTypes.node,
};
Td.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
  colspan: PropTypes.string,
};
Th.propTypes = {
  children: PropTypes.node,
  colspan: PropTypes.string,
};
