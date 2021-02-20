import { getTagData, getTagsSlugs } from "../../../utils/posts";
import Aside from "../../../components/Aside";
import Newsletter from "../../../components/Newsletter";
import BlogCard from "../../../components/BlogCard";
import AllTags from "../../../components/AllTags";
import Seo from "../../../components/Seo";
import slugify from "react-slugify";
import PropTypes from "prop-types";
import { siteMetadata } from "../../../site.config";

export default function Tag({ postsByTag, tags, tag }) {
  return (
    <main id="main">
      <Seo
        title={`Blog etiqueta ${postsByTag[0].tags.find((item) =>
          slugify(item).includes(tag)
        )} 📌`}
        canonical={siteMetadata.siteUrl}
      />
      <Aside />
      <section>
        <h1>
          Etiqueta{" "}
          {postsByTag[0].tags.find((item) => slugify(item).includes(tag))}
        </h1>
        {postsByTag.length ? (
          postsByTag.map((data) => <BlogCard {...data} key={data.slug} />)
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
        h1 {
          font-size: 1rem;
          margin: 0.83em 0px;
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

export async function getStaticPaths() {
  const paths = getTagsSlugs();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { tag } }) {
  const { postsByTag, tags } = getTagData(tag);
  return {
    props: {
      postsByTag,
      tags,
      tag,
    },
  };
}

Tag.propTypes = {
  postsByTag: PropTypes.array,
  tags: PropTypes.array,
  tag: PropTypes.string,
};
