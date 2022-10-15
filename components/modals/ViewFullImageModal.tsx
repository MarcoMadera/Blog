import { createPortal } from "react-dom";
import {
  ReactPortal,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image, { ImageProps } from "next/image";
import type { ImgData } from "types/posts";
import { getClientSize } from "utils";
import useLockBodyScroll from "hooks/useLockBodyScroll";
import { replaceUrlImgTransformations } from "utils/cloudProvider";
import useToolTip from "hooks/useToolTip";

interface ViewImageProps {
  openModal: boolean;
  exitModal: () => void;
  isFromCloudProvider: boolean;
  alt: string;
  src: string;
  title?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  detailsRef: RefObject<HTMLDetailsElement>;
  fullImage?: Omit<ImgData, "fullImg"> | null;
}

export default function ViewFullImageModal({
  openModal,
  exitModal,
  isFromCloudProvider,
  alt,
  src,
  detailsRef,
  title,
  blurDataURL,
  width,
  height,
  fullImage,
}: ViewImageProps): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element | null>();
  const exitButtonRef = useRef<HTMLButtonElement>(null);
  const { getToolTipAttributes } = useToolTip();
  useLockBodyScroll();

  const onPressKey = useCallback(
    (event: KeyboardEvent) => {
      const firstElement = exitButtonRef.current;
      if (event.key === "Escape") {
        exitModal();
        detailsRef.current?.focus();
      }
      if (!event.shiftKey && event.key !== "Enter") {
        firstElement?.focus();
        return event.preventDefault();
      }
      if (event.shiftKey && event.key === "Tab") {
        firstElement?.focus();
        event.preventDefault();
      }
      return;
    },
    [exitModal, detailsRef]
  );

  useEffect(() => {
    setTargetNode(document.querySelector("#global"));
    document.addEventListener("keydown", onPressKey, false);

    return () => {
      document.removeEventListener("keydown", onPressKey, false);
    };
  }, [onPressKey]);

  if (targetNode === null) {
    throw new Error(
      "ViewFullImageModal needs a target element with id: global"
    );
  }

  if (targetNode === undefined) {
    return null;
  }

  const imageHeight = fullImage?.img.height ?? 0;
  const imageWidth = fullImage?.img.width ?? 0;

  const { widthPercent, heightPercent } = getClientSize(
    imageWidth,
    imageHeight
  );

  function myLoader({ src, width }: { src: string; width: number }) {
    if (!width) {
      return src;
    }

    return replaceUrlImgTransformations(src, `c_limit,w_${width}`);
  }

  const imageProps: ImageProps = {
    alt,
    layout: "fill",
    objectFit: "scale-down",
    src: fullImage?.img.src || src,
  };

  if (fullImage?.base64 || blurDataURL) {
    imageProps.placeholder = "blur";
    imageProps.loader = myLoader;
    imageProps.blurDataURL = fullImage?.base64 ?? blurDataURL;
  }

  return createPortal(
    <div className="bgcontainer">
      <div
        className="bg"
        onClick={() => {
          exitModal();
          detailsRef.current?.focus();
        }}
        aria-checked={openModal}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            exitModal();
            detailsRef.current?.focus();
          }
        }}
        role="switch"
        tabIndex={0}
      >
        <div className="imageContainer">
          {isFromCloudProvider ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image {...imageProps} {...getToolTipAttributes(title || alt)} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={alt}
              src={fullImage?.img.src || src}
              width={width ? width : undefined}
              height={height ? height : undefined}
              {...getToolTipAttributes(title || alt)}
            />
          )}
        </div>
        <button
          ref={exitButtonRef}
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            exitModal();
            detailsRef.current?.focus();
          }}
          {...getToolTipAttributes("Cerrar")}
        ></button>
      </div>
      <style jsx>{`
        .imageContainer :global(img) {
          background-size: cover;
        }
        .bgcontainer {
          box-sizing: border-box;
          height: 100vh;
          left: 50%;
          width: 100vw;
          position: fixed;
          transform: translateX(-50%);
          text-align: center;
          top: 0;
          z-index: 999;
        }
        .bg {
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
          z-index: -1;
        }
        .imageContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: calc(100vw - 30px);
          max-height: calc(100vh - 20px);
          position: relative;
          object-fit: scale-down;
          height: ${heightPercent > 0 ? heightPercent + "%" : "100%"};
          width: ${widthPercent > 0 ? widthPercent + "%" : "100%"};
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        button {
          position: fixed;
          top: 20px;
          right: 20px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          background: rgba(0, 0, 0, 0.6);
          width: 50px;
          height: 50px;
          cursor: pointer;
          border: none;
        }
        button:after,
        button:before {
          display: block;
          content: "";
          width: 25px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
        }
        button:after {
          transform: translateX(-12.5px) rotate(135deg);
        }
        button:before {
          transform: translateX(12.5px) rotate(45deg);
        }
        button:focus,
        button:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @media screen and (max-width: 450px) {
          .bgcontainer {
            padding: 5vh 1rem;
          }
        }
      `}</style>
    </div>,
    targetNode
  );
}
