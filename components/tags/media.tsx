import Image, { ImageProps } from "next/image";
import useDarkMode from "hooks/useDarkMode";
import ViewFullImageModal from "../modals/ViewFullImageModal";
import {
  DetailedHTMLProps,
  IframeHTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ImgData } from "types/posts";
import {
  getImageSizeFromCloudUrl,
  isImgFromCloudProvider,
  replaceUrlImgTransformations,
} from "utils/cloudProvider";
import useToolTip from "hooks/useToolTip";

interface ImgProps {
  src?: string;
  alt?: string;
  title?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  fullImage?: Omit<ImgData, "fullImg"> | null;
  className?: string;
}

export function Img({
  src,
  alt = "",
  title,
  blurDataURL,
  width: widthFromProps,
  height: heightFromProps,
  fullImage,
  className,
}: Readonly<ImgProps>): ReactElement | null {
  const [openModal, setOpenModal] = useState(false);
  const { getToolTipAttributes, addToolTip, setShowToolTip } = useToolTip();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (!src) return null;

  const isFromCloudProvider = isImgFromCloudProvider(src);
  function getImageSize({ src }: { src: string }) {
    const imageSizeFromUrl = getImageSizeFromCloudUrl(src) || {};

    const height = heightFromProps ?? imageSizeFromUrl.height;
    const width = widthFromProps ?? imageSizeFromUrl.height;
    return {
      width,
      height,
    };
  }
  const { width, height } = getImageSize({ src });
  const shouldZoomIn =
    fullImage && width ? fullImage.img.width - Number(width) > 100 : false;

  const objectFit = width && height ? "none" : "cover";

  function exitModal() {
    setOpenModal(false);
  }

  function imageLoader({
    src,
    width,
  }: {
    src: string;
    width: number | string;
  }) {
    if (!width) return src;

    return replaceUrlImgTransformations(src, `c_limit,w_${width}`);
  }

  function getImageProps({ src }: { src: string }) {
    const imageProps: ImageProps = {
      alt,
      src,
    };

    if (blurDataURL) {
      imageProps.loader = imageLoader;
      imageProps.placeholder = "blur";
      imageProps.blurDataURL = blurDataURL;
      imageProps.width = Number(width);
      imageProps.height = Number(height);
    }

    if (width && height && !blurDataURL) {
      imageProps.width = Number(width);
      imageProps.height = Number(height);
    }

    if (!width && !height && !blurDataURL) {
      imageProps.fill = true;
      imageProps.style = { objectFit: "cover" };
      imageProps.unoptimized = true;
      imageProps.loader = ({ src }) => src;
    }

    return imageProps;
  }

  const isImgToTheRight = alt.includes("a la derecha");
  const isImgToTheLeft = alt.includes("a la izquierda");
  const float = {
    right: isImgToTheRight,
    left: isImgToTheLeft,
    none: true,
  };
  const floatStyle = Object.entries(float).find(
    (entry) => entry[1]
  )?.[0] as keyof typeof float;

  return (
    <details
      onFocus={(e) => {
        addToolTip({
          title: title ?? alt,
          coords: {
            x: e.target.getClientRects()[0].left,
            y: e.target.getClientRects()[0].top,
          },
        });
        setShowToolTip(true);
      }}
      onBlur={() => setShowToolTip(false)}
    >
      <summary
        ref={detailsRef}
        tabIndex={0}
        role="menuitem"
        onClick={() => setOpenModal(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpenModal(true);
          }
        }}
        aria-label="Expandir imagen"
        style={
          objectFit === "cover"
            ? {
                position: "relative",
                maxWidth: "100%",
              }
            : {}
        }
      >
        {" "}
        {isFromCloudProvider && width && height ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            {...getImageProps({ src })}
            {...getToolTipAttributes(title ?? alt)}
            className={className}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={alt}
            src={src}
            height={height}
            width={width}
            {...getToolTipAttributes(title ?? alt)}
            className={className}
          />
        )}
      </summary>
      {openModal && (
        <ViewFullImageModal
          alt={alt}
          blurDataURL={blurDataURL}
          exitModal={exitModal}
          detailsRef={detailsRef}
          openModal={openModal}
          height={height}
          isFromCloudProvider={isFromCloudProvider}
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
          cursor: ${shouldZoomIn ? "zoom-in" : "pointer"};
        }
        :global(.tweet) summary {
          max-height: 400px;
        }
        details {
          float: ${floatStyle};
          margin: ${isImgToTheRight || isImgToTheLeft ? "10px" : "0 auto"};
          max-width: ${isImgToTheRight || isImgToTheLeft ? "45%" : "100%"};
        }
      `}</style>
      <style jsx>{`
        div :global(img) {
          max-height: calc(100vh - 10vh);
          max-width: calc(100vw - 3rem);
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
          margin: 15px auto;
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
        summary::-webkit-details-marker {
          display: none;
        }
        summary::marker {
          display: none;
        }
        summary :global(img) {
          border-radius: 10px;
          max-height: 100vh;
          max-width: 100%;
          height: auto;
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
}: Readonly<VideoProps>): ReactElement {
  const { darkMode } = useDarkMode();
  const { getToolTipAttributes } = useToolTip();

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={src ?? (darkMode ? dark : light)}
      {...getToolTipAttributes(title ?? "")}
      {...attribs}
    >
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

export function Iframe(
  props: DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >
): ReactElement {
  const [height, setHeight] = useState(props.height);
  const [element, setElement] = useState<HTMLIFrameElement | null>(null);

  function resize(event: MessageEvent) {
    if (event.origin !== "https://caniuse.bitsofco.de") return;
    const data = event.data;
    const parts = data.split(":");

    if (parts[2]) {
      setHeight(parts[2]);
    }
  }

  useEffect(() => {
    if (props.src?.startsWith("https://caniuse.bitsofco.de")) {
      if (element) {
        element.contentWindow?.postMessage(
          "resize",
          "https://caniuse.bitsofco.de"
        );
      }

      window.addEventListener("message", resize);
    }

    return () => {
      window.removeEventListener("message", resize);
    };
  }, [props.src, element]);

  return (
    <iframe
      {...props}
      ref={setElement}
      title={props.title}
      height={height}
      scrolling="no"
    >
      <style jsx>{`
        iframe {
          overflow: hidden;
        }
      `}</style>
    </iframe>
  );
}
