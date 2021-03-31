import AllTags from "../components/AllTags";
import Aside from "../components/Aside";
import BlogCard from "../components/BlogCard";
import { colors } from "../styles/theme";
import Custom404 from "./404";
import { getHomeDataFromPage } from "../utils/posts";
import Link from "next/link";
import Newsletter from "../components/Newsletter";
import PropTypes from "prop-types";
import Seo from "../components/Seo";
import useDarkMode from "../hooks/useDarkMode";

export default function Home({ posts = [], tags = [], pages = [] }) {
  const { darkMode } = useDarkMode();

  return (
    <main id="main">
      <Seo title="Marco Madera 📝 | Web, React, CSS, JavaScript, NodeJs" />
      <Aside />
      <section>
        <h1>Últimos artículos</h1>
        {posts.map((data) => (
          <BlogCard {...data} key={data.slug} />
        ))}
        {posts.length <= 0 && <Custom404 />}
        <nav aria-label="Paginación">
          <ol>
            {pages.map((pageNumber, i) => {
              return (
                <li key={pageNumber}>
                  <Link href={i === 0 ? "/" : `/pagina/${pageNumber}`}>
                    <a
                      className={
                        pageNumber === 1 ? "currentPage" : "pagination"
                      }
                      aria-label={
                        pageNumber === 1
                          ? "Página actual"
                          : `Ir a página ${pageNumber}`
                      }
                      aria-current={pageNumber === 1 ? "true" : undefined}
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
        <AllTags tags={tags} />
        <Newsletter />
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

export async function getStaticProps() {
  const { posts, pages, tags } = getHomeDataFromPage(1);
  return { props: { posts, tags, pages } };
}

Home.propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array,
  pages: PropTypes.array,
  page: PropTypes.number,
};
