import Link from "next/link";
const Footer = () => {
  return (
    <footer>
      <a
        href="https://marcomadera.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sitio alternativo
      </a>
      <Link href="/newsletter">
        <a>Newsletter</a>
      </Link>
      <a
        href="https://marcomadera.com/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
      >
        RSS
      </a>
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/legalcode.es"
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
          position: relative;
          background: #f2f2f2;
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
