import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import React, {
  createRef,
  memo,
  ReactElement,
  SVGProps,
  useEffect,
} from "react";
import type { SongData } from "types/spotify";
import { A } from "components/tags";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";
import usePlayer from "hooks/usePlayer";

function ExplicitSign(): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <span className="explicit">
      <span className="explicit-text">Explicit</span>
      <style jsx>{`
        .explicit {
          position: relative;
          display: inline-block;
          font-size: 0.8em;
          line-height: 1em;
          vertical-align: middle;
        }
        .explicit-text {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${darkMode ? colors.monsoon : colors.softPeach};
          padding: 0.1em 0.3em;
          border-radius: 0.2em;
          color: ${colors.black};
        }
      `}</style>
    </span>
  );
}

function PausedIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg role="img" height="32" width="32" viewBox="0 0 24 24">
      <path
        fill={props.fill}
        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.75-4.567a.5.5 0 00-.75.433v8.268a.5.5 0 00.75.433l7.161-4.134a.5.5 0 000-.866L9.75 7.433z"
      ></path>
    </svg>
  );
}

function PlayingIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg role="img" height="24" width="24" viewBox="0 0 24 24" {...props}>
      <path
        fill={props.fill}
        d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
      ></path>
    </svg>
  );
}

function PlayButton({
  handleClick,
  isPlaying,
}: {
  handleClick: () => void;
  isPlaying: boolean;
}): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <button
      className="play-button"
      onClick={handleClick}
      aria-label={isPlaying ? "Pausar" : "Reproducir"}
    >
      <span className="play-button-text">
        {isPlaying ? (
          <div className="playing-icon-container">
            <PlayingIcon
              width={18}
              height={18}
              fill={darkMode ? colors.black : colors.white}
            />
          </div>
        ) : (
          <PausedIcon fill={darkMode ? colors.white : colors.black} />
        )}
      </span>
      <style jsx>{`
        .playing-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          width: 29.34px;
          height: 29.34px;
          border-radius: 50%;
          margin: 0 1px;
          background-color: ${darkMode ? colors.white : colors.black};
        }
        .play-button {
          position: relative;
          display: inline-block;
          font-size: 0.8em;
          line-height: 1em;
          vertical-align: middle;
          background: none;
          border: none;
          z-index: 999999999999;
        }
        .play-button:focus {
          outline: none;
        }
        .play-button-text {
          height: 32px;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </button>
  );
}

function MusicCard({
  artist,
  cover,
  songUrl,
  title,
  preview,
  explicit,
  uri,
}: SongData): ReactElement {
  const { darkMode } = useDarkMode();
  const { trackWithGoogleAnalytics } = useAnalytics();
  const {
    audioPlayer,
    setIsPlaying,
    isPlaying,
    currentlyPlayingPosition,
    currentlyPlayingDuration,
    currentlyPlaying,
    setCurrentlyPlaying,
  } = usePlayer();
  const anchorRef = createRef<HTMLAnchorElement>();

  useEffect(() => {
    const currentPositionPercent =
      ((currentlyPlayingPosition || 0) * 100) / (currentlyPlayingDuration || 1);
    const isPlayingThisTrack = currentlyPlaying?.songUrl === songUrl;
    if (
      anchorRef.current &&
      isPlayingThisTrack &&
      currentPositionPercent > 0 &&
      isPlaying
    ) {
      anchorRef.current.style.setProperty(
        "--positionPercent",
        `${currentPositionPercent}%`
      );
    } else {
      anchorRef.current?.style.setProperty("--positionPercent", "0%");
    }
  }, [
    anchorRef,
    currentlyPlaying?.songUrl,
    currentlyPlayingDuration,
    currentlyPlayingPosition,
    isPlaying,
    songUrl,
  ]);

  return (
    <article>
      <A
        href={songUrl}
        ref={anchorRef}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Reproducir ${title} de ${artist} en Spotify`}
        title={`${title} ${String.fromCharCode(183)} ${artist}`}
        onClick={() => {
          trackWithGoogleAnalytics(HitType.EVENT, {
            eventCategory: "music",
            eventAction: "play",
            eventLabel: `${title} ${String.fromCharCode(183)} ${artist}`,
            eventValue: "1",
          });
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={`${title} portada del album`}
          width="64"
          height="64"
        />
        <div>
          <h2>{title}</h2>
          <p>{artist}</p>
          {explicit && <ExplicitSign />}
        </div>
      </A>
      <div className="playButton">
        {!!preview && (
          <PlayButton
            handleClick={() => {
              if (!audioPlayer?.current) return;
              const isPlayingThisTrack = audioPlayer.current?.src === preview;
              if (!isPlayingThisTrack && audioPlayer?.current && preview) {
                audioPlayer.current.src = preview;
                audioPlayer.current.play();
                setIsPlaying(true);
                setCurrentlyPlaying({
                  artist,
                  cover,
                  songUrl,
                  title,
                  uri,
                  explicit,
                });
                return;
              }
              if (!isPlaying && isPlayingThisTrack) {
                audioPlayer.current.play();
                setIsPlaying(true);
                setCurrentlyPlaying({
                  artist,
                  cover,
                  songUrl,
                  title,
                  uri,
                  explicit,
                });
                return;
              }
              if (isPlayingThisTrack && audioPlayer?.current) {
                audioPlayer.current.pause();
                setIsPlaying(false);
              }
            }}
            isPlaying={audioPlayer?.current?.src === preview && isPlaying}
          />
        )}
      </div>
      <style jsx>{`
        article :global(a) {
          border: 1px solid ${darkMode ? "#cccccc75" : colors.silverChalice};
          background: ${darkMode ? colors.cinder : colors.romance};
        }
        article :global(a:hover),
        article :global(a:focus-within) {
          box-shadow: 0px 0px 4px 0px
            ${darkMode ? "rgba(200, 200, 200, 0.30)" : "rgba(84, 84, 84, 0.15)"};
        }
        article :global(a::after) {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: var(--positionPercent);
          height: 2px;
          background-color: ${darkMode ? colors.white : colors.black};
          transition: width 0.2s ease-in-out;
          border-radius: 0 0 100px 100px;
          margin: 0 3px;
        }
        article :global(a) {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 0.5em;
          background: ${darkMode ? colors.cinder : colors.romance};
        }
      `}</style>
      <style jsx>{`
        article {
          position: relative;
        }
        .playButton {
          position: absolute;
          bottom: 5px;
          right: 5px;
          z-index: 1;
          display: inline-grid;
          justify-content: end;
          width: auto;
        }
        article :global(a) {
          align-items: center;
          border-radius: 3px;
          color: inherit;
          display: flex;
          margin-bottom: 10px;
          padding: 5px;
          text-decoration: none;
        }
        article :global(a:hover),
        article :global(a:focus) {
          text-decoration: none;
          color: inherit;
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
