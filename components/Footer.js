import { colors } from "../styles/theme";
import Link from "next/link";
import PropTypes from "prop-types";
import { siteMetadata } from "../site.config";
import { ThemeContext } from "./Layout";
import { useContext } from "react";

function Anchor({ href, children }) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer>
      <Link href="/newsletter">
        <a>Newsletter</a>
      </Link>
      <Anchor href="https://marcomadera.github.io/">Sitio alternativo</Anchor>
      <Anchor href={`${siteMetadata.siteUrl}/rss.xml`}>RSS</Anchor>
      <Anchor href="https://creativecommons.org/licenses/by-sa/4.0/deed.es">
        Licencia
      </Anchor>
      <span>Marco Madera &copy; 2020 - 2021</span>
      <style jsx>{`
        footer {
          align-items: center;
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          min-height: 80px;
          text-align: center;
        }
        footer :global(a) {
          color: inherit;
          margin: 0 10px;
          text-decoration: none;
        }
        span {
          display: inline-flex;
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
