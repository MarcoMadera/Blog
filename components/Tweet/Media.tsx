import { ReactElement } from "react";
import { tweets } from "styles/theme";
import type { TweetData, TweetVideo } from "types/tweet";
import { Img } from "../tags";

interface MediaProps {
  data: Required<TweetData["media"]>;
  quoted?: boolean;
}

export const getMp4Video = (
  media: TweetVideo
): { type: string; src: string } => {
  const { variants } = media;
  const sortedMp4Videos = variants.filter((vid) => vid.type === "video/mp4");

  return sortedMp4Videos[0];
};

export function TweetVideoComponent({
  media,
}: {
  media: TweetVideo;
}): ReactElement {
  const video = getMp4Video(media);

  return (
    <div
      key={media.variants[0].src}
      className="video-wrapper"
      style={{
        paddingBottom: `calc(100% / ${
          media.aspectRatio[0] / media.aspectRatio[1]
        })`,
      }}
    >
      <video controls poster={media.poster}>
        <source src={video.src} type={video.type} />
        Your browser does not support the video tag.
      </video>
      <style jsx>{`
        .video-wrapper {
          position: relative;
          width: 100%;
        }
        .video-wrapper video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      `}</style>
    </div>
  );
}

export function TweetMedia({ data, quoted }: MediaProps): ReactElement {
  return (
    <section>
      <div className="mediacontainer">
        {data?.map((media) => {
          if (
            "type" in media &&
            (media.type === "animated_gif" || media.type === "video")
          ) {
            return (
              <Img
                key={media.preview_image_url}
                src={media.preview_image_url}
              />
            );
          }
          if ("type" in media && media.type === "photo") {
            return <Img key={media.url} src={media.url} />;
          }
          if ("videoId" in media && media.variants.length > 0) {
            return <TweetVideoComponent key={media.videoId.id} media={media} />;
          }
          return null;
        })}
      </div>
      <style jsx>{`
        section {
          border-radius: ${quoted ? "0 0 10px 10px" : "10px"};
          overflow: hidden;
          margin-top: 10px;
        }
        section:focus-within {
          outline-style: dashed;
          outline-width: 3px;
          outline-color: #b50000;
        }
        .mediacontainer {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(49%, 1fr));
          gap: 1px;
          margin: ${tweets.containerMargin};
        }
        .mediacontainer :global(details) {
          max-height: ${data && data.length > 2 ? "200px" : "400px"};
          min-width: 100%;
        }
        .mediacontainer :global(details summary) {
          height: 100%;
        }
        .mediacontainer :global(.video-wrapper video),
        .mediacontainer :global(details summary img) {
          border-radius: 0;
          width: 100%;
          min-height: 200px;
        }
        :global(.repliedTweet .mediacontainer details summary img) {
          border-radius: 10px;
        }
        .mediacontainer :global(.video-wrapper video),
        .mediacontainer :global(details:nth-of-type(3)) {
          grid-column-end: ${data && data.length === 3 ? "span 2" : "unset"};
        }
      `}</style>
    </section>
  );
}
