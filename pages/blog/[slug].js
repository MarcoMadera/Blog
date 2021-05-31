import { getPostBySlug, getPostsSlugs } from "lib/posts";
import getTweets from "lib/twitter";
import { useEffect } from "react";
import BlogLayout from "layouts/Blog";
export default function Post(data) {
  useEffect(() => {
    fetch(`/api/views/${data.slug}`, {
      method: "POST",
    });
  }, [data.slug]);

  return <BlogLayout {...data} />;
}

export async function getStaticPaths() {
  return {
    paths: getPostsSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const data = getPostBySlug(slug);
  const tweets = await getTweets(data.content);
  return {
    props: { ...data, tweets },
  };
}
