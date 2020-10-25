import Link from "next/link";
import { colors } from "../styles/theme";
const Footer = () => {
  return (
    <footer>
      <Link href="/newsletter">
        <a>Newsletter</a>
      </Link>
      <a
        href="https://marcomadera.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sitio alternativo
      </a>
      <a
        href="https://marcomadera.com/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
      >
        RSS
      </a>
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
        target="_blank"
        rel="noopener noreferrer"
      >
        Licencia
      </a>
      <span>Marco Madera &copy; 2020</span>
      <style jsx>{`
        footer {
          display: flex;
          flex-wrap: wrap;
          background: ${colors.lightGray};
          min-height: 80px;
          justify-content: center;
          align-items: center;
          text-align: center;
          flex-wrap: wrap;
        }
        span {
          display: inline-flex;
        }
        a {
          margin: 0 10px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
