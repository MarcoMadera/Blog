import { ALink } from "components/tags";
import slugify from "react-slugify";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";
import { ReactElement } from "react";
import type { PostWithMedia } from "types/posts";

export default function TableOfContents({
  h2s,
}: Pick<PostWithMedia, "h2s">): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <nav aria-labelledby="headerMenu">
      <section>
        <h2 id="headerMenu">Tabla de contenido</h2>
        {h2s.length > 0 && (
          <ol>
            {h2s.map((item, i) => (
              <li key={i}>
                <ALink href={`#${slugify(item)}`} target="_self" title="">
                  {item}
                </ALink>
              </li>
            ))}
          </ol>
        )}
      </section>
      <style jsx>{`
        h2 {
          color: ${darkMode ? colors.dark_textColor : colors.titleColor};
        }
      `}</style>
      <style jsx>{`
        :global(body) {
          overflow-x: visible;
        }
        ol :global(li.active a) {
          color: ${darkMode ? colors.dark_titleColor : colors.titleColor};
          font-weight: 600;
        }
        nav {
          grid-area: toc;
        }
        nav :global(a) {
          display: block;
          width: fit-content;
        }
        nav :global(a:hover),
        nav :global(a:focus) {
          text-decoration: none;
        }
        h2 {
          font-size: 18px;
          font-weight: 600;
          line-height: 43px;
        }
        li {
          list-style: none;
          margin: 10px 0;
        }
        section {
          position: sticky;
          top: 0px;
        }
      `}</style>
    </nav>
  );
}
