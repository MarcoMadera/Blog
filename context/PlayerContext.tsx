import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { SongData } from "types/spotify";

export interface AudioPlayer extends HTMLAudioElement {
  nextTrack: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  previousTrack: () => void;
  togglePlay: () => void;
  allTracks: SongData[];
  sliderBusy: boolean;
}

export interface PlayerContextProps {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentlyPlayingDuration?: number;
  setCurrentlyPlayingDuration: (duration: number) => void;
  currentlyPlaying?: SongData;
  setCurrentlyPlaying: (song: SongData) => void;
  currentlyPlayingPosition?: number;
  setCurrentlyPlayingPosition: (position: number) => void;
  audioPlayer?: MutableRefObject<AudioPlayer | undefined>;
  allTracks: SongData[];
  setAllTracks: (tracks: SongData[]) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export function PlayerContextProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentlyPlayingDuration, setCurrentlyPlayingDuration] =
    useState<number>();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SongData>();
  const [currentlyPlayingPosition, setCurrentlyPlayingPosition] =
    useState<number>();
  const [allTracks, setAllTracks] = useState<SongData[]>([]);
  const audioPlayer = useRef<AudioPlayer>();

  useEffect(() => {
    audioPlayer.current = new Audio() as AudioPlayer;

    audioPlayer.current.ondurationchange = function () {
      setCurrentlyPlayingDuration(audioPlayer.current?.duration);
    };

    audioPlayer.current.seek = function (seek: number) {
      if (audioPlayer.current) {
        audioPlayer.current.currentTime = seek;
      }
    };

    audioPlayer.current.onplaying = function () {
      setIsPlaying(true);
    };

    audioPlayer.current.allTracks = allTracks;

    audioPlayer.current.setVolume = function (volume: number) {
      if (audioPlayer.current) {
        audioPlayer.current.volume = volume;
      }
    };
    audioPlayer.current.togglePlay = function () {
      if (audioPlayer.current?.paused) {
        audioPlayer.current?.play();
        setIsPlaying(true);
        return;
      }
      audioPlayer.current?.pause();
      setIsPlaying(false);
    };

    audioPlayer.current.nextTrack = function () {
      const player = audioPlayer.current;
      function getNextTrack() {
        const currentTrackIndex = player?.allTracks?.findIndex(
          ({ preview }) => preview === player?.src
        );
        const nextTrackIndex = (currentTrackIndex ?? -1) + 1;
        let nextTrack;
        for (
          let index = nextTrackIndex;
          index < (player?.allTracks ? player?.allTracks.length : 0);
          index++
        ) {
          const audio = player?.allTracks[index]?.preview;
          if (audio) {
            nextTrack = {
              track: player?.allTracks[index],
              audio,
            };
            break;
          }
        }
        return nextTrack;
      }

      const nextTrack = getNextTrack();

      if (nextTrack?.audio && player) {
        player.src = nextTrack.audio;
        player.play();
        setIsPlaying(true);
        setCurrentlyPlaying(nextTrack.track);
      }
    };

    audioPlayer.current.previousTrack = function () {
      const player = audioPlayer.current;
      function getPreviousTrack() {
        const currentTrackIndex = player?.allTracks.findIndex(
          ({ preview }) => preview === player?.src
        );
        let previousTrackIndex = (currentTrackIndex ?? -1) - 1;
        let previousTrack;

        while (previousTrackIndex >= 0) {
          const audio =
            audioPlayer.current?.allTracks[previousTrackIndex]?.preview;
          if (audio) {
            previousTrack = {
              track: audioPlayer.current?.allTracks[previousTrackIndex],
              audio,
            };
            break;
          }
          previousTrackIndex--;
        }

        return previousTrack;
      }

      const previousTrack = getPreviousTrack();

      if (previousTrack?.audio && player) {
        player.src = previousTrack.audio;
        player.play();
        setCurrentlyPlaying(previousTrack.track);
      }
    };

    audioPlayer.current.onended = function () {
      const player = audioPlayer.current;
      if (!player) return;
      setIsPlaying(false);
      player.currentTime = 0;
      player.pause();
      audioPlayer.current?.nextTrack();
    };

    audioPlayer.current.ontimeupdate = () => {
      setCurrentlyPlayingPosition(
        Math.floor(audioPlayer.current?.currentTime ?? 0)
      );
    };
  }, [allTracks]);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentlyPlayingDuration,
        setCurrentlyPlayingDuration,
        currentlyPlaying,
        setCurrentlyPlaying,
        currentlyPlayingPosition,
        setCurrentlyPlayingPosition,
        audioPlayer,
        allTracks,
        setAllTracks,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerContext;
