import Link from "next/link";
import { useRouter } from "next/router";
import { colors } from "styles/theme";
import { Moon, Sun } from "./icons";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import useToolTip from "hooks/useToolTip";
import Search from "./Search";

function Logo() {
  return (
    <>
      <picture>
        <source
          srcSet="/apple-touch-icon-120x120.png"
          media="(max-width: 876px)"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden="true"
          src="/favicon-48x48.png"
          alt="Logo patrón de desbloqueo en forma de M"
          width="40"
          height="40"
        />
      </picture>
      <span aria-hidden="true" translate="no">
        Marco Madera
      </span>
    </>
  );
}

export default function Navbar(): ReactElement {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { getToolTipAttributes } = useToolTip();
  const title = `Cambiar al tema ${darkMode ? "claro" : "oscuro"}`;
  const router = useRouter();

  return (
    <header>
      <Link
        rel="me"
        href="/"
        aria-label="Logo Marco Madera, ir a la página principal"
        className="logo"
      >
        <Logo />
      </Link>
      <div className="search">
        <Search />
      </div>
      <nav>
        <button
          onClick={() => toggleDarkMode()}
          className="Header__darkMode Header__darkMode-Title"
          aria-label={title}
          {...getToolTipAttributes(title)}
        >
          {darkMode ? (
            <Moon
              aria-hidden="true"
              width={16}
              height={16}
              fill="rgb(250, 250, 250)"
            />
          ) : (
            <Sun aria-hidden="true" width={16} height={16} />
          )}
        </button>
        <Link
          href="/portafolio"
          aria-label="Ir al portafolio"
          className={`${router.route === "/portafolio" ? "active" : ""}`}
        >
          Portafolio
        </Link>
        <Link
          href="/sobre-mi"
          aria-label="Ir a sobre mí"
          className={`${router.route === "//sobre-mi" ? "active" : ""}`}
        >
          Sobre mí
        </Link>
      </nav>
      <style global jsx>{`
        .logo {
          display: flex;
          align-items: center;
          user-select: none;
        }
        .logo:hover img,
        .logo:focus img {
          animation: jello-vertical 0.9s both;
        }
        @keyframes jello-vertical {
          0% {
            transform: scale(1, 1);
          }
          30% {
            transform: scale(0.75, 1.25);
          }
          40% {
            transform: scale(1.25, 0.75);
          }
          50% {
            transform: scale(0.85, 1.15);
          }
          65% {
            transform: scale(1.05, 0.95);
          }
          75% {
            transform: scale(0.95, 1.05);
          }
          100% {
            transform: scale(1, 1);
          }
        }
      `}</style>
      <style jsx>{`
        header nav :global(a:hover),
        header nav :global(a:focus) {
          color: ${darkMode ? colors.lavaRed : colors.redBerry};
        }
      `}</style>
      <style jsx>{`
        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          display: inline-flex;
          margin: 8px;
        }
        header {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 0 auto;
          max-width: 1300px;
          padding: 20px;
          gap: 10px;
        }
        header :global(a),
        header nav :global(a) {
          color: inherit;
          text-decoration: none;
        }
        header nav :global(a.active) {
          text-decoration: underline;
        }
        header :global(img) {
          height: 40px;
          margin-right: 10px;
          width: 40px;
        }
        header nav {
          align-items: center;
          display: flex;
        }
        header nav :global(a) {
          display: inline-block;
          margin: 9px 5px;
          min-width: fit-content;
        }
        header nav :global(a:hover),
        header nav :global(a:focus) {
          animation: text-pop-up-top 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }
        header :global(picture) {
          display: inline-flex;
        }
        header :global(span) {
          font-size: 1.17em;
          font-weight: 400;
          margin: 0;
        }
        @keyframes text-pop-up-top {
          0% {
            text-shadow: none;
            transform: translateY(0);
            transform-origin: 50% 50%;
          }
          100% {
            transform: translateY(-2px);
            transform-origin: 50% 50%;
          }
        }
        @media print {
          header {
            justify-content: center;
          }
          header :global(nav) {
            display: none;
          }
        }
        @media (max-width: 648px) {
          header .search {
            order: 3;
            margin: 20px auto 0;
          }

          header nav {
            order: 2;
          }
        }
      `}</style>
    </header>
  );
}
