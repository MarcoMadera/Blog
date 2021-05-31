import { A } from "components/tags";
import slugify from "react-slugify";
import PropTypes from "prop-types";
import styles from "./TableOfContents.module.css";

export default function TableOfContents({ content = [] }) {
  return (
    <nav aria-labelledby="headerMenu" className={styles.nav}>
      <section>
        <h2 id="headerMenu">Tabla de contenido</h2>
        {content.length > 0 && (
          <ol>
            {content.map((item, i) => (
              <li key={i}>
                <A title="" href={`#${slugify(item)}`}>
                  {item}
                </A>
              </li>
            ))}
          </ol>
        )}
      </section>
      <style global jsx>{`
        body {
          overflow-x: visible;
        }
      `}</style>
    </nav>
  );
}

TableOfContents.propTypes = {
  content: PropTypes.array,
};
