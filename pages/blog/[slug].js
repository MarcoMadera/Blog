import { getPostBySlug, getPostsSlugs } from "lib/posts";
import getElementsData from "lib/elementsData";
import BlogLayout from "layouts/Blog";

export default function Post(data) {
  return <BlogLayout {...data} />;
}

export async function getStaticPaths() {
  return {
    paths: getPostsSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const data = await getPostBySlug(slug);
  const { tweets, images } = await getElementsData(data.content);
  return {
    props: { ...data, tweets, images },
  };
}
