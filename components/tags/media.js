import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
const LoadDetailsDialog = dynamic(
  () => import("../../static-tweet/components/twitter-layout/details-dialog"),
  {
    ssr: false,
  }
);

export const Img = ({ src, alt = "", title }) => {
  return (
    <details>
      <summary>
        <img loading="lazy" alt={alt} title={title || alt} src={src} />
      </summary>
      <details-dialog>
        <div className="bg" data-close-dialog>
          <div className="imageContainer">
            <Image
              layout="fill"
              loading="lazy"
              alt={alt}
              title={title || alt}
              src={`${
                src.startsWith("https://res.cloudinary.com/marcomadera")
                  ? src.replace(
                      /(https:\/\/res.cloudinary.com\/marcomadera\/image\/upload\/).*?(\/)/g,
                      "$2"
                    )
                  : src
              }`}
            />
          </div>
        </div>
      </details-dialog>
      <LoadDetailsDialog />
      <style jsx>{`
        div :global(img) {
          object-fit: scale-down;
        }
        details *:focus {
          outline: none;
          outline-style: none;
        }
        .imageContainer {
          width: 100%;
          max-width: calc(100vw - 30px);
          max-height: calc(100vh - 20px);
          height: 100%;
          display: block;
          position: relative;
        }
        details {
          display: block;
          float: ${alt.includes("a la derecha")
            ? "right"
            : alt.includes("a la izquierda")
            ? "left"
            : "none"};
          height: 100%;
          overflow: hidden;
          border: unset !important;
          width: ${alt.includes("a la derecha") ||
          alt.includes("a la izquierda")
            ? "max-content"
            : "auto"};
          margin: ${alt.includes("a la derecha") ||
          alt.includes("a la izquierda")
            ? "10px"
            : "0"};
          padding: 0;
        }
        details[open] {
          padding: 0 !important;
        }
        details[open] summary {
          border: unset !important;
        }
        summary {
          position: relative;
          list-style: none;
          border: unset;
          display: flex;
          justify-content: center;
          padding: 0;
          margin: 0 !important;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        summary > img {
          max-height: 100vh;
          object-fit: cover;
          cursor: pointer;
          border-radius: 10px;
          max-width: 100%;
        }
        :global(details-dialog) {
          position: fixed;
          top: 0;
          left: 50%;
          width: 100vw;
          height: 100vh;
          box-sizing: border-box;
          text-align: center;
          transform: translateX(-50%);
          z-index: 999;
        }
        details[open] :global(details-dialog) > .bg {
          padding: 5vh 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          background: rgba(0, 0, 0, 0.3);
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: -1;
        }
        @media screen and (max-width: 450px) {
          :global(details-dialog) {
            padding: 5vh 1rem;
          }
        }
      `}</style>
    </details>
  );
};

export const Video = ({ src, title, ...attribs }) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video src={src} title={title} {...attribs}>
      Tu navegador no soporta videos
      <style jsx>{`
        video {
          filter: brightness(110%);
          display: block;
          margin: auto;
          max-width: 99%;
          clip-path: inset(0% 0% 0% 0% round 10px);
        }
      `}</style>
    </video>
  );
};

Img.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
};
Video.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};
