import usePlayer from "hooks/usePlayer";
import { ReactElement, useEffect } from "react";
import type { NowPlaying, SongData } from "types/spotify";
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
  const { setAllTracks } = usePlayer();

  useEffect(() => {
    setAllTracks([newNowPlaying, ...topTracks]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          uri={newNowPlaying.uri}
          preview={newNowPlaying.preview}
          explicit={newNowPlaying.explicit}
        />
      )}
      <TopTracksList topTracks={topTracks} />
    </>
  );
}
