import { H3 } from "components/tags";
import { PropsWithChildren, ReactElement } from "react";

interface ThingILikeProps {
  title: string;
  href: string;
  label: string;
}

export function ThingILike({
  children,
  href,
  title,
  label,
}: PropsWithChildren<ThingILikeProps>): ReactElement {
  return (
    <div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <H3>{title}</H3>
      </a>
      {children}
      <style jsx>{`
        div {
          margin-bottom: 60px;
        }
        a {
          color: inherit;
          text-decoration: none;
          line-height: 1.5;
          font-size: 2rem;
          margin: 20px 0;
        }
        a:focus,
        a:hover {
          color: inherit;
          text-decoration: underline;
        }
        a :global(h3) {
          display: inline;
          font-size: 2rem;
          font-weight: 400;
          line-height: 1.5;
        }
        a ~ :global(p) {
          margin-top: 0.8em;
        }
      `}</style>
    </div>
  );
}
