import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { PropsWithChildren, ReactElement } from "react";
import css from "styled-jsx/css";
import Link from "next/link";

type ActionButtonProps =
  | { href?: never; type?: "button" | never }
  | { href: string; type: "anchor" | "link" };

const actionButtonStyle = css`
  .actionButton {
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
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    text-align: center;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
  }
  .actionButton:not(:disabled):not(.disabled):hover {
    background-color: ${colors.dark_tertiary};
    border-color: ${colors.dark_tertiary};
    color: ${colors.white};
    text-decoration: none;
  }
  .actionButton:not(:disabled):not(.disabled):active {
    background-color: ${colors.dark_tertiary};
    border-color: ${colors.dark_tertiary};
    color: ${colors.white};
  }
  .actionButton:not(:disabled):not(.disabled):focus {
    box-shadow: 0 0 0 0.2rem rgba(181, 0, 0, 0.3);
    outline: none;
  }
`;

export default function ActionButton({
  children,
  type,
  href,
  ...attribs
}: PropsWithChildren<ActionButtonProps>): ReactElement {
  const { darkMode } = useDarkMode();

  const actionButtonDynamicStyle = css.global`
    .actionButton {
      background-color: ${darkMode ? colors.dark_secondary : colors.primary};
      border-color: ${darkMode ? colors.dark_secondary : colors.primary};
    }
  `;

  if (type === "anchor") {
    return (
      <>
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          {...attribs}
          className="actionButton"
        >
          {children}
        </a>
        <style jsx>{actionButtonStyle}</style>
        <style global jsx>
          {actionButtonDynamicStyle}
        </style>
      </>
    );
  }

  if (type === "link" && href) {
    return (
      <>
        <Link href={href}>
          <a className="actionButton">{children}</a>
        </Link>
        <style jsx>{actionButtonStyle}</style>
        <style global jsx>
          {actionButtonDynamicStyle}
        </style>
      </>
    );
  }

  return (
    <>
      <button {...attribs} className="actionButton">
        {children}
      </button>
      <style jsx>{actionButtonStyle}</style>
      <style global jsx>
        {actionButtonDynamicStyle}
      </style>
    </>
  );
}
