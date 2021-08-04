import { ReactElement } from "react";
import { NowPlaying, SongData } from "types/spotify";
import MusicHeader from "./MusicHeader";
import TopTracksList from "./TopTracksList";

interface TrackListProps {
  newNowPlaying: NowPlaying;
  topTracks: SongData[];
}

export default function TrackList({
  newNowPlaying,
  topTracks,
}: TrackListProps): ReactElement {
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
