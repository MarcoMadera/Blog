import PropTypes from "prop-types";
import MusicHeader from "./MusicHeader";
import TopTracksList from "./TopTracksList";

export default function TrackList({ newNowPlaying, topTracks }) {
  return (
    <>
      {Object.keys(newNowPlaying).length > 0 && (
        <MusicHeader
          artist={newNowPlaying.artist}
          cover={newNowPlaying.cover}
          header={
            newNowPlaying.listening ? "Escuchando ahora" : "Último escuchado"
          }
          songUrl={newNowPlaying.songUrl}
          title={newNowPlaying.title}
        />
      )}
      <TopTracksList topTracks={topTracks} />
    </>
  );
}

TrackList.propTypes = {
  newNowPlaying: PropTypes.object,
  topTracks: PropTypes.array,
};
