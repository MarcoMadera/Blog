import PropTypes from "prop-types";
import { colors } from "../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
const MusicCard = ({ songUrl, cover, title, artist }) => {
  const { darkMode } = useContext(ThemeContext);
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
          display: flex;
          border-radius: 3px;
          border: 1px solid ${colors.gray};
          margin-bottom: 10px;
          padding: 5px;
          align-items: center;
        }
        a:hover,
        a:focus-within {
          box-shadow: 0px 0px 4px 0px
            ${darkMode ? "rgba(200, 200, 200, 0.30)" : "rgba(84, 84, 84, 0.15)"};
        }
        img {
          margin-right: 5px;
        }
        div {
          width: calc(100% - 69px);
          max-width: calc(100vw - 120px);
        }
        p,
        h2 {
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 1em;
          display: -webkit-box;
          white-space: unset;
          -webkit-box-orient: vertical;
          text-align: left;
        }
        h2 {
          -webkit-line-clamp: 2;
        }
        p {
          -webkit-line-clamp: 1;
        }
      `}</style>
    </article>
  );
};

MusicCard.propTypes = {
  songUrl: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
};

export default MusicCard;
