import { memo } from "react";
import { colors } from "../../styles/theme";
import Spotify from "../icons/Spotify";
import MusicCard from "./MusicCard";
import { Hr } from "../tags";
import PropTypes from "prop-types";

function MusicHeader({ artist, cover, header, songUrl, title }) {
  return (
    <>
      <header>
        <h2>{header}</h2>
        <a
          href="https://open.spotify.com/user/12133024755"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil de spotify"
        >
          <Spotify width="26" height="26" fill={colors.spotify} />
        </a>
      </header>
      <MusicCard
        title={title}
        cover={cover}
        artist={artist}
        songUrl={songUrl}
      />
      <Hr />
      <style jsx>{`
        a {
          display: inline-flex;
        }
        h2 {
          font-size: 1em;
          font-weight: 600;
          margin: 0;
        }
        header {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-top: 60px;
          margin-bottom: 16px;
        }
        header ~ :global(hr) {
          margin: 0.8em 0 0.7em 0;
        }
      `}</style>
    </>
  );
}

export default memo(MusicHeader, (pre, next) => pre.songUrl === next.songUrl);

MusicHeader.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  artist: PropTypes.string,
  songUrl: PropTypes.string,
};
