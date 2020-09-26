import Aside from "../components/Aside";
import Seo from "../components/Seo";
import { getSortedPosts, getPostsTags } from "../utils/posts";
import Newsletter from "../components/Newsletter";
import AllTags from "../components/AllTags";
import BlogCard from "../components/BlogCard";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Custom404 from "./404";
import { colors } from "../styles/theme";
import Link from "next/link";
const Home = ({ posts = [], tags = [] }) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const indexOfLastPost = page * 4;
  const indexOfFirstPost = indexOfLastPost - 4;
  const lastPage = Math.ceil(posts.length / 4);
  const pages = Array.from(Array(lastPage), (_, i) => i + 1);
  posts = posts.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <main id="main">
      <Seo title="Página principal" />
      <Aside />
      <section>
        <h1>Últimos artículos</h1>
        {posts.map(
          ({
            frontmatter: {
              title,
              description,
              date,
              cover,
              cover100,
              tag,
              author,
            },
            slug,
          }) => (
            <BlogCard
              key={title}
              title={title}
              description={description}
              date={date}
              cover={cover}
              cover100={cover100}
              tag={tag}
              author={author}
              slug={slug}
            />
          )
        )}
        {posts.length <= 0 && <Custom404 />}
        <nav aria-label="Paginación">
          <ol>
            {pages.map((pageNumber, i) => {
              return (
                <li key={pageNumber}>
                  <Link href={i === 0 ? "/" : `/?page=${pageNumber}`}>
                    <a
                      className={
                        page === pageNumber ? "currentPage" : "pagination"
                      }
                      aria-label={
                        page === pageNumber
                          ? "Página actual"
                          : `Ir a página ${pageNumber}`
                      }
                      aria-current={page === pageNumber ? "true" : undefined}
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
          color: white !important;
        }
        .pagination:hover {
          color: ${colors.secondary} !important;
        }
      `}</style>
    </main>
  );
};

export async function getStaticProps() {
  const getFormattedDate = (date, local) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString(local, options);
    return formattedDate;
  };
  const posts = getSortedPosts();
  const tags = [...new Set(getPostsTags())];
  posts.forEach(
    (post) =>
      (post.frontmatter.date = getFormattedDate(post.frontmatter.date, "es-MX"))
  );
  return {
    props: {
      posts,
      tags,
    },
  };
}

export default Home;

Home.propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array,
  pages: PropTypes.array,
  page: PropTypes.number,
};
