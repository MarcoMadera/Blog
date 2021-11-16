import { tweets } from "styles/theme";
import { PropsWithChildren, ReactElement } from "react";
import { A } from "components/tags";
import { TwitterLinkType } from "types/tweet";

interface TwitterLinkProps {
  href: string;
  title?: string;
  type?: TwitterLinkType;
}

export const TwitterLink = ({
  href,
  title,
  type,
  children,
}: PropsWithChildren<TwitterLinkProps>): ReactElement | null => {
  if (!children) {
    return null;
  }

  return (
    <A
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title || type ? undefined : href}
      textColor={tweets.linkColor}
    >
      {`${type ? `${type}${children}` : children}`}
    </A>
  );
};
