import { ALink } from "components/tags";
import { ReactElement } from "react";
import useToolTip from "hooks/useToolTip";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";
import useDarkMode from "hooks/useDarkMode";

interface IPoster {
  href: string;
  label: string;
  eventCategory: string;
  title: string;
  imgSrc: string;
}
export function Poster({
  href,
  label,
  eventCategory,
  title,
  imgSrc,
}: IPoster): ReactElement {
  const { trackWithGoogleAnalytics } = useAnalytics();
  const { getToolTipAttributes } = useToolTip();
  const { darkMode } = useDarkMode();
  return (
    <div>
      <ALink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        {...getToolTipAttributes(title)}
        onClick={() =>
          trackWithGoogleAnalytics(HitType.EVENT, {
            eventCategory: eventCategory,
            eventAction: "click",
            eventLabel: title,
            eventValue: "1",
          })
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={`Poster for ${title}`}
          width="100"
          height="150"
          loading="lazy"
        />
      </ALink>
      <style jsx>{`
        div :global(a) {
          display: block;
          color: inherit;
          text-decoration: none;
        }
        div :global(a:focus),
        div :global(a:hover) {
          color: inherit;
          text-decoration: underline;
        }
        img {
          display: block;
          margin: 0 auto;
          box-shadow: 0 0 0.5em
            ${darkMode ? "rgba(200, 200, 200, 0.3)" : "rgba(84, 84, 84, 0.5)"};
          transition: box-shadow 0.2s ease-in-out;
          will-change: box-shadow;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        div :global(a:focus img),
        div :global(a:hover img) {
          box-shadow: 0 0 0.5em
            ${darkMode ? "rgba(200, 200, 200, 0.5)" : "rgba(84, 84, 84, 0.8)"};
          transition: box-shadow 0.2s ease-in-out;
          will-change: box-shadow;
          cursor: pointer;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
