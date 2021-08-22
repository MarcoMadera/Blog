import { getPostBySlug, getPostsSlugs } from "lib/posts";
import getElementsData from "lib/elementsData";
import BlogLayout from "layouts/Blog";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostWithMedia } from "types/posts";
import { ReactElement } from "react";
import Custom404 from "pages/404";
import useAnalitycs from "hooks/useAnalitycs";

export default function Post(data: PostWithMedia | undefined): ReactElement {
  useAnalitycs(data?.slug);
  if (data) {
    return <BlogLayout {...data} />;
  }
  return <Custom404 />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPostsSlugs(),
    fallback: false,
  };
};

type Params = {
  slug?: string;
};

export const getStaticProps: GetStaticProps<Params> = async ({ params }) => {
  const slug = params?.slug;
  if (slug) {
    const post = await getPostBySlug(typeof slug === "string" ? slug : slug[0]);
    const { tweets, images, codeBlocks } = await getElementsData(post.content);

    return {
      props: { ...post, tweets, images, codeBlocks },
    };
  }
  return {
    props: {},
  };
};
