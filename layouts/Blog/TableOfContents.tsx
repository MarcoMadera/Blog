import { ALink } from "components/tags";
import slugify from "react-slugify";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";
import { ReactElement, useEffect } from "react";
import type { HeadingData } from "types/posts";
import { Li, Ol } from "components/tags";

interface ConstructedTable {
  level: number;
  text: string;
  children: ConstructedTable[];
}

const getmenuHeaderElements = (): Element[] => [
  ...document.querySelectorAll("#headerMenu + ol li a"),
];

function removeClassToMenuHeaders(): void {
  getmenuHeaderElements().forEach((headerElement) => {
    headerElement?.classList.remove("active");
  });
}

function addClassActiveToMenuHeaderWithId(id: string | null): void {
  removeClassToMenuHeaders();
  const menuHeader = document.querySelector(
    `#headerMenu + ol > li a[href="${
      window.history.state.as.split("#")[0]
    }#${id}"]`
  );
  menuHeader?.classList.add("active");
  if (
    menuHeader?.parentElement?.parentElement?.parentElement
      ?.previousElementSibling?.tagName === "A"
  ) {
    menuHeader.parentElement.parentElement.parentElement.previousElementSibling.classList.add(
      "active"
    );
  }
}

export default function TableOfContents({
  headings,
  slug,
}: {
  headings: HeadingData[];
  slug: string;
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

  useEffect(() => {
    let lastIntersection: string | null =
      window.history.state.as.split("#")[1] || null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const headerId = entry.target.getAttribute("id");

          const menuHeaderElement = getmenuHeaderElements().find((element) => {
            return (
              element.getAttribute("href") ===
              `/blog/${slug}#${headerId || lastIntersection}`
            );
          });

          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            addClassActiveToMenuHeaderWithId(headerId);
            lastIntersection = headerId;
            return;
          } else {
            menuHeaderElement?.classList.remove("active");
          }
          addClassActiveToMenuHeaderWithId(lastIntersection);
        });
      },
      {
        rootMargin: `0px 0px -${innerHeight - 160}px 0px`,
        threshold: 1,
      }
    );

    const headings2 = document.querySelectorAll("#main > div h2");
    const headings3 = document.querySelectorAll("#main > div h3");
    [...headings2, ...headings3].forEach((heading) => {
      if (heading) {
        observer.observe(heading);
      }
    });
  }, [slug]);

  return (
    <nav aria-labelledby="headerMenu">
      <section>
        <h2 id="headerMenu">Tabla de contenido</h2>
        {constructedTable?.length > 0 && (
          <ol>
            {constructedTable.map(({ level, text, children }, i) => {
              return (
                <Li key={i} hideListStyle>
                  <ALink
                    href={`#${slugify(text)}`}
                    target="_self"
                    title=""
                    onClick={() => {
                      addClassActiveToMenuHeaderWithId(slugify(text));
                    }}
                  >
                    {text}
                  </ALink>
                  {children.length > 0 && (
                    <div className="childs">
                      <span className="line"></span>
                      <Ol depth={level - 1}>
                        {children.map(({ text }, i) => (
                          <Li key={i} hideListStyle>
                            <ALink
                              href={`#${slugify(text)}`}
                              target="_self"
                              title=""
                              onClick={() => {
                                addClassActiveToMenuHeaderWithId(slugify(text));
                              }}
                            >
                              {text}
                            </ALink>
                          </Li>
                        ))}
                      </Ol>
                    </div>
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
        ol :global(li a.active) {
          color: ${darkMode ? colors.dark_titleColor : colors.titleColor};
          font-weight: 600;
        }
        nav :global(li:hover > a),
        nav :global(li:focus > a) {
          color: ${darkMode ? colors.dark_titleColor : colors.titleColor};
          font-weight: 600;
        }
        nav {
          background-color: ${darkMode ? "rgba(31, 41, 55, 1)" : "#fff"};
          border-color: ${darkMode ? "rgba(31, 41, 55, 1)" : "#e5e7eb"};
        }
      `}</style>
      <style jsx>{`
        :global(body) {
          overflow-x: visible;
        }
        .childs {
          margin: 0;
          display: grid;
          grid-template-columns: 5px minmax(0, 1fr);
          grid-template-rows: auto 1fr;
          justify-content: space-between;
          padding-left: 5px;
          width: 100%;
        }
        ol :global(li ol) {
          margin: 0 0 0 8px;
        }
        .line {
          display: block;
          content: "";
          height: calc(100% - 10px);
          width: 2px;
          background-color: #cccccc4d;
          margin: auto;
          border-radius: 4px;
        }
        nav {
          grid-area: toc;
          padding: 1.5rem;
          border-width: 1px;
          border-radius: 0.5rem;
          border-style: solid;
        }
        nav :global(a) {
          display: block;
          width: revert;
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
        @media screen and (min-width: 1124px) {
          nav {
            position: sticky;
            top: 20px;
            height: fit-content;
            margin-top: 1010px;
          }
        }
      `}</style>
    </nav>
  );
}
