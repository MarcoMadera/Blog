import { Button } from "./BlogFooter";
import useDarkMode from "hooks/useDarkMode";
import { ReactPortal, useEffect, useState } from "react";
import { FacebookShare, LinkedInShare, TwitterShare } from "components/icons";
import { siteMetadata } from "site.config";
import { createPortal } from "react-dom";
import useNotification from "hooks/useNotification";

export function ModalShare({
  title,
  slug,
  handleCloseModal,
}: {
  title: string;
  slug: string;
  handleCloseModal: () => void;
}): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element | null>();
  const { addNotification } = useNotification();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setTargetNode(document.querySelector("#global"));
  }, []);

  useEffect(() => {
    document.querySelector("#__next")?.addEventListener(
      "click",
      () => {
        handleCloseModal();
      },
      { once: true }
    );
    return () => {
      document.querySelector("#__next")?.removeEventListener("click", () => {
        handleCloseModal();
      });
    };
  }, [handleCloseModal]);

  if (targetNode === null) {
    throw new Error("CookiesModal needs a target element with id: global");
  }

  if (targetNode === undefined) {
    return null;
  }

  return createPortal(
    <div className="modalShareContainer">
      {/* This component should have a way to share the hyperlink and social media*/}
      <div className="modalShare">
        <div className="modalShare__header">
          <h2>Comparte este post</h2>
        </div>
        <div className="modalShare__body">
          <div className="modalShare__body__socialMedia">
            <Button
              network="Twitter"
              url={`https://twitter.com/share?url=${siteMetadata.siteUrl}/blog/${slug}&text=${title}`}
            >
              <TwitterShare width={30} height={30} />
            </Button>
            <Button
              network="Facebook"
              url={`https://facebook.com/sharer/sharer.php?u=${`${siteMetadata.siteUrl}/blog/${slug}&quote=${title}`}`}
            >
              <FacebookShare width={30} height={30} />
            </Button>
            <Button
              network="LinkedIn"
              url={`http://www.linkedin.com/shareArticle?mini=true&url=${`${siteMetadata.siteUrl}/blog/${slug}`}&title=${title}&source=${
                siteMetadata.siteUrl
              }`}
            >
              <LinkedInShare width={30} height={30} />
            </Button>
          </div>
          <div className="modalShare__body__link">
            <input
              type="text"
              value={`${siteMetadata.siteUrl}/blog/${slug}`}
              readOnly
            />
            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(
                    `${siteMetadata.siteUrl}/blog/${slug}`
                  );
                  addNotification({
                    variant: "success",
                    message: "Se ha copiado el enlace al portapapeles",
                  });
                } catch (error) {
                  addNotification({
                    variant: "error",
                    message: "No se ha podido copiar el enlace",
                  });
                }
              }}
            >
              Copiar
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modalShareContainer {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          width: calc(100% - 20px);
          max-width: 500px;
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          box-shadow: 0 2px 10px 4px #0000001a;
        }
        .modalShareContainer :global(button) {
          margin: 0 10px;
          border: none;
          background: none;
          cursor: pointer;
        }
        .modalShare {
          width: 100%;
          background-color: ${darkMode ? "rgba(31, 41, 55, 1)" : "#fff"};
          border-radius: 4px;
          padding: 30px 20px;
        }
        .modalShare__header {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modalShare__body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .modalShare__body__socialMedia {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
        }
        .modalShare__body__socialMedia :global(button) {
          margin: 0 10px;
          border: none;
          background: none;
          cursor: pointer;
        }
        .modalShare__body__link {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
        }
        .modalShare__body__link :global(input) {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 10px;
          background-color: ${darkMode ? "rgba(31, 41, 55, 1)" : "#fff"};
        }

        .modalShare__body__link :global(button) {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>,
    targetNode
  );
}
