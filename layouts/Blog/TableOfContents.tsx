import { ALink } from "components/tags";
import slugify from "react-slugify";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";
import { ReactElement } from "react";
import type { HeadingData } from "types/posts";
import { Li, Ol } from "components/tags";

interface ConstructedTable {
  level: number;
  text: string;
  children: ConstructedTable[];
}

export default function TableOfContents({
  headings,
}: {
  headings: HeadingData[];
}): ReactElement {
  const { darkMode } = useDarkMode();
  const constructedTable: ConstructedTable[] = [];

  headings.forEach(({ text, level }) => {
    const constructedTableItem: ConstructedTable = {
      level,
      text,
      children: [],
    };
    if (level === 2) {
      constructedTable.push(constructedTableItem);
    }
    if (level === 3) {
      const parent = [...constructedTable]
        .reverse()
        .find((item) => item.level === 2);
      if (!parent) return;
      const parentIndex = constructedTable.indexOf(parent);
      constructedTable[parentIndex]?.children.push(constructedTableItem);
    }
  });

  return (
    <nav aria-labelledby="headerMenu">
      <section>
        <h2 id="headerMenu">Tabla de contenido</h2>
        {constructedTable?.length > 0 && (
          <ol>
            {constructedTable.map(({ level, text, children }, i) => {
              return (
                <Li key={i} hideListStyle>
                  <ALink href={`#${slugify(text)}`} target="_self" title="">
                    {text}
                  </ALink>
                  {children.length > 0 && (
                    <Ol depth={level - 1}>
                      {children.map(({ text }, i) => (
                        <Li key={i} hideListStyle>
                          <ALink
                            href={`#${slugify(text)}`}
                            target="_self"
                            title=""
                          >
                            {text}
                          </ALink>
                        </Li>
                      ))}
                    </Ol>
                  )}
                </Li>
              );
            })}
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
        nav :global(li) {
          list-style: none;
          margin: 5px 0;
        }
        section {
          position: sticky;
          top: 0px;
        }
      `}</style>
    </nav>
  );
}
