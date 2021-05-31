import { getTagData, getTagsSlugs } from "lib/posts";
import slugify from "react-slugify";
import PropTypes from "prop-types";
import HomeLayout from "layouts/Home";

export default function Tag({ postsByTag, tags, tag }) {
  return (
    <HomeLayout
      title={`Blog etiqueta ${postsByTag[0].tags.find((item) =>
        slugify(item).includes(tag)
      )} 📌`}
      posts={postsByTag}
      tags={tags}
      tag={tag}
      pages={[]}
      currentPage={1}
    />
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
