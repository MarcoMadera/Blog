import { colors } from "styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "hooks/useDarkMode";
import { memo } from "react";

function MusicCard({ artist, cover, songUrl, title }) {
  const { darkMode } = useDarkMode();
  return (
    <article>
      <a
        href={songUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Reproducir ${title} de ${artist} en Spotify`}
        title={`${title} ${String.fromCharCode(183)} ${artist}`}
      >
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
      </a>
      <style jsx>{`
        a {
          border: 1px solid ${colors.accents1};
        }
        a:hover,
        a:focus-within {
          box-shadow: 0px 0px 4px 0px
            ${darkMode ? "rgba(200, 200, 200, 0.30)" : "rgba(84, 84, 84, 0.15)"};
        }
      `}</style>
      <style jsx>{`
        a {
          align-items: center;
          border-radius: 3px;
          color: inherit;
          display: flex;
          margin-bottom: 10px;
          padding: 5px;
          text-decoration: none;
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

MusicCard.propTypes = {
  artist: PropTypes.string,
  cover: PropTypes.string,
  songUrl: PropTypes.string,
  title: PropTypes.string,
};
