import { tweets } from "../../styles/theme";

export const Table = (p) => (
  <div className="table-container">
    <table {...p} />
    <style jsx>{`
      .table-container {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: ${tweets.containerMargin};
      }
      table {
        display: block;
        overflow: auto;
        border-collapse: collapse;
      }
    `}</style>
  </div>
);

export const Th = (p) => (
  <>
    <th {...p} />
    <style jsx>{`
      th {
        font-weight: 600;
        padding: 0.5rem 0.875rem;
        border: 1px solid ${tweets.accents2};
      }
    `}</style>
  </>
);

export const Td = (p) => (
  <>
    <td {...p} />
    <style jsx>{`
      td {
        padding: 0.5rem 0.875rem;
        border: 1px solid ${tweets.accents2};
      }
    `}</style>
  </>
);
