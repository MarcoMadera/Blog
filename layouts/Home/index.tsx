import AllTags from "./AllTags";
import ProfileCard from "./ProfileCard";
import BlogCard from "./BlogCard";
import { colors } from "styles/theme";
import Custom404 from "pages/404";
import Link from "next/link";
import NewsletterCard from "components/NewsletterCard";
import Seo from "components/Seo";
import useDarkMode from "hooks/useDarkMode";
import { siteMetadata } from "site.config";
import slugify from "react-slugify";
import { HomeData } from "types/posts";
import { ReactElement } from "react";

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
}: HomeLayoutProps): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <main id="main">
      <Seo
        title={title}
        canonical={currentPage !== 1 ? siteMetadata.siteUrl : undefined}
      />
      <ProfileCard />
      <section>
        <h1>
          {tag
            ? `Etiqueta ${posts[0].tags.find((item) =>
                slugify(item).includes(tag)
              )}`
            : "Últimos artículos"}
        </h1>
        {posts.map((data) => (
          <BlogCard {...data} key={data.slug} />
        ))}
        {posts.length <= 0 && <Custom404 />}
        <nav aria-label="Paginación">
          <ol>
            {pages.map((pageNumber, i) => {
              const isCurrentPage = pageNumber === currentPage;
              return (
                <li key={pageNumber}>
                  <Link
                    prefetch={false}
                    href={i === 0 ? "/" : `/pagina/${pageNumber}`}
                  >
                    <a
                      className={isCurrentPage ? "currentPage" : "pagination"}
                      aria-label={
                        isCurrentPage
                          ? "Página actual"
                          : `Ir a página ${pageNumber}`
                      }
                      aria-current={isCurrentPage ? "true" : undefined}
                    >
                      {pageNumber}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </section>
      <aside>
        <AllTags allTags={allTags} />
        <NewsletterCard />
      </aside>
      <style jsx>{`
        a {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        nav :global(.pagination:hover) {
          color: ${darkMode
            ? colors.dark_secondary
            : colors.secondary} !important;
        }
        nav :global(.currentPage) {
          background-color: ${darkMode
            ? colors.dark_primary
            : colors.primary} !important;
          color: ${colors.background} !important;
        }
      `}</style>
      <style jsx>{`
        a {
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
        h1 {
          font-size: 1rem;
          margin: 0.83em 0;
        }
        li {
          display: inline-block;
        }
        main {
          display: grid;
          grid-gap: 2em;
          grid-template-columns: 240px minmax(0px, 710px) 240px;
          justify-content: center;
          padding: 0 20px 50px 20px;
          min-height: calc(100vh - 257px);
        }
        nav {
          display: flex;
          justify-content: center;
        }
        nav :global(.currentPage) {
          border-radius: 50% !important;
          color: ${colors.background} !important;
        }
        ol {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media screen and (min-width: 0px) and (max-width: 876px) {
          main {
            grid-template-columns: auto;
          }
        }
      `}</style>
    </main>
  );
}
