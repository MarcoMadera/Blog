import { memo, ReactElement } from "react";
import { colors } from "styles/theme";
import { Spotify } from "components/icons";
import MusicCard from "./MusicCard";
import { Hr } from "components/tags";
import type { SongData } from "types/spotify";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";

interface MusicHeaderProps extends SongData {
  header: string;
}

function MusicHeader({
  artist,
  cover,
  header,
  songUrl,
  title,
  uri,
  preview,
  explicit,
}: MusicHeaderProps): ReactElement {
  const { trackWithGoogleAnalytics } = useAnalytics();
  return (
    <>
      <header>
        <h2>{header}</h2>
        <a
          href="https://open.spotify.com/user/12133024755"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil de Spotify"
          onClick={() => {
            trackWithGoogleAnalytics(HitType.SOCIAL, {
              socialNetwork: "spotify",
              socialAction: "click",
              socialTarget: "https://open.spotify.com/user/12133024755",
            });
          }}
        >
          <Spotify width="26" height="26" fill={colors.spotify} />
        </a>
      </header>
      <MusicCard
        uri={uri}
        title={title}
        cover={cover}
        artist={artist}
        songUrl={songUrl}
        preview={preview}
        explicit={explicit}
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
          margin-top: 10px;
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
