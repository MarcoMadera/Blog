import Link from "next/link";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { colors } from "../styles/theme";

const Anchor = ({ tag }) => (
  <Link
    href={"/blog/etiqueta/[slug]/"}
    as={`/blog/etiqueta/${slugify(tag)}/`}
    key={tag}
  >
    <a aria-label={`etiqueta ${tag}`}>#{tag}</a>
  </Link>
);

const Heading = ({ children }) => <h2>{children}</h2>;
const Div = ({ children }) => <div>{children}</div>;

const AllTags = ({ tags, title = "Todas las etiquetas" }) => {
  return (
    <section>
      <Heading>{title}</Heading>
      <Div>
        {tags.map((tag) => (
          <Anchor key={tag} tag={tag} />
        ))}
      </Div>
      <style jsx>{`
        section :global(a) {
          display: block;
          margin: 0 0 3px 0;
          color: ${colors.primary};
          width: fit-content;
        }
        section :global(a:hover) {
          color: ${colors.secondary};
          text-decoration: underline;
        }
        section :global(a:focus) {
          color: ${colors.secondary};
        }
        section :global(div) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        section :global(h2) {
          font-size: 1em;
          margin: 1em 0 1em 0;
          font-weight: 600;
        }
        @media screen and (max-width: 876px) {
          section :global(a) {
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
Heading.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
Div.propTypes = {
  children: PropTypes.node,
};
Anchor.propTypes = {
  tag: PropTypes.string,
};

export default AllTags;
