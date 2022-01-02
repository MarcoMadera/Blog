import { ALink } from "../tags";
import ReactDOM from "react-dom";
import { ReactPortal, useEffect, useState } from "react";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import useCookies from "hooks/useCookies";
import useAnalytics from "hooks/useAnalytics";

export default function CookiesModal(): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element | null>();
  const { darkMode } = useDarkMode();
  const { setAcceptedCookies } = useCookies();
  const { trackWithGoogleAnalytics } = useAnalytics();

  useEffect(() => {
    setTargetNode(document.querySelector("#cookiesDialog"));
  }, []);

  if (targetNode === null) {
    throw new Error(
      "CookiesModal needs a target element with id: cookiesDialog"
    );
  }

  if (targetNode === undefined) {
    return null;
  }

  return ReactDOM.createPortal(
    <section>
      <p>
        Utilizo cookies para rastrear la cantidad de personas que visitan mi
        sitio web. Haz clic en aceptar para ayudar a mejorar mi contenido.{" "}
        <ALink href="/cookies" title="Política de cookies">
          Política de cookies
        </ALink>
        .
      </p>
      <div>
        <button
          onClick={() => {
            setAcceptedCookies(false);
          }}
        >
          Rechazar
        </button>
        <button
          onClick={() => {
            trackWithGoogleAnalytics();
            setAcceptedCookies(true);
          }}
        >
          Aceptar
        </button>
      </div>
      <style jsx>{`
        p :global(a) {
          color: ${darkMode ? "#ff2020" : colors.primary};
        }
        section {
          background-color: ${darkMode
            ? colors.dark_accents3
            : colors.accents2};
        }
        button:nth-of-type(2) {
          margin: 0;
          background: ${darkMode ? colors.dark_secondary : colors.primary};
          border-color: ${darkMode ? colors.dark_secondary : colors.primary};
          color: ${colors.white};
        }
        button:nth-of-type(2):hover,
        button:nth-of-type(2):focus {
          text-decoration: none;
          background-color: ${colors.dark_tertiary};
        }
      `}</style>
      <style jsx>{`
        p {
          font-size: 14px;
          margin: 0;
        }
        section {
          position: fixed;
          right: 10px;
          bottom: 10px;
          padding: 10px;
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          width: calc(100% - 20px);
          z-index: 20;
        }
        div {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        button {
          padding: 6px 8px;
          margin-right: 10px;
          font-weight: 400;
          background: transparent;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          color: inherit;
        }
        button:nth-of-type(2) {
          margin: 0;
        }
        button:hover {
          text-decoration: underline;
        }
        button:nth-of-type(2):hover,
        button:nth-of-type(2):focus {
          text-decoration: none;
        }
        @media screen and (min-width: 500px) {
          section {
            max-width: 400px;
          }
        }
      `}</style>
    </section>,
    targetNode
  );
}
