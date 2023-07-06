import { Button } from "./BlogFooter";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import { FacebookShare, LinkedInShare, TwitterShare } from "components/icons";
import { siteMetadata } from "site.config";
import useNotification from "hooks/useNotification";

export function ModalShare({
  title,
  slug,
}: {
  title: string;
  slug: string;
}): ReactElement {
  const { addNotification } = useNotification();
  const { darkMode } = useDarkMode();

  return (
    <div className="modalShareContainer">
      <div className="modalShare__body__socialMedia">
        <Button
          network="Twitter"
          url={`https://twitter.com/share?url=${siteMetadata.siteUrl}/blog/${slug}&text=${title}`}
        >
          <TwitterShare width={30} height={30} />
        </Button>
        <Button
          network="Facebook"
          url={`https://facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/blog/${slug}&quote=${title}`}
        >
          <FacebookShare width={30} height={30} />
        </Button>
        <Button
          network="LinkedIn"
          url={`http://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/blog/${slug}&title=${title}&source=${siteMetadata.siteUrl}`}
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
      <style jsx>{`
        .modalShareContainer :global(button) {
          margin: 0 10px;
          border: none;
          background: none;
          cursor: pointer;
        }
        .modalShare__body__socialMedia {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
        }
        .modalShare__body__link {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
          width: 100%;
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
    </div>
  );
}
