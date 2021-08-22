import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactElement, ReactNode } from "react";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import CookiesModal from "./modals/CookiesModal";
import useCookies from "hooks/useCookies";
import NotificationsModal from "./modals/NotificationsModal";
import useRouterEvents from "hooks/useRouterEvents";
import useLocalStorageState from "hooks/useLocalStorageState";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const { darkMode } = useDarkMode();
  const { acceptedcookies } = useCookies();

  useLocalStorageState();
  useRouterEvents();

  return (
    <>
      <a href="#main">Saltar al contenido</a>
      <NotificationsModal />
      <Navbar />
      {children}
      <Footer />
      {acceptedcookies === undefined ? <CookiesModal /> : null}
      <style jsx>{`
        :global(html) {
          color-scheme: ${darkMode ? "dark" : "light"};
        }
        :global(body) {
          background: ${darkMode ? colors.dark_background : colors.background};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
        :global(h1, h2, h3, h4, h5, h6) {
          color: ${darkMode ? colors.dark_titleColor : colors.titleColor};
        }
        a {
          background-color: ${darkMode
            ? colors.dark_accents2
            : colors.accents2};
        }
      `}</style>
      <style jsx>{`
        a {
          box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 5px;
          color: inherit;
          display: block;
          font-size: 18px;
          left: 0px;
          margin: 0 auto;
          padding: 1rem 5rem;
          position: fixed;
          right: 0;
          transition: 0.3s ease 0s;
          text-decoration: none;
          top: -280px;
          width: fit-content;
          z-index: 9999;
        }
        a:focus {
          transform: translateY(300px);
        }
        @media print {
          a {
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
