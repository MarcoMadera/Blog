import Image from "next/image";
import { imageCloudProvider } from "site.config";
import useDarkMode from "hooks/useDarkMode";
import ViewImage from "./ViewImage";
import { ReactElement, useRef, useState } from "react";
import { ImgData } from "types/posts";

interface ImgProps {
  src?: string;
  alt?: string;
  title?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  fullImage?: Omit<ImgData, "fullImg"> | null;
}

export function Img({
  src,
  alt = "",
  title,
  blurDataURL,
  width: w,
  height: h,
  fullImage,
}: ImgProps): ReactElement | null {
  const [openModal, setOpenModal] = useState(false);

  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (!src) {
    return null;
  }

  const urlHeights = src.startsWith(imageCloudProvider)
    ? src.match(/h_(\d+)/)
    : undefined;
  const urlWidths = src.startsWith(imageCloudProvider)
    ? src.match(/w_(\d+)/)
    : undefined;

  const height =
    h ||
    (src.startsWith(imageCloudProvider) && urlHeights
      ? +urlHeights[1]
      : undefined);

  const width =
    w ||
    (src.startsWith(imageCloudProvider) && urlWidths
      ? +urlWidths[1]
      : undefined);

  const objectFit = width && height ? "none" : "cover";
  const isFromCloudProvider = src.startsWith(imageCloudProvider);
  const specificSize = typeof width == "number" && typeof height === "number";
  const shouldBlurImage = specificSize && typeof blurDataURL === "string";

  function exitModal() {
    setOpenModal(false);
  }

  function imageLoader({ src, width }: { src: string; width: number }) {
    const rest = `${src.replace(
      new RegExp(
        `${imageCloudProvider.replace(/[.*+?^${}()|/[\]\\]/g, "\\$&")}.+?(/)`,
        "g"
      ),
      ""
    )}`;
    return `${imageCloudProvider}/c_limit,w_${width}/${rest}`;
  }

  return (
    <details>
      <summary
        ref={detailsRef}
        tabIndex={0}
        onClick={() => setOpenModal(true)}
        aria-label="Expandir imagen"
        style={
          objectFit === "cover"
            ? {
                position: "relative",
                maxHeight: "380px",
                maxWidth: "100%",
              }
            : {}
        }
      >
        {" "}
        {isFromCloudProvider ? (
          shouldBlurImage ? (
            <Image
              alt={alt}
              loader={imageLoader}
              title={title || alt}
              src={src}
              placeholder="blur"
              layout="intrinsic"
              blurDataURL={blurDataURL as string}
              width={width as number}
              height={height as number}
            />
          ) : specificSize ? (
            <Image
              alt={alt}
              loader={imageLoader}
              title={title || alt}
              src={src}
              layout="intrinsic"
              width={width as number}
              height={height as number}
            />
          ) : (
            <Image
              alt={alt}
              loader={({ src }) => src}
              title={title || alt}
              src={src}
              layout="fill"
              objectFit="cover"
              unoptimized={true}
            />
          )
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={alt}
            src={src}
            title={title || alt}
            height={height}
            width={width}
          />
        )}
      </summary>
      {openModal && (
        <ViewImage
          alt={alt}
          blurDataURL={blurDataURL}
          exitModal={exitModal}
          detailsRef={detailsRef}
          openModal={openModal}
          height={height}
          isFromCloudProvider={isFromCloudProvider}
          shouldBlurImage={shouldBlurImage}
          src={src}
          title={title}
          width={width}
          fullImage={fullImage}
        />
      )}
      <style jsx>{`
        summary :global(img) {
          object-position: ${objectFit === "cover" ? "top" : "unset"};
          object-fit: ${objectFit === "cover" ? "cover" : "unset"};
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
      <style jsx>{`
        div :global(img) {
          max-height: calc(100vh - 10vh);
          max-width: calc(100vw - 3rem);
        }
        summary :global(noscript + img) {
          background-image: unset !important;
        }
        details *:focus {
          outline: none;
          outline-style: none;
        }
        details {
          border: unset;
          display: block;
          overflow: hidden;
          padding: 0;
          max-width: fit-content;
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
          margin: 0 auto;
          padding: 0;
          position: relative;
          max-width: 100%;
        }
        summary > :global(div) {
          border-radius: 10px;
        }
         {
          /*is deprecated but don't remove until most browsers are updated */
        }
        summary::-webkit-details-marker {
          display: none;
        }
        summary::marker {
          display: none;
        }
        summary :global(img) {
          border-radius: 10px;
          cursor: pointer;
          max-height: 100vh;
          max-width: 100%;
        }
        details:focus-within,
        details:active {
          outline-style: dashed;
          outline-width: 2px;
          outline-color: #b50000;
        }
      `}</style>
    </details>
  );
}

interface VideoProps {
  src: string;
  dark?: string;
  light?: string;
  title?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
}

export function Video({
  src,
  dark,
  light,
  title,
  ...attribs
}: VideoProps): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video src={src ?? (darkMode ? dark : light)} title={title} {...attribs}>
      Tu navegador no soporta videos
      <style jsx>{`
        video {
          filter: ${darkMode ? "none" : "brightness(110%)"};
        }
      `}</style>
      <style jsx>{`
        video {
          display: block;
          clip-path: inset(0% 0% 0% 0% round 10px);
          margin: auto;
          max-width: 99%;
        }
      `}</style>
    </video>
  );
}
