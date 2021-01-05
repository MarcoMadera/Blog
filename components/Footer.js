import Link from "next/link";
import { colors } from "../styles/theme";
import { siteMetadata } from "../site.config";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
const Anchor = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Footer = () => {
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
          display: flex;
          flex-wrap: wrap;
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
          min-height: 80px;
          justify-content: center;
          align-items: center;
          text-align: center;
          flex-wrap: wrap;
        }
        span {
          display: inline-flex;
        }
        footer :global(a) {
          margin: 0 10px;
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </footer>
  );
};

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

export default Footer;
