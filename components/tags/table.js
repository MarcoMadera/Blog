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

export const Th = ({ children, ...attribs }) => {
  return (
    <th {...attribs}>
      {children}
      <style jsx>{`
        th {
          text-align: center;
          empty-cells: hide;
          border: 1px solid #aaa;
          font-weight: bold;
          padding: 5px 11px;
        }
      `}</style>
    </th>
  );
};

export const Td = ({ align, children, ...attribs }) => {
  return (
    <td {...attribs}>
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
