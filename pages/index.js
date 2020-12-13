import Aside from "../components/Aside";
import Seo from "../components/Seo";
import { getHomeData } from "../utils/posts";
import Newsletter from "../components/Newsletter";
import AllTags from "../components/AllTags";
import BlogCard from "../components/BlogCard";
import PropTypes from "prop-types";
import Custom404 from "./404";
import { colors } from "../styles/theme";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../components/Layout";
const Home = ({ posts = [], tags = [], pages = [] }) => {
  const { darkMode } = useContext(ThemeContext);
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
                  <Link
                    href={i === 0 ? "/" : "/pagina/[id]/"}
                    as={i === 0 ? undefined : `/pagina/${pageNumber}`}
                  >
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
          color: ${darkMode ? colors.darkPrimary : colors.primary};
          font-weight: 600;
          padding: 5px 12px;
          width: 31px;
          height: 31px;
          border-radius: 50% !important;
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
            ? colors.darkPrimary
            : colors.primary} !important;
          color: ${colors.white} !important;
        }
        .pagination:hover {
          color: ${darkMode
            ? colors.darkSecondary
            : colors.secondary} !important;
        }
      `}</style>
    </main>
  );
};

export async function getStaticProps() {
  const { posts, pages, tags } = getHomeData(1);
  return { props: { posts, tags, pages } };
}

export default Home;

Home.propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array,
  pages: PropTypes.array,
  page: PropTypes.number,
};
