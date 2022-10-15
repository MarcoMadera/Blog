import Link, { LinkProps } from "next/link";
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
  const { getToolTipAttributes } = useToolTip();
  const { darkMode } = useDarkMode();

  return (
    <a
      className={classname ?? className}
      href={href}
      {...getToolTipAttributes(title ?? href, { hideToolTip })}
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
  const { getToolTipAttributes } = useToolTip();
  const { darkMode } = useDarkMode();

  return (
    <>
      <Link href={href} prefetch={prefetch}>
        <a
          {...getToolTipAttributes(title ?? href, { hideToolTip })}
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
