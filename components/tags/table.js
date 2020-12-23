import PropTypes from "prop-types";

export const Table = ({ children, ...attribs }) => {
  return (
    <table {...attribs}>
      {children}
      <style jsx>{`
        table {
          margin: 5px auto;
          border-collapse: collapse;
          display: block;
          width: max-content;
          max-width: 100%;
          overflow: auto;
        }
      `}</style>
    </table>
  );
};

export const Th = ({ children, colspan, ...attribs }) => {
  return (
    <th colSpan={colspan} {...attribs}>
      {children}
      <style jsx>{`
        th {
          text-align: center;
          empty-cells: hide;
          border: 1px solid #aaa;
          font-weight: 700;
          padding: 5px 11px;
        }
      `}</style>
    </th>
  );
};

export const Td = ({ align, children, colspan, ...attribs }) => {
  return (
    <td colSpan={colspan} {...attribs}>
      {children}
      <style jsx>{`
        td {
          text-align: ${align ?? "center"};
          empty-cells: hide;
          border: 1px solid #aaa;
          font-weight: normal;
          padding: 5px 11px;
        }
      `}</style>
    </td>
  );
};

Table.propTypes = {
  children: PropTypes.node,
};
Th.propTypes = {
  children: PropTypes.node,
  colspan: PropTypes.string,
};
Td.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
  colspan: PropTypes.string,
};
