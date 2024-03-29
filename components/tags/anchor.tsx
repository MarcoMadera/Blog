import Link, { LinkProps } from "next/link";
import React, {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
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

export const A = forwardRef(
  (
    {
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
    >,
    ref: React.Ref<HTMLAnchorElement>
  ): ReactElement => {
    const { getToolTipAttributes } = useToolTip();
    const { darkMode } = useDarkMode();

    return (
      <a
        className={classname ?? className}
        href={href}
        {...getToolTipAttributes(title ?? href, { hideToolTip })}
        {...attribs}
        ref={ref}
      >
        {children}
        <style jsx>{`
          a {
            color: ${textColor ??
            (darkMode ? colors.deepCarminPink : colors.guardsmanRed)};
          }
        `}</style>
      </a>
    );
  }
);

A.displayName = "A";

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
      <Link
        href={href}
        prefetch={prefetch}
        {...getToolTipAttributes(title ?? href, { hideToolTip })}
        {...attribs}
        className={`${classname || className || ""} aLink`}
      >
        {children}
      </Link>
      <style jsx>{`
        :global(.aLink) {
          color: ${textColor ??
          (darkMode ? colors.deepCarminPink : colors.guardsmanRed)};
        }
      `}</style>
    </>
  );
}
