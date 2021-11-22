import Link, { LinkProps } from "next/link";
import css from "styled-jsx/css";
import React, {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactElement,
} from "react";
import useToolTip from "hooks/useToolTip";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";

interface AProps {
  href: string;
  hideToolTip?: boolean;
  classname?: string;
  className?: string;
  title?: string;
  target?: string;
  textColor?: string;
  rel?: string;
}

export const anchorStyle = css`
  a {
    display: inline;
    text-decoration: none;
    overflow-wrap: break-word;
  }
  a:hover,
  a:focus {
    text-decoration: underline;
  }
`;

export function A({
  classname,
  className,
  children,
  href,
  title,
  hideToolTip,
  textColor,
  ...attribs
}: PropsWithChildren<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > &
    AProps
>): ReactElement {
  const { getToolTipAttrbutes } = useToolTip();
  const { darkMode } = useDarkMode();

  return (
    <a
      className={classname ?? className}
      href={href}
      {...getToolTipAttrbutes(title ?? href, { hideToolTip })}
      {...attribs}
    >
      {children}
      <style jsx>{`
        a {
          color: ${textColor ??
          (darkMode ? colors.dark_primary : colors.primary)};
        }
      `}</style>
    </a>
  );
}

export function ALink({
  classname,
  className,
  children,
  href,
  title,
  hideToolTip,
  prefetch,
  textColor,
  ...attribs
}: PropsWithChildren<AProps & LinkProps>): ReactElement {
  const { getToolTipAttrbutes } = useToolTip();
  const { darkMode } = useDarkMode();

  return (
    <>
      <Link href={href} prefetch={prefetch}>
        <a
          {...getToolTipAttrbutes(title ?? href, { hideToolTip })}
          {...attribs}
          className={classname || className}
        >
          {children}
          <style jsx>{`
            a {
              color: ${textColor ??
              (darkMode ? colors.dark_primary : colors.primary)};
            }
          `}</style>
        </a>
      </Link>
    </>
  );
}
