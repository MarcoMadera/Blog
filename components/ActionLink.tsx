import { colors } from "styles/theme";
import Link from "next/link";
import useDarkMode from "hooks/useDarkMode";
import { PropsWithChildren, ReactElement } from "react";

interface ActionLinkProps {
  href: string;
}

export default function ActionLink({
  children,
  href,
}: PropsWithChildren<ActionLinkProps>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <>
      <Link href={href}>
        <a className="actionLink">{children}</a>
      </Link>
      <style jsx>{`
        a {
          background-color: ${darkMode
            ? colors.dark_secondary
            : colors.primary};
          border-color: ${darkMode ? colors.dark_secondary : colors.primary};
        }
      `}</style>
      <style jsx>{`
        a {
          border-width: 1px;
          border-style: solid;
          border-radius: 28px;
          color: ${colors.white};
          cursor: pointer;
          display: inline-block;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 0.375rem 2rem;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          text-align: center;
          text-decoration: none;
          user-select: none;
          vertical-align: middle;
        }
        a:not(:disabled):not(.disabled):hover {
          background-color: ${colors.dark_tertiary};
          border-color: ${colors.dark_tertiary};
          color: ${colors.white};
          text-decoration: none;
        }
        a:not(:disabled):not(.disabled):active {
          background-color: ${colors.dark_tertiary};
          border-color: ${colors.dark_tertiary};
          color: ${colors.white};
        }
        a:not(:disabled):not(.disabled):focus {
          box-shadow: 0 0 0 0.2rem rgba(181, 0, 0, 0.3);
          outline: none;
        }
      `}</style>
    </>
  );
}