import { ReactElement } from "react";
import { tweets } from "styles/theme";
import type { Media } from "types/tweet";
import { Img } from "../tags";

interface MediaProps {
  data: Media[];
  quoted?: boolean;
}

export function TweetMedia({ data, quoted }: MediaProps): ReactElement {
  return (
    <section>
      <div className="mediacontainer">
        {data.map(({ type, preview_image_url, url }) => {
          if (type === "animated_gif" || type === "video") {
            return <Img key={preview_image_url} src={preview_image_url} />;
          }
          if (type === "photo") {
            return <Img key={url} src={url} />;
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
          max-height: ${data.length > 2 ? "200px" : "400px"};
          min-width: 100%;
        }
        .mediacontainer :global(details summary) {
          height: 100%;
        }
        .mediacontainer :global(details summary img) {
          border-radius: 0;
          width: 100%;
          min-height: 200px;
        }
        :global(.repliedTweet .mediacontainer details summary img) {
          border-radius: 10px;
        }
        .mediacontainer :global(details:nth-of-type(3)) {
          grid-column-end: ${data.length === 3 ? "span 2" : "unset"};
        }
      `}</style>
    </section>
  );
}
