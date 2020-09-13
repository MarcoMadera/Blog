import Aside from "../components/Aside";
import Seo from "../components/Seo";
import { getSortedPosts, getPostsTags } from "../utils/posts";
import Newsletter from "../components/Newsletter";
import AllTags from "../components/AllTags";
import BlogCard from "../components/BlogCard";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Custom404 from "./404";

const Home = ({ posts = [], tags = [] }) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const indexOfLastPost = page * 4;
  const indexOfFirstPost = indexOfLastPost - 4;
  const lastPage = Math.ceil(posts.length / 4);
  const pages = Array.from(Array(lastPage), (_, i) => i + 1);
  posts = posts.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <main>
      <Seo title="Página principal" />
      <Aside />
      <section>
        <strong>
          <p>Últimos artículos</p>
        </strong>
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
        <nav>
          {pages.map((pageNumber, i) => {
            if (i === 0) {
              return (
                <button
                  className={page == pageNumber ? "currentPage" : undefined}
                  key={pageNumber}
                  onClick={() => router.push("/")}
                >
                  {pageNumber}
                </button>
              );
            } else {
              return (
                <button
                  className={page == pageNumber ? "currentPage" : undefined}
                  key={pageNumber}
                  onClick={() => router.push(`/?page=${pageNumber}`)}
                >
                  {pageNumber}
                </button>
              );
            }
          })}
        </nav>
      </section>
      <aside>
        <AllTags tags={tags} />
        <Newsletter />
      </aside>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: center;
        }
        button {
          border: unset;
          margin: 0 5px;
          background: unset;
          color: #e74d3c;
          cursor: pointer;
          font-weight: 600;
          width: 30px;
          height: 30px;
          text-align: center;
          align-items: center;
        }
        main {
          display: grid;
          grid-template-columns: 240px minmax(0px, 710px) 240px;
          grid-gap: 2em;
          justify-content: center;
          padding: 0 20px;
          margin-bottom: 50px;
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
          background-color: #e74d3c !important;
          border: 1px solid #e74d3c !important;
          color: white !important;
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
