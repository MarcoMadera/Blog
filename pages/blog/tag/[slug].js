import {
  getPostsByTag,
  getPostsTags,
  getTagsSlugs,
} from "../../../utils/posts";
import Aside from "../../../components/Aside";
import Newsletter from "../../../components/Newsletter";
import BlogCard from "../../../components/BlogCard";
import AllTags from "../../../components/AllTags";
import Seo from "../../../components/Seo";

const tag = ({ postData, tags }) => {
  const { slug, postsByTag } = postData;
  return (
    <main id="main">
      <Seo
        title={`Blog tag ${slug.charAt(0).toUpperCase() + slug.slice(1)}`}
        url={`https://marcomadera.com/${slug}`}
      />
      <Aside />
      <section>
        <strong>
          <p>Etiqueta {slug.charAt(0).toUpperCase() + slug.slice(1)}</p>
        </strong>
        {postsByTag.length ? (
          postsByTag.map(
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
          )
        ) : (
          <h1>No hay resultados</h1>
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

export default tag;

export async function getStaticPaths() {
  const paths = getTagsSlugs();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const tags = [...new Set(getPostsTags())];
  const postData = getPostsByTag(slug);
  const getFormattedDate = (date, local) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString(local, options);
    return formattedDate;
  };
  postData.postsByTag.forEach(
    (post) =>
      (post.frontmatter.date = getFormattedDate(post.frontmatter.date, "es-MX"))
  );
  return {
    props: {
      postData,
      tags,
    },
  };
}
