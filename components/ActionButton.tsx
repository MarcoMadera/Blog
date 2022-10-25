import useDarkMode from "hooks/useDarkMode";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactElement,
} from "react";
import Link from "next/link";
import {
  actionButtonDynamicStyle,
  actionButtonStyle,
  darkActionButtonDynamicStyle,
} from "styles/components/actionButton";

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonAttributes = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ActionButtonProps =
  | ({ type?: "button" | "submit" | never } & ButtonAttributes)
  | ({ type: "anchor" | "link" } & AnchorAttributes);

export default function ActionButton({
  children,
  type,
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
          rel="noopener noreferrer"
          target="_blank"
          {...(attribs as AnchorAttributes)}
          className="actionButton"
        >
          {children}
        </a>
        <style jsx>{actionButtonStyle}</style>
        <style jsx>{dynamicStyle}</style>
      </>
    );
  }

  if (type === "link" && (attribs as AnchorAttributes).href) {
    return (
      <>
        <Link
          href={(attribs as AnchorHTMLAttributes<HTMLAnchorElement>).href || ""}
          className="actionButton"
          {...(attribs as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
        <style jsx>{actionButtonStyle}</style>
        <style jsx>{dynamicStyle}</style>
      </>
    );
  }

  return (
    <>
      <button
        type={type === "submit" ? type : undefined}
        {...(attribs as ButtonAttributes)}
        className="actionButton"
      >
        {children}
      </button>
      <style jsx>{actionButtonStyle}</style>
      <style jsx>{dynamicStyle}</style>
    </>
  );
}
