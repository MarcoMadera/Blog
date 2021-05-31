import Link from "next/link";
import { useRouter } from "next/router";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";
import useDarkMode from "../hooks/useDarkMode";
import styles from "./Navbar.module.css";
function Anchor({ label, href, children, ...attribs }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a aria-label={label} {...attribs}>
        {children}
        <style jsx>{`
          a {
            text-decoration: ${router.route === href && router.route !== "/"
              ? "underline"
              : "none"};
          }
        `}</style>
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

function Nav({ children }) {
  return <nav>{children}</nav>;
}

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={styles.header}>
      <Anchor
        href="/"
        label="Logo Marco Madera, ir a la página principal"
        className="logo"
      >
        <Logo />
      </Anchor>
      <Nav>
        <button
          onClick={() => toggleDarkMode()}
          className="Header__darkMode Header__darkMode-Title"
          aria-label={`Cambiar al tema ${darkMode ? "claro" : "oscuro"}`}
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
        header :global(nav a:hover),
        header :global(nav a:focus) {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
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
