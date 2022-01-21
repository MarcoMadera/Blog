import { PropsWithChildren, ReactElement } from "react";

interface OlUlProps {
  depth?: number;
}

export function Ol({
  children,
  depth,
  ...attribs
}: PropsWithChildren<OlUlProps>): ReactElement {
  const deep = depth ?? 0;
  return (
    <ol {...attribs}>
      {children}
      <style jsx>{`
        ol {
          margin: ${deep > 0 ? `0 0 0 ${20 * deep}px` : "1em 0"};
        }
      `}</style>
    </ol>
  );
}

export function Ul({
  children,
  depth,
  ...attribs
}: PropsWithChildren<OlUlProps>): ReactElement {
  const deep = depth ?? 0;
  return (
    <ul {...attribs}>
      {children}
      <style jsx>{`
        ul {
          margin: ${deep > 0 ? "0 0 0 20px" : "1em 0"};
        }
      `}</style>
    </ul>
  );
}

interface LiProps {
  checked?: boolean | null;
}

export function Li({
  children,
  checked = null,
  ...attribs
}: PropsWithChildren<LiProps>): ReactElement {
  return (
    <li {...attribs}>
      {checked === true && (
        <label>
          <input checked readOnly type="checkbox" />
        </label>
      )}
      {checked === false && (
        <label>
          <input checked={false} readOnly type="checkbox" />
        </label>
      )}
      {children}
      <style jsx>{`
        li {
          margin-left: ${checked === null ? "20px" : "0"};
          margin-top: ${checked === null ? "5px" : "0"};
          list-style-type: ${checked === null ? "revert" : "none"};
        }
        label {
          background-color: ${checked === true ? "#ce3a3a" : "unset"};
          border: 1px solid ${checked === true ? "unset" : "#cccccc4d"};
        }
        label:after {
          background-image: ${checked === true
            ? "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3E%3C/svg%3E\")"
            : "unset"};
        }
      `}</style>
      <style jsx>{`
        li {
          position: relative;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.6;
          align-items: center;
          list-style-position: outside;
        }
        li :global(p) {
          margin: 0 0 12px 0;
          white-space: pre;
        }
        li :global(p:last-child) {
          margin-bottom: 0px;
        }
        input {
          clip: rect(0, 0, 0, 0);
          width: 0;
          height: 0;
          padding: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          top: 0;
          left: 0;
        }
        label {
          position: relative;
          display: inline-flex;
          border-radius: 3px;
          padding: 3px;
          cursor: pointer;
          width: 1rem;
          height: 1rem;
          align-items: center;
          justify-content: center;
          margin-right: 5px;
        }
        label:focus-within,
        label:active {
          outline-style: dashed;
          outline-width: 2px;
          outline-color: #b50000;
        }
        label:after {
          position: absolute;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
          background-position-x: 50%;
          background-position-y: center;
          background-size: 50% 50%;
          background-repeat: no-repeat;
        }
      `}</style>
    </li>
  );
}
