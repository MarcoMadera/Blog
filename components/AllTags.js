import { ALink } from "./tags";
import PropTypes from "prop-types";
import slugify from "react-slugify";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";

function Heading({ children }) {
  return <h2>{children}</h2>;
}

function Div({ children }) {
  return <div>{children}</div>;
}

export default function AllTags({ tags, title = "Todas las etiquetas" }) {
  const { darkMode } = useDarkMode();
  return (
    <section>
      <Heading>{title}</Heading>
      <Div>
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
      </Div>
      <style jsx>{`
        section :global(h2) {
          color: ${darkMode ? colors.dark_textColor : colors.titleColor};
        }
      `}</style>
      <style jsx>{`
        section :global(a) {
          margin: 0 0 3px 0;
          width: fit-content;
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
