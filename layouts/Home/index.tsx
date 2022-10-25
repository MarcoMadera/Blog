import AllTags from "./AllTags";
import ProfileCard from "./ProfileCard";
import BlogCard from "./BlogCard";
import { colors } from "styles/theme";
import Custom404 from "pages/404";
import NewsletterCard from "components/Newsletter/NewsletterCard";
import Seo from "components/Seo";
import useDarkMode from "hooks/useDarkMode";
import { siteMetadata } from "site.config";
import slugify from "react-slugify";
import type { HomeData } from "types/posts";
import { ReactElement } from "react";
import { ALink } from "components/tags";
import MicroMemories from "components/MicroMemories";

interface HomeLayoutProps extends HomeData {
  title: string;
}

export default function HomeLayout({
  posts = [],
  allTags = [],
  pages = [],
  currentPage,
  title,
  tag,
  microMemories,
}: HomeLayoutProps): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <main id="main">
      <Seo
        title={title}
        canonical={currentPage !== 1 ? siteMetadata.siteUrl : undefined}
      />
      <section>
        <ProfileCard />
        <div className="h-feed">
          <h2 className="p-name">
            {tag
              ? `Etiqueta ${posts[0].tags.find((item) =>
                  slugify(item).includes(tag)
                )}`
              : "Últimos artículos"}
          </h2>
          <div className="posts">
            {posts.map((data) => (
              <BlogCard {...data} key={data.slug} />
            ))}
          </div>
        </div>
        {posts.length <= 0 && <Custom404 />}
        <nav aria-label="Paginación">
          <ol>
            {pages.map((pageNumber, i) => {
              const isCurrentPage = pageNumber === currentPage;
              const title = isCurrentPage
                ? "Página actual"
                : `Ir a página ${pageNumber}`;
              return (
                <li key={pageNumber}>
                  <ALink
                    className={isCurrentPage ? "currentPage" : "pagination"}
                    prefetch={false}
                    href={i === 0 ? "/" : `/pagina/${pageNumber}`}
                    aria-label={title}
                    title={title}
                    aria-current={isCurrentPage ? "true" : undefined}
                  >
                    {pageNumber}
                  </ALink>
                </li>
              );
            })}
          </ol>
        </nav>
      </section>
      <aside>
        <AllTags allTags={allTags} />
        <MicroMemories microMemories={microMemories} />
        <NewsletterCard />
      </aside>
      <style jsx>{`
        nav :global(a) {
          color: ${darkMode ? colors.deepCarminPink : colors.guardsmanRed};
        }
        nav :global(.pagination:hover) {
          color: ${darkMode ? colors.lavaRed : colors.redBerry} !important;
        }
        nav :global(.currentPage) {
          background-color: ${darkMode
            ? colors.deepCarminPink
            : colors.guardsmanRed} !important;
          color: ${colors.white} !important;
        }
      `}</style>
      <style jsx>{`
        main :global(.twemoji) {
          height: 24px;
          margin: 0 2px;
          vertical-align: top;
        }
        .posts {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          column-gap: 1.5rem;
        }
        nav :global(a) {
          align-items: center;
          border-radius: 50% !important;
          display: flex;
          font-weight: 600;
          height: 31px;
          justify-content: center;
          line-height: 1;
          margin: 0 5px;
          padding: 5px 12px;
          text-decoration: none;
          width: 31px;
        }
        h2 {
          margin: 0.83em 0;
        }
        li {
          display: inline-block;
        }
        main {
          display: grid;
          grid-gap: 2em;
          grid-template-columns: auto;
          justify-content: center;
          padding: 0 20px 50px 20px;
          min-height: calc(100vh - 257px);
          max-width: 1300px;
          margin: auto;
        }
        nav {
          display: flex;
          justify-content: center;
        }
        nav :global(.currentPage) {
          border-radius: 50% !important;
          color: ${colors.white} !important;
        }
        ol {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        section {
          display: grid;
          grid-gap: 2em;
          grid-template-columns: auto;
        }
        aside {
          display: grid;
          grid-gap: 2em;
          grid-template-columns: auto;
        }
      `}</style>
    </main>
  );
}
