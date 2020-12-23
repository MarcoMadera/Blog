import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
import { imageCloudProvider } from "../../site.config";
const LoadDetailsDialog = dynamic(
  () => import("../../static-tweet/components/twitter-layout/details-dialog"),
  {
    ssr: false,
  }
);

export const Img = ({ src, alt = "", title, width: w, height: h }) => {
  const height =
    h ||
    (src.startsWith(imageCloudProvider) &&
      src.match(/h_(\d+)/) &&
      src.match(/h_(\d+)/)[1]);
  const width =
    w ||
    (src.startsWith(imageCloudProvider) &&
      src.match(/w_(\d+)/) &&
      src.match(/w_(\d+)/)[1]);
  const layout = width && height ? "intrinsic" : "fill";
  return (
    <details>
      <summary>
        {src.startsWith(imageCloudProvider) ? (
          <div
            style={
              layout === "fill"
                ? {
                    position: "relative",
                    width: "705px",
                    height: "380px",
                  }
                : {}
            }
          >
            <Image
              layout={layout}
              alt={alt}
              width={(width && height && width) || undefined}
              height={(width && height && height) || undefined}
              title={title || alt}
              quality={100}
              objectFit={layout === "fill" && "fill"}
              src={`${src.replace(
                new RegExp(
                  `${imageCloudProvider.replace(
                    /[.*+?^${}()|/[\]\\]/g,
                    "\\$&"
                  )}.+?(/)`,
                  "g"
                ),
                ""
              )}`}
            />
          </div>
        ) : (
          <img
            alt={alt}
            title={title || alt}
            src={src}
            width={width}
            height={height}
          />
        )}
      </summary>
      <details-dialog>
        <div className="bg" data-close-dialog>
          <div className="imageContainer">
            {src.startsWith(imageCloudProvider) ? (
              <Image
                layout="fill"
                loading="lazy"
                alt={alt}
                objectFit="scale-down"
                title={title || alt}
                src={`${src.replace(
                  new RegExp(
                    `${imageCloudProvider.replace(
                      /[.*+?^${}()|/[\]\\]/g,
                      "\\$&"
                    )}.+?(/)`,
                    "g"
                  ),
                  ""
                )}`}
              />
            ) : (
              <img
                alt={alt}
                title={title || alt}
                src={src}
                width={width}
                height={height}
              />
            )}
          </div>
        </div>
      </details-dialog>
      <LoadDetailsDialog />
      <style jsx>{`
        div :global(img) {
          max-width: calc(100vw - 3rem);
          max-height: calc(100vh - 10vh);
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
        summary :global(img) {
          max-height: 100vh;
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
  const { darkMode } = useContext(ThemeContext);
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video src={src} title={title} {...attribs}>
      Tu navegador no soporta videos
      <style jsx>{`
        video {
          filter: ${darkMode ? "none" : "brightness(110%)"};
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
  width: PropTypes.number,
  height: PropTypes.number,
};
Video.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};
