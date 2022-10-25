import { ALink } from "components/tags";
import slugify from "react-slugify";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import type { HomeData, PostWithMedia } from "types/posts";

interface AllTagsProps {
  allTags: PostWithMedia["tags"] | HomeData["allTags"];
  title?: string;
}

export default function AllTags({
  allTags,
  title = "Todas las etiquetas",
}: AllTagsProps): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <section>
      <h2>{title}</h2>
      <div className="tags">
        {allTags.map((tag) => (
          <ALink
            aria-label={`etiqueta ${tag}`}
            href={`/blog/etiqueta/${slugify(tag)}/`}
            key={tag}
            title=""
            prefetch={false}
            rel="category tag"
            className="p-category"
          >
            {tag}
          </ALink>
        ))}
      </div>
      <style jsx>{`
        section h2 {
          color: ${darkMode ? colors.greyGoose : colors.balticSeaDark};
        }
      `}</style>
      <style jsx>{`
        section :global(a) {
          margin: 0 0 3px 0;
          width: fit-content;
        }
        section div {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 2rem;
        }
        section h2 {
          color: ${darkMode ? colors.greyGoose : colors.davyGrey};
          margin-bottom: 1.6rem;
        }
        .tags :global(a) {
          padding: 0.45rem 0.7rem;
          border-radius: 0.3rem;
          background-color: ${darkMode
            ? "rgba(31, 41, 55, 1)"
            : colors.whiteSmoke};
          color: ${darkMode ? colors.greyGoose : colors.black};
          font-size: 1rem;
          font-weight: 400;
          text-decoration: none;
          transition: 0.3s ease-in-out;
          outline: 3px solid transparent;
        }
        .tags :global(a:hover),
        .tags :global(a:focus),
        .tags :global(a:focus-within) {
          outline: 3px solid ${colors.guardsmanRed};
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
