import { getPostsPagesPaths, getHomeDataFromPage } from "../../utils/posts";
import PropTypes from "prop-types";
import Aside from "../../components/Aside";
import Seo from "../../components/Seo";
import Newsletter from "../../components/Newsletter";
import AllTags from "../../components/AllTags";
import BlogCard from "../../components/BlogCard";
import Custom404 from "../404";
import { colors } from "../../styles/theme";
import Link from "next/link";
import { siteMetadata } from "../../site.config";
import useDarkMode from "../../hooks/useDarkMode";

export default function Page({
  posts = [],
  pages = [],
  tags = [],
  currentPage,
}) {
  const { darkMode } = useDarkMode();

  return (
    <main id="main">
      <Seo
        title={`Marco Madera 📝 | Página ${currentPage}`}
        canonical={siteMetadata.siteUrl}
      />
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
                  <Link
                    href={i === 0 ? "/" : "/pagina/[id]/"}
                    as={i === 0 ? undefined : `/pagina/${pageNumber}`}
                  >
                    <a
                      className={
                        currentPage === pageNumber.toString()
                          ? "currentPage"
                          : "pagination"
                      }
                      aria-label={
                        currentPage === pageNumber.toString()
                          ? "Página actual"
                          : `Ir a la página ${pageNumber}`
                      }
                      aria-current={
                        currentPage === pageNumber.toString()
                          ? "true"
                          : undefined
                      }
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
        h1 {
          font-size: 1rem;
          margin: 0.83em 0;
        }
        nav {
          display: flex;
          justify-content: center;
        }
        ol {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          display: inline-block;
        }
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          margin: 0 5px;
          color: ${darkMode ? colors.dark_primary : colors.primary};
          font-weight: 600;
          padding: 5px 12px;
          width: 31px;
          height: 31px;
          border-radius: 50% !important;
          text-decoration: none;
        }
        main {
          display: grid;
          grid-template-columns: 240px minmax(0px, 710px) 240px;
          grid-gap: 2em;
          justify-content: center;
          padding: 0 20px 50px 20px;
        }
        @media screen and (min-width: 0px) and (max-width: 876px) {
          main {
            grid-template-columns: auto;
          }
        }
      `}</style>
      <style global jsx>{`
        .currentPage {
          border-radius: 50% !important;
          background-color: ${darkMode
            ? colors.dark_primary
            : colors.primary} !important;
          color: ${colors.background} !important;
        }
        .pagination:hover {
          color: ${darkMode
            ? colors.dark_secondary
            : colors.secondary} !important;
        }
      `}</style>
    </main>
  );
}

export async function getStaticPaths() {
  const paths = getPostsPagesPaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { number } }) {
  const { posts, pages, tags } = getHomeDataFromPage(number);
  return { props: { posts, tags, pages, currentPage: number } };
}

Page.propTypes = {
  posts: PropTypes.array,
  pages: PropTypes.array,
  currentPage: PropTypes.string,
  tags: PropTypes.array,
};
