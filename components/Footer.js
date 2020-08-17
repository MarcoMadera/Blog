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
        <a
          href="https://marcomadera.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sobre mi
        </a>
        <a
          href="https://marcomadera.com/#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contacto
        </a>
        <span>Marco Madera &copy; 2020</span>
      </div>
    </footer>
  );
};

export default Footer;
