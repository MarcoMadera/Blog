import PropTypes from "prop-types";
import { colors } from "../styles/theme";
const MusicCard = ({ songUrl, cover, title, artist }) => {
  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escuchar en Spotify"
    >
      <article>
        <img
          src={cover}
          alt={`${title} portada del album`}
          width="64"
          height="64"
        />
        <div>
          <p>
            <b>{title}</b>
          </p>
          <p>{artist}</p>
        </div>
      </article>
      <style jsx>{`
        a {
          display: block;
        }
        article {
          display: flex;
          border-radius: 3px;
          border: 1px solid ${colors.gray};
          margin-bottom: 10px;
          padding: 5px;
          align-items: center;
        }
        article:hover {
          box-shadow: 0px 0px 4px 0px rgba(84, 84, 84, 0.15);
        }
        img {
          margin-right: 5px;
        }
        p {
          margin: 0;
        }
        div > p {
          line-break: anywhere;
        }
      `}</style>
    </a>
  );
};

MusicCard.propTypes = {
  songUrl: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
};

export default MusicCard;
