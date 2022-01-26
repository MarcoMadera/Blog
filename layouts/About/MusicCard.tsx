import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import React, { memo, ReactElement } from "react";
import type { SongData } from "types/spotify";
import { A } from "components/tags";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";

function MusicCard({ artist, cover, songUrl, title }: SongData): ReactElement {
  const { darkMode } = useDarkMode();
  const { trackWithGoogleAnalytics } = useAnalytics();
  return (
    <article>
      <A
        href={songUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Reproducir ${title} de ${artist} en Spotify`}
        title={`${title} ${String.fromCharCode(183)} ${artist}`}
        onClick={() => {
          trackWithGoogleAnalytics(HitType.EVENT, {
            eventCategory: "music",
            eventAction: "play",
            eventLabel: `${title} ${String.fromCharCode(183)} ${artist}`,
            eventValue: "1",
          });
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={`${title} portada del album`}
          width="64"
          height="64"
        />
        <div>
          <h2>{title}</h2>
          <p>{artist}</p>
        </div>
      </A>
      <style jsx>{`
        article :global(a) {
          border: 1px solid ${darkMode ? "#cccccc75" : colors.accents1};
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
        }
        article :global(a:hover),
        article :global(a:focus-within) {
          box-shadow: 0px 0px 4px 0px
            ${darkMode ? "rgba(200, 200, 200, 0.30)" : "rgba(84, 84, 84, 0.15)"};
        }
      `}</style>
      <style jsx>{`
        article :global(a) {
          align-items: center;
          border-radius: 3px;
          color: inherit;
          display: flex;
          margin-bottom: 10px;
          padding: 5px;
          text-decoration: none;
        }
        article :global(a:hover),
        article :global(a:focus) {
          text-decoration: none;
          color: inherit;
        }
        div {
          max-width: calc(100vw - 120px);
          width: calc(100% - 69px);
        }
        h2,
        p {
          -webkit-box-orient: vertical;
          display: -webkit-box;
          font-size: 1em;
          margin: 0;
          overflow: hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: unset;
        }
        h2 {
          -webkit-line-clamp: 2;
        }
        img {
          margin-right: 5px;
        }
        p {
          -webkit-line-clamp: 1;
        }
      `}</style>
    </article>
  );
}

export default memo(MusicCard, (pre, next) => pre.songUrl === next.songUrl);
