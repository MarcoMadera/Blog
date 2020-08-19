import Link from "next/link";
import slugify from "react-slugify";
import styles from "./styles/Contents.module.css";
const Contents = ({ content, post }) => {
  return (
    <section className={styles.aside}>
      <div className={styles.container}>
        <h3>Tabla de contenido</h3>
        {content.map((element, i) => (
          <Link key={i} href={`./${post}/#${slugify(element)}`}>
            <a className={styles.link}>{element}</a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Contents;
