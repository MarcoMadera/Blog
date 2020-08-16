import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  return (
    <header className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <img src="/favicon-48x48.png" alt="logo" />
          <h3 className={styles.title}>Marco Madera</h3>
        </a>
      </Link>
      <nav>
        <Link href="/portfolio">
          <a
            style={{
              textDecoration: router.route === "/portfolio" && "underline",
            }}
          >
            Portafolio
          </a>
        </Link>
        <Link href="/about">
          <a
            style={{ textDecoration: router.route === "/about" && "underline" }}
          >
            Sobre mí
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
