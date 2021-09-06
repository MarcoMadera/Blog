import useDarkMode from "hooks/useDarkMode";
import { PropsWithChildren, ReactElement } from "react";
import Link from "next/link";
import {
  actionButtonDynamicStyle,
  actionButtonStyle,
  darkActionButtonDynamicStyle,
} from "styles/components/actionButton";

type ActionButtonProps =
  | { href?: never; type?: "button" | never }
  | { href: string; type: "anchor" | "link" };

export default function ActionButton({
  children,
  type,
  href,
  ...attribs
}: PropsWithChildren<ActionButtonProps>): ReactElement {
  const { darkMode } = useDarkMode();

  const dynamicStyle = darkMode
    ? darkActionButtonDynamicStyle
    : actionButtonDynamicStyle;

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
        <style jsx>{dynamicStyle}</style>
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
        <style jsx>{dynamicStyle}</style>
      </>
    );
  }

  return (
    <>
      <button {...attribs} className="actionButton">
        {children}
      </button>
      <style jsx>{actionButtonStyle}</style>
      <style jsx>{dynamicStyle}</style>
    </>
  );
}
