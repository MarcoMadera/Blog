import dynamic from "next/dynamic";
import Image from "next/image";
import { imageCloudProvider } from "../../site.config";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";

const LoadDetailsDialog = dynamic(
  () => import("../../static-tweet/components/twitter-layout/details-dialog"),
  {
    ssr: false,
  }
);

export function Img({ src, alt = "", title, width: w, height: h }) {
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
      <summary aria-label="Expandir imagen">
        {src.startsWith(imageCloudProvider) ? (
          <div
            style={
              layout === "fill"
                ? {
                    position: "relative",
                    height: "380px",
                    width: "705px",
                  }
                : {}
            }
          >
            <Image
              alt={alt}
              layout={layout}
              height={(width && height && height) || undefined}
              objectFit={layout === "fill" && "fill"}
              quality={100}
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
              title={title || alt}
              width={(width && height && width) || undefined}
            />
          </div>
        ) : (
          <img
            alt={alt}
            height={height ? height : undefined}
            src={src}
            title={title || alt}
            width={width ? width : undefined}
          />
        )}
      </summary>
      <details-dialog>
        <div className="bg" data-close-dialog>
          <div className="imageContainer">
            {src.startsWith(imageCloudProvider) ? (
              <Image
                alt={alt}
                layout="fill"
                loading="lazy"
                objectFit="scale-down"
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
                title={title || alt}
              />
            ) : (
              <img
                alt={alt}
                height={height ? height : undefined}
                src={src}
                width={width ? width : undefined}
                title={title || alt}
              />
            )}
          </div>
        </div>
      </details-dialog>
      <LoadDetailsDialog />
      <style jsx>{`
        div :global(img) {
          max-height: calc(100vh - 10vh);
          max-width: calc(100vw - 3rem);
        }
        details *:focus {
          outline: none;
          outline-style: none;
        }
        .imageContainer {
          display: block;
          height: 100%;
          max-width: calc(100vw - 30px);
          max-height: calc(100vh - 20px);
          position: relative;
          width: 100%;
        }
        details {
          border: unset;
          display: block;
          float: ${alt.includes("a la derecha")
            ? "right"
            : alt.includes("a la izquierda")
            ? "left"
            : "none"};
          margin: ${alt.includes("a la derecha") ||
          alt.includes("a la izquierda")
            ? "10px"
            : "0"};
          overflow: hidden;
          padding: 0;
          width: ${alt.includes("a la derecha") ||
          alt.includes("a la izquierda")
            ? "max-content"
            : "auto"};
        }
        details[open] {
          padding: 0;
        }
        details[open] summary {
          border: unset;
        }
        summary {
          border: unset;
          display: flex;
          justify-content: center;
          list-style: none;
          margin: 0 !important;
          padding: 0;
          position: relative;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        summary :global(img) {
          border-radius: 10px;
          cursor: pointer;
          max-height: 100vh;
          max-width: 100%;
        }
        :global(details-dialog) {
          box-sizing: border-box;
          height: 100vh;
          left: 50%;
          position: fixed;
          transform: translateX(-50%);
          text-align: center;
          top: 0;
          width: 100vw;
          z-index: 999;
        }
        details[open] :global(details-dialog) > .bg {
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          padding: 5vh 1.5rem;
          position: fixed;
          right: 0;
          top: 0;
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
}

export function Video({ src, dark, light, title, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video src={src ?? (darkMode ? dark : light)} title={title} {...attribs}>
      Tu navegador no soporta videos
      <style jsx>{`
        video {
          display: block;
          clip-path: inset(0% 0% 0% 0% round 10px);
          filter: ${darkMode ? "none" : "brightness(110%)"};
          margin: auto;
          max-width: 99%;
        }
      `}</style>
    </video>
  );
}

Img.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Video.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  dark: PropTypes.string,
  light: PropTypes.string,
};
