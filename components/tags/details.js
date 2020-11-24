import { colors } from "../../styles/theme";

export const Details = ({ children }) => {
  return (
    <details>
      {children}
      <style jsx>{`
        :global(summary) {
          font-weight: bold;
          margin: -0.5em -0.5em 0;
          padding: 0.5em;
        }
        details {
          border: 1px solid ${colors.gray};
          border-radius: 4px;
          padding: 0.5em 0.5em 0;
        }
        details > summary::marker {
          color: ${colors.primary};
        }
        details > summary::-webkit-details-marker {
          color: ${colors.primary};
        }
        details[open] {
          padding: 0.5em;
        }
        details[open] summary {
          border-bottom: 1px solid ${colors.gray};
          margin-bottom: 0.5em;
        }
      `}</style>
    </details>
  );
};
