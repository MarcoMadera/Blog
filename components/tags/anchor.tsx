import { colors } from "styles/theme";
import Link from "next/link";
import useDarkMode from "hooks/useDarkMode";
import css from "styled-jsx/css";
import { PropsWithChildren, ReactElement } from "react";

interface AProps {
  href: string;
  classname?: string;
  title?: string;
  target?: string;
  rel?: string;
}

export const anchorStyle = css`
  a {
    display: inline;
    text-decoration: none;
  }
  a:hover,
  a:focus {
    text-decoration: underline;
  }
`;

export function A({
  classname,
  children,
  href,
  title,
  ...attribs
}: PropsWithChildren<AProps>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <a
      className={classname}
      href={href}
      title={title === "" ? undefined : title ?? href}
      {...attribs}
    >
      {children}
      <style jsx>{`
        a {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        a:hover,
        a:focus {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
      <style jsx>{anchorStyle}</style>
    </a>
  );
}

export function ALink({
  classname,
  children,
  href,
  title,
  ...attribs
}: PropsWithChildren<AProps>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <>
      <Link href={href}>
        <a
          title={title === "" ? undefined : title ?? href}
          {...attribs}
          className={classname}
        >
          {children}
        </a>
      </Link>
      <style jsx>{`
        a {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        a:focus,
        a:hover {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
      <style jsx>{anchorStyle}</style>
    </>
  );
}
