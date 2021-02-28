import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { colors } from "../styles/theme";
import useDarkMode from "../hooks/useDarkMode";
import CookiesModal from "./CookiesModal";
import useCookies from "../hooks/useCookies";
export default function Layout({ children }) {
  const { darkMode, setDarkMode } = useDarkMode();
  const { acceptedcookies, setAcceptedCookies, track } = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }

    if (localStorage.getItem("cookiesAccepted") === "true") {
      track("pageview");
      setAcceptedCookies(true);
    }
    if (localStorage.getItem("cookiesAccepted") === "false") {
      setAcceptedCookies(false);
    }
  }, [setAcceptedCookies, setDarkMode, track]);

  useEffect(() => {
    // update page url minimal google analytics
    const handleRouteChange = () => {
      if (acceptedcookies === true) {
        track("pageview");
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    // Reset focus on page change
    router.events.on("routeChangeStart", () => {
      document.body.setAttribute("tabIndex", "-1");
    });

    document.body.addEventListener("blur", () => {
      document.body.removeAttribute("tabIndex");
    });
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, acceptedcookies, track]);

  return (
    <>
      <a href="#main">Saltar al contenido</a>
      <Navbar />
      {children}
      <Footer />
      {acceptedcookies === undefined ? (
        <CookiesModal setAcceptedCookies={setAcceptedCookies} />
      ) : (
        ""
      )}
      <style global jsx>{`
        body {
          background: ${darkMode ? colors.dark_background : colors.background};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
        @media print {
          body {
            color: ${colors.black};
            background: ${colors.white};
          }
        }
      `}</style>
      <style jsx>{`
        a {
          background-color: ${darkMode
            ? colors.dark_accents2
            : colors.accents2};
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
        }
        a:focus {
          transform: translateY(300px);
        }
        @media print {
          a {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
