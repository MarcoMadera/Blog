import dynamic from "next/dynamic";
import Image from "next/image";
import { imageCloudProvider } from "../../site.config";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";
import styles from "./media.module.css";
const LoadDetailsDialog = dynamic(() => import("./details-dialog"), {
  ssr: false,
});

export function Img({ src, alt = "", title, width: w, height: h }) {
  if (!src) {
    return null;
  }
  const height =
    h ||
    (src.startsWith(imageCloudProvider) &&
      src.match(/h_(\d+)/) &&
      src.match(/h_(\d+)/)[1]) ||
    undefined;

  const width =
    w ||
    (src.startsWith(imageCloudProvider) &&
      src.match(/w_(\d+)/) &&
      src.match(/w_(\d+)/)[1]) ||
    undefined;

  const layout = width && height ? "intrinsic" : "cover";

  return (
    <details className={styles.details}>
      <summary
        aria-label="Expandir imagen"
        style={
          layout === "cover"
            ? {
                position: "relative",
                maxHeight: "380px",
                maxWidth: "100%",
              }
            : {}
        }
      >
        {src.startsWith(imageCloudProvider) ? (
          <Image
            alt={alt}
            layout={layout}
            height={width && height ? height : undefined}
            width={width && height ? width : undefined}
            objectFit={layout}
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
          />
        ) : (
          <img
            alt={alt}
            src={src}
            title={title || alt}
            height={height ? height : undefined}
            width={width ? width : undefined}
          />
        )}
      </summary>
      <details-dialog>
        <div className="bg" data-close-dialog>
          <div className={styles.imageContainer}>
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
                src={src}
                width={width ? width : undefined}
                height={height ? height : undefined}
                title={title || alt}
              />
            )}
          </div>
        </div>
      </details-dialog>
      <LoadDetailsDialog />
      <style jsx>{`
        summary :global(img) {
          object-position: ${layout === "cover" ? "top" : "unset"};
          object-fit: ${layout === "cover" ? "cover" : "unset"};
        }
        details {
          float: ${alt.includes("a la derecha")
            ? "right"
            : alt.includes("a la izquierda")
            ? "left"
            : "none"};
          margin: ${alt.includes("a la derecha") ||
          alt.includes("a la izquierda")
            ? "10px"
            : "0 auto"};
        }
      `}</style>
    </details>
  );
}

export function Video({ src, dark, light, title, ...attribs }) {
  const { darkMode } = useDarkMode();

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={src ?? (darkMode ? dark : light)}
      title={title}
      className={styles.video}
      {...attribs}
    >
      Tu navegador no soporta videos
      <style jsx>{`
        video {
          filter: ${darkMode ? "none" : "brightness(110%)"};
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
