import { Children, PropsWithChildren, ReactElement } from "react";

export default function FlexUlList({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <ul>
      {Children.map(children, (child, idx) => (
        <li key={idx}>{child}</li>
      ))}
      <style jsx>{`
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        ul > li {
          margin: 0.5em;
        }
      `}</style>
    </ul>
  );
}
