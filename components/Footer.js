import Link from "next/link";
import styles from "./styles/Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
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
      </div>
    </footer>
  );
};

export default Footer;
