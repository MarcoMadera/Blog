import Navbar from "./Navbar";
import Footer from "./Footer";
import { PropsWithChildren, ReactElement } from "react";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import useRouterEvents from "hooks/useRouterEvents";
import useLocalStorageState from "hooks/useLocalStorageState";
import ScrollToTop from "./ScrollToTop";
import { A } from "./tags";

export default function Layout({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const { darkMode } = useDarkMode();

  useLocalStorageState();
  useRouterEvents();

  return (
    <>
      <a href="#main">Saltar al contenido</a>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
      <span className="ring">
        <A
          href="https://xn--sr8hvo.ws/%E2%86%98%EF%B8%8F%F0%9F%92%80*%E2%83%A3/previous"
          target="_blank"
          rel="external noopener noreferrer"
          title="Anterior sitio web"
          aria-label="Anterior sitio web"
        >
          ←
        </A>
        Descubre más sitios indie
        <A
          href="https://xn--sr8hvo.ws/%E2%86%98%EF%B8%8F%F0%9F%92%80*%E2%83%A3/next"
          target="_blank"
          rel="external noopener noreferrer"
          title="Siguiente sitio web"
          aria-label="Siguiente sitio web"
        >
          →
        </A>
      </span>
      <style jsx>{`
        :global(html) {
          color-scheme: ${darkMode ? "dark" : "light"};
        }
        :global(body) {
          background: ${darkMode ? colors.cinder : colors.white};
          color: ${darkMode ? colors.greyGoose : colors.davyGrey};
        }
        :global(h1, h2, h3, h4, h5, h6) {
          color: ${darkMode ? colors.geyser : colors.balticSeaDark};
        }
        a,
        .ring {
          background-color: ${darkMode ? colors.charcoalGrey : colors.paleGrey};
        }
      `}</style>
      <style jsx>{`
        a,
        .ring {
          box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 5px;
          color: inherit;
          display: flex;
          font-size: 18px;
          left: 0px;
          margin: 0 auto;
          padding: 1rem 5rem;
          position: fixed;
          right: 0;
          transition: 0.3s ease 0s;
          text-decoration: none;
          width: fit-content;
          z-index: 9999;
          gap: 1rem;
        }
        a {
          top: -280px;
        }
        .ring {
          bottom: -280px;
        }
        a:focus {
          transform: translateY(300px);
        }
        .ring:focus-within {
          transform: translateY(-300px);
        }

        @media print {
          a,
          .ring {
            display: none;
          }
          :global(body) {
            color: ${colors.black};
            background: ${colors.white};
          }
        }
      `}</style>
    </>
  );
}
