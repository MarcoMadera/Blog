import { tweets } from "../../styles/theme";
import { Img } from "../tags";
import PropTypes from "prop-types";

export function Media({ data }) {
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
          border-radius: 10px;
          overflow: hidden;
          margin-top: 10px;
        }
        .mediacontainer {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(49%, 1fr));
          gap: 1px;
          margin: ${tweets.containerMargin};
        }
        .mediacontainer :global(details) {
          max-height: ${data.length > 2 ? "200px" : "400px"};
        }
        .mediacontainer :global(details summary img) {
          border-radius: 0;
          width: 100%;
        }
        .mediacontainer :global(details:nth-of-type(3)) {
          grid-column-end: ${data.length === 3 ? "span 2" : "unset"};
        }
      `}</style>
    </section>
  );
}

Media.propTypes = {
  data: PropTypes.array,
};
