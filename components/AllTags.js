import { ALink } from "./tags";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import styles from "./AllTags.module.css";
function Heading({ children }) {
  return <h2>{children}</h2>;
}

function Div({ children }) {
  return <div>{children}</div>;
}

export default function AllTags({ tags, title = "Todas las etiquetas" }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div>
        {tags.map((tag) => (
          <ALink
            aria-label={`etiqueta ${tag}`}
            href={`/blog/etiqueta/${slugify(tag)}/`}
            key={tag}
            title=""
          >
            #{tag}
          </ALink>
        ))}
      </div>
    </section>
  );
}

AllTags.propTypes = {
  tags: PropTypes.array,
  title: PropTypes.string,
};
Div.propTypes = {
  children: PropTypes.node,
};
Heading.propTypes = {
  children: PropTypes.node,
};
