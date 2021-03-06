import Link from "next/link";
import { useRouter } from "next/router";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";
import useDarkMode from "../hooks/useDarkMode";

function Anchor({ label, href, children, ...attribs }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        aria-label={label}
        {...attribs}
        style={{
          textDecoration:
            router.route === href && router.route !== "/"
              ? "underline"
              : undefined,
        }}
      >
        {children}
      </a>
    </Link>
  );
}

function Logo() {
  return (
    <>
      <picture>
        <source
          srcSet="/apple-touch-icon-120x120.png"
          media="(max-width: 876px)"
        />
        <img
          src="/favicon-48x48.png"
          alt="Logo patrón de desbloqueo en forma de M"
          width="40"
          height="40"
        />
      </picture>
      <span translate="no">Marco Madera</span>
    </>
  );
}

function Nav({ children }) {
  return <nav>{children}</nav>;
}

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header>
      <Anchor href="/" label="Ir a la página principal" className="logo">
        <Logo />
      </Anchor>
      <Nav>
        <button
          onClick={() => toggleDarkMode()}
          className="Header__darkMode Header__darkMode-Title"
          aria-label={`Cambiar al tema ${darkMode ? "claro" : "oscuro"}`}
        >
          {darkMode ? (
            <Moon width={16} height={16} fill="rgb(250, 250, 250)" />
          ) : (
            <Sun width={16} height={16} />
          )}
        </button>
        <Anchor href="/portafolio" label="Ir al portafolio">
          Portafolio
        </Anchor>
        <Anchor href="/sobre-mi" label="Ir a sobre mí">
          Sobre mí
        </Anchor>
      </Nav>
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
        }
        header :global(a),
        header :global(nav a) {
          color: inherit;
          text-decoration: none;
        }
        header :global(img) {
          height: 40px;
          margin-right: 10px;
          width: 40px;
        }
        header :global(nav) {
          align-items: center;
          display: flex;
        }
        header :global(nav a) {
          display: inline-block;
          margin: 9px 5px;
          min-width: fit-content;
        }
        header :global(nav a:hover),
        header :global(nav a:focus) {
          animation: text-pop-up-top 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
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
      `}</style>
    </header>
  );
}

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  label: PropTypes.string,
};
Nav.propTypes = {
  children: PropTypes.node,
};
