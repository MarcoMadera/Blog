import { tweets } from "styles/theme";
import { PropsWithChildren, ReactElement } from "react";

interface TwitterLinkProps {
  href: string;
  title?: string;
  type?: "#" | "@" | "$";
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title || type ? undefined : href}
    >
      {`${type ? `${type}${children}` : children}`}
      <style jsx>{`
        a {
          color: ${tweets.linkColor};
          text-decoration: none;
          line-break: anywhere;
        }
        a:hover,
        a:focus {
          text-decoration: underline;
        }
      `}</style>
    </a>
  );
};
