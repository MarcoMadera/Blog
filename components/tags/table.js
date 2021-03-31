import PropTypes from "prop-types";

export function Table({ children, ...attribs }) {
  return (
    <table {...attribs}>
      {children}
      <style jsx>{`
        table {
          border-collapse: collapse;
          display: block;
          margin: 5px auto;
          max-width: 100%;
          overflow: auto;
          width: max-content;
        }
      `}</style>
    </table>
  );
}

export function Th({ children, colspan, ...attribs }) {
  return (
    <th colSpan={colspan} {...attribs}>
      {children}
      <style jsx>{`
        th {
          border: 1px solid #aaa;
          empty-cells: hide;
          font-weight: 700;
          padding: 5px 11px;
          text-align: center;
        }
      `}</style>
    </th>
  );
}

export function Td({ align, children, colspan, ...attribs }) {
  return (
    <td colSpan={colspan} {...attribs}>
      {children}
      <style jsx>{`
        td {
          text-align: ${align ?? "center"};
        }
      `}</style>
      <style jsx>{`
        td {
          border: 1px solid #aaa;
          empty-cells: hide;
          font-weight: normal;
          padding: 5px 11px;
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
