import PropTypes from "prop-types";
import { colors } from "../styles/theme";
const MusicCard = ({ songUrl, cover, title, artist }) => {
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
        <section>
          <p>
            <b>{title}</b>
          </p>
          <p>{artist}</p>
        </section>
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
          box-shadow: 0px 0px 4px 0px rgba(84, 84, 84, 0.15);
        }
        img {
          margin-right: 5px;
        }
        section {
          max-width: calc(100% - 69px);
        }
        p {
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p:nth-of-type(1) {
          display: -webkit-box;
          white-space: unset;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
