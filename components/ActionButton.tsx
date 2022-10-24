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

type AnchorAttributes = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
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
        <Link href={(attribs as AnchorAttributes).href || ""}>
          <a className="actionButton" {...(attribs as AnchorAttributes)}>
            {children}
          </a>
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
