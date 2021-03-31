import { colors } from "../styles/theme";
import Link from "next/link";
import PropTypes from "prop-types";
import { siteMetadata } from "../site.config";
import useDarkMode from "../hooks/useDarkMode";
import Twitter from "./icons/Twitter";
import LinkedIn from "./icons/LinkedIn";
import Github from "./icons/Github";

function Anchor({ href, children, ...props }) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}

function Footer() {
  const { darkMode } = useDarkMode();

  return (
    <footer>
      <section>
        <div className="footer_section">
          <strong>Navegación</strong>
          <Link href="/">
            <a>Inicio</a>
          </Link>
          <Link href="/portafolio">
            <a>Portafolio</a>
          </Link>
          <Link href="/sobre-mi">
            <a>Sobre mí</a>
          </Link>
          <Link href="/newsletter">
            <a>Newsletter</a>
          </Link>
        </div>
        <div className="footer_section">
          <strong>Legal</strong>
          <Link href="/cookies">
            <a>Política de cookies</a>
          </Link>
          <Link href="/privacidad">
            <a>Privacidad</a>
          </Link>
          <Anchor href="https://creativecommons.org/licenses/by-sa/4.0/deed.es">
            Licencia
          </Anchor>
        </div>
        <div className="footer_section">
          <strong>Enlaces externos</strong>
          <Anchor href="https://blog.marcomadera.com/">Blog</Anchor>
          <Anchor href="https://github.com/MarcoMadera/Blog">
            Código fuente
          </Anchor>
          <Anchor href="https://marcomadera.github.io/">
            Sitio alternativo
          </Anchor>
          <Anchor href={`${siteMetadata.siteUrl}/rss.xml`}>RSS</Anchor>
        </div>
        <div className="footer_section ">
          <strong>Social</strong>
          <div className="footer_social">
            <Anchor
              href="https://twitter.com/madera_marco"
              aria-label="Visitar la página de Twitter"
            >
              <Twitter
                width={28}
                height={28}
                fill={darkMode ? colors.dark_primary : colors.primary}
              />
            </Anchor>
            <Anchor
              href="https://www.linkedin.com/in/marcomadera"
              aria-label="Visitar la página de LinkedIn"
            >
              <LinkedIn
                width={28}
                height={28}
                fill={darkMode ? colors.dark_primary : colors.primary}
              />
            </Anchor>
            <Anchor
              href="https://github.com/MarcoMadera"
              aria-label="Visitar la página de Github"
            >
              <Github
                width={28}
                height={28}
                fill={darkMode ? colors.dark_primary : colors.primary}
              />
            </Anchor>
          </div>
          <div>
            <span translate="no">Marco Madera &copy; 2020 - 2021</span>
          </div>
        </div>
      </section>
      <style jsx>{`
        .footer_social :global(a:hover svg),
        .footer_social :global(a:focus svg) {
          fill: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        footer {
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
        }
        .footer_section > :global(a:after) {
          background: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
      <style jsx>{`
        strong {
          display: block;
          margin: 1em 0;
        }
        section {
          display: flex;
          flex-wrap: wrap;
          margin: 0 auto;
          grid-gap: 30px;
          max-width: 1000px;
          justify-content: space-between;
        }
        .footer_section :global(a) {
          display: block;
          width: max-content;
          margin: 5px 0;
          color: inherit;
          text-decoration: none;
          position: relative;
        }
        .footer_section > :global(a:after) {
          background: none repeat scroll 0 0 transparent;
          bottom: -1px;
          content: "";
          display: block;
          height: 2px;
          left: 50%;
          position: absolute;
          transition: width 0.15s ease 0s, left 0.1s ease 0s;
          width: 0;
          margin-top: 15px;
        }
        .footer_section > :global(a:hover:after),
        .footer_section > :global(a:focus:after) {
          width: 100%;
          left: 0;
        }
        .footer_social {
          display: flex;
        }
        .footer_social :global(a) {
          margin-right: 20px;
          display: inline-flex;
        }
        footer {
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          min-height: 80px;
          padding: 10px 20px;
        }
        span {
          display: inline-flex;
        }
        @media screen and (min-width: 0px) and (max-width: 500px) {
          section {
            display: block;
            text-align: center;
          }
          .footer_section :global(a) {
            margin: 10px auto;
          }
          .footer_social {
            justify-content: center;
            margin-bottom: 20px;
          }
          .footer_social :global(a) {
            margin: 0 5px;
          }
        }
      `}</style>
    </footer>
  );
}

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

export default Footer;
