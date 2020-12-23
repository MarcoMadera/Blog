import PropTypes from "prop-types";
import slugify from "react-slugify";
import { ALink } from "./tags";

const Heading = ({ children }) => <h2>{children}</h2>;
const Div = ({ children }) => <div>{children}</div>;

const AllTags = ({ tags, title = "Todas las etiquetas" }) => {
  return (
    <section>
      <Heading>{title}</Heading>
      <Div>
        {tags.map((tag) => (
          <ALink
            key={tag}
            title=""
            href={"/blog/etiqueta/[slug]/"}
            as={`/blog/etiqueta/${slugify(tag)}/`}
            aria-label={`etiqueta ${tag}`}
          >
            #{tag}
          </ALink>
        ))}
      </Div>
      <style jsx>{`
        section :global(a) {
          margin: 0 0 3px 0;
          width: min-content;
        }
        section :global(div) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        section :global(h2) {
          font-size: 1em;
          font-weight: 600;
          margin: 1em 0 1em 0;
        }
        @media screen and (max-width: 876px) {
          section :global(a) {
            padding: 13.5px 5px 13.5px 0;
            margin: 0;
            min-width: 48px;
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
Heading.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
Div.propTypes = {
  children: PropTypes.node,
};
export default AllTags;
