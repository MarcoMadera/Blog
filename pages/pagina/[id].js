import { getPostsPagesPaths, getHomeData } from "../../utils/posts";
import PropTypes from "prop-types";
import Aside from "../../components/Aside";
import Seo from "../../components/Seo";
import Newsletter from "../../components/Newsletter";
import AllTags from "../../components/AllTags";
import BlogCard from "../../components/BlogCard";
import Custom404 from "../404";
import { colors } from "../../styles/theme";
import Link from "next/link";
export default function Page({ posts = [], pages = [], tags = [], page }) {
  return (
    <main id="main">
      <Seo title="Blog" canonical="https://marcomadera.com" />
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
                        page === pageNumber.toString()
                          ? "currentPage"
                          : "pagination"
                      }
                      aria-label={
                        page === pageNumber.toString()
                          ? "Página actual"
                          : `Ir a página ${pageNumber}`
                      }
                      aria-current={
                        page === pageNumber.toString() ? "true" : undefined
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
          color: ${colors.primary};
          font-weight: 500;
          padding: 5px 12px;
          width: 30px;
          height: 30px;
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
          background-color: ${colors.primary} !important;
          border: 1px solid ${colors.primary} !important;
          color: ${colors.white} !important;
        }
        .pagination:hover {
          color: ${colors.secondary} !important;
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

export async function getStaticProps({ params: { id } }) {
  const { posts, pages, tags } = getHomeData(id);
  return { props: { posts, tags, pages, page: id } };
}

Page.propTypes = {
  posts: PropTypes.array,
  pages: PropTypes.array,
  page: PropTypes.string,
  tags: PropTypes.array,
};
