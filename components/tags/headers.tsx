import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from "react";
import { ReactNode } from "react";

export function H1({
  children,
  ...attribs
}: PropsWithChildren<Record<string, string | ReactNode[]>>): ReactElement {
  return (
    <h1 {...attribs}>
      {children}
      <style jsx>{`
        h1 {
          margin: 0;
          font-weight: 400;
          margin: 20px 0 0.5em 0;
          font-size: 48px;
        }
      `}</style>
    </h1>
  );
}

export function H2({
  children,
  ...attribs
}: PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>): ReactElement {
  return (
    <h2 {...attribs}>
      {children}
      <style jsx>{`
        h2 {
          margin: 0.8rem 0 0.3rem 0;
          font-size: 1.5em;
          font-weight: 400;
          font-size: 2.2rem;
          margin-top: 1em;
          letter-spacing: -0.5px;
          color: #de2323;
        }
      `}</style>
    </h2>
  );
}

export function H3({
  children,
  ...attribs
}: PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>): ReactElement {
  return (
    <h3 {...attribs}>
      {children}
      <style jsx>{`
        h3 {
          margin: 0;
          font-size: 1.1em;
          font-weight: 600;
        }
      `}</style>
    </h3>
  );
}
