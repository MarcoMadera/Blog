import { colors } from "../styles/theme";
import Link from "next/link";
import PropTypes from "prop-types";
import { siteMetadata } from "../site.config";
import useDarkMode from "../hooks/useDarkMode";
import Twitter from "./icons/Twitter";
import LinkedIn from "./icons/LinkedIn";
import Github from "./icons/Github";
import styles from "./Footer.module.css";
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
    <footer className={styles.footer}>
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
    </footer>
  );
}

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

export default Footer;
