import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { colors } from "../styles/theme";
const AllTags = ({ tags, title = "Todas las etiquetas" }) => {
  return (
    <section>
      <h2>{title}</h2>
      <div>
        {tags.map((tag) => (
          <Link
            href={"/blog/etiqueta/[slug]/"}
            as={`/blog/etiqueta/${slugify(tag)}/`}
            key={tag}
          >
            <a aria-label={`etiqueta ${tag}`}>#{tag}</a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        a {
          display: block;
          margin: 0 0 3px 0;
          color: ${colors.primary};
          width: fit-content;
        }
        a:hover {
          color: ${colors.secondary};
          text-decoration: underline;
        }
        a:focus {
          color: ${colors.secondary};
        }
        div {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        h2 {
          font-size: 1em;
          margin: 1em 0;
        }
        @media screen and (max-width: 876px) {
          a {
            padding: 13.5px 5px 13.5px 0;
            min-width: 48px;
            margin: 0;
          }
        }
      `}</style>
    </section>
  );
};

AllTags.propTypes = {
  tags: PropTypes.array,
  title: PropTypes.string,
};

export default AllTags;
