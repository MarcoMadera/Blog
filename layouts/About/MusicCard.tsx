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

function Pause(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg height="16" width="16" viewBox="0 0 16 16" {...props}>
      <path fill="transparent" d="M0 0h16v16H0z"></path>
      <path fill={props.fill ?? "#000"} d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
    </svg>
  );
}

function Play(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg height="16" width="16" viewBox="0 0 16 16" {...props}>
      <path
        fill={(props.fill as string) ?? "#000"}
        d="M4.018 14L14.41 8 4.018 2z"
      ></path>
    </svg>
  );
}

function PlayButton({
  handleClick,
  size,
  isPlaying,
  centerSize,
}: {
  handleClick: () => void;
  size: string;
  centerSize: string;
  isPlaying: boolean;
}): ReactElement {
  return (
    <>
      <button
        type="button"
        aria-label="Play/Pause"
        className="play-Button"
        onClick={handleClick}
      >
        {isPlaying ? (
          <Pause fill="#fff" width={centerSize} height={centerSize} />
        ) : (
          <Play fill="#fff" width={centerSize} height={centerSize} />
        )}
      </button>
      <style jsx>{`
        .play-Button {
          background-color: #5f6762;
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${size}px;
          height: ${size}px;
          border: none;
          border-radius: 50%;
          min-width: ${size}px;
          z-index: 1;
          box-shadow: 0 8px 8px rgb(0 0 0 / 30%);
        }
        .play-Button:focus,
        .play-Button:hover {
          transform: scale(1.06);
          background-color: #7b847e;
        }
        .play-Button:active {
          transform: scale(1);
        }
      `}</style>
    </>
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
            centerSize="16"
            size="34"
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
          bottom: 20px;
          right: 10px;
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
