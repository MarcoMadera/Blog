import { ALink } from "./tags";
import PropTypes from "prop-types";
import slugify from "react-slugify";

function Heading({ children }) {
  return <h2>{children}</h2>;
}

function Div({ children }) {
  return <div>{children}</div>;
}

export default function AllTags({ tags, title = "Todas las etiquetas" }) {
  return (
    <section>
      <Heading>{title}</Heading>
      <Div>
        {tags.map((tag) => (
          <ALink
            as={`/blog/etiqueta/${slugify(tag)}/`}
            aria-label={`etiqueta ${tag}`}
            href={"/blog/etiqueta/[tag]/"}
            key={tag}
            title=""
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
          line-height: 43px;
          font-size: 1em;
          font-weight: 600;
        }
        @media screen and (max-width: 876px) {
          section :global(a) {
            margin: 0;
            min-width: 48px;
            padding: 13.5px 5px 13.5px 0;
          }
        }
      `}</style>
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
