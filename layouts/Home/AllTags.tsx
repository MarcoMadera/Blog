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
      <div>
        {allTags.map((tag) => (
          <ALink
            aria-label={`etiqueta ${tag}`}
            href={`/blog/etiqueta/${slugify(tag)}/`}
            key={tag}
            title=""
            prefetch={false}
          >
            {tag}
          </ALink>
        ))}
      </div>
      <style jsx>{`
        section h2 {
          color: ${darkMode ? colors.dark_textColor : colors.titleColor};
        }
      `}</style>
      <style jsx>{`
        section :global(a) {
          margin: 0 0 3px 0;
          width: fit-content;
        }
        section div {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        section h2 {
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
