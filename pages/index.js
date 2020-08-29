import Aside from "../components/Aside";
import Seo from "../components/Seo";
import { getSortedPosts, getPostsTags } from "../utils/posts";
import Newsletter from "../components/Newsletter";
import AllTags from "../components/AllTags";
import BlogCard from "../components/BlogCard";
import PropTypes from "prop-types";
const Home = ({ posts, tags }) => {
  return (
    <main>
      <Seo title="Página principal" />
      <Aside />
      <section>
        <h4>Últimos artículos</h4>
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
      </section>
      <aside>
        <AllTags tags={tags} />
        <Newsletter />
      </aside>
      <style jsx>{`
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
};
