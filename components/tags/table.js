export const Table = (props) => {
  return (
    <table {...props}>
      {props.children}
      <style jsx>{`
        table {
          margin: 5px auto;
          border-collapse: collapse;
          text-align: center;
          display: block;
          width: max-content;
          max-width: 100%;
          overflow: auto;
        }
      `}</style>
    </table>
  );
};

export const Th = (props) => {
  return (
    <th {...props}>
      {props.children}
      <style jsx>{`
        th {
          empty-cells: hide;
          border: 1px solid #aaa;
          font-weight: bold;
          padding: 5px 11px;
        }
      `}</style>
    </th>
  );
};

export const Td = (props) => {
  return (
    <td {...props}>
      {props.children}
      <style jsx>{`
        td {
          empty-cells: hide;
          border: 1px solid #aaa;
          font-weight: normal;
          padding: 5px 11px;
        }
      `}</style>
    </td>
  );
};
