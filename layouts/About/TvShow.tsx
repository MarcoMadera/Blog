import { ITVFanArt, ITVShowData } from "types/spotify";
import { ReactElement } from "react";
import { siteMetadata } from "site.config";
import { Poster } from "./Poster";

export function TvShow({
  tvShowData,
}: {
  tvShowData: ITVShowData;
}): ReactElement {
  const { title, ids, year } = tvShowData.show;
  function getFanArtUrl(fanArt: ITVFanArt | undefined) {
    function replaceFanArtToPreview(url: string) {
      return url.replace("fanart.tv/fanart", "fanart.tv/preview");
    }
    if (fanArt) {
      const { tvposter, tvthumb, hdtvlogo } = fanArt;
      if (tvposter) {
        return replaceFanArtToPreview(tvposter[0].url);
      } else if (tvthumb) {
        return replaceFanArtToPreview(tvthumb[0].url);
      } else if (hdtvlogo) {
        return replaceFanArtToPreview(hdtvlogo[0].url);
      }
    }
    return `${siteMetadata.siteUrl}/api/tv-show-poster?title=${title}&year=${year}`;
  }

  return (
    <Poster
      href={`https://www.imdb.com/title/${ids.imdb}`}
      title={title}
      eventCategory="tv-show"
      imgSrc={getFanArtUrl(tvShowData.fanArt)}
      label={`IMDB page for ${title}`}
    />
  );
}
