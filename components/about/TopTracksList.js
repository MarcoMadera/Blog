import MusicCard from "./MusicCard";
import PropTypes from "prop-types";
export default function TopTracksList({ topTracks }) {
  return (
    topTracks.length > 0 && (
      <>
        <h2>Mi top 10 de canciones</h2>
        {topTracks.map(({ title, artist, songUrl, cover }) => (
          <MusicCard
            artist={artist}
            cover={cover}
            key={songUrl}
            songUrl={songUrl}
            title={title}
          />
        ))}
        <style jsx>{`
          h2 {
            font-size: 1em;
            font-weight: 600;
            margin: 0 0 0.6em 0;
          }
        `}</style>
      </>
    )
  );
}

TopTracksList.propTypes = {
  topTracks: PropTypes.array,
};
