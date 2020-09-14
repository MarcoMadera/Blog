import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
const AllTags = ({ tags, title = "Todas las etiquetas" }) => {
  return (
    <div>
      <strong>
        <p>{title}</p>
      </strong>
      <section>
        {tags.map((tag) => (
          <Link
            href={"/blog/tag/[slug]/"}
            as={`/blog/tag/${slugify(tag)}/`}
            key={tag}
          >
            <a aria-label={`etiqueta ${tag}`}>#{tag}</a>
          </Link>
        ))}
      </section>
      <style jsx>{`
        a {
          display: block;
          margin: 0 0 3px 0;
          color: #da0000;
          width: fit-content;
        }
        a:hover {
          color: #e74c3ccb;
          text-decoration: underline;
        }
        section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        @media screen and (max-width: 876px) {
          a {
            padding: 13.5px 5px 13.5px 0;
            min-width: 48px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

AllTags.propTypes = {
  tags: PropTypes.array,
  title: PropTypes.string,
};

export default AllTags;
