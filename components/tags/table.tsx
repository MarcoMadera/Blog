import { PropsWithChildren, ReactElement } from "react";
import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export function Table({ children, ...attribs }: TableProps): ReactElement {
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
        table :global(caption) {
          padding: 8px;
          caption-side: bottom;
        }
      `}</style>
    </table>
  );
}

interface ThProps {
  colspan?: number;
  [x: string]: string | unknown;
}

export function Th({
  children,
  colspan,
  ...attribs
}: PropsWithChildren<ThProps>): ReactElement {
  return (
    <th colSpan={colspan} {...attribs}>
      {children}
      <style jsx>{`
        th {
          border: 1px solid #aaa;
          empty-cells: hide;
          font-weight: 700;
          padding: 7px 13px;
          text-align: center;
          font-size: 18px;
        }
      `}</style>
    </th>
  );
}

interface TdProps {
  colspan?: number;
  align?: string;
  [x: string]: string | unknown;
}

export function Td({
  align,
  children,
  colspan,
  ...attribs
}: PropsWithChildren<TdProps>): ReactElement {
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
          padding: 7px 13px;
          font-size: 18px;
        }
      `}</style>
    </td>
  );
}
