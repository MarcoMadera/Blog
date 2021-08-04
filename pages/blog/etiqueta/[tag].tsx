import { getTagData, getTagsSlugs } from "lib/posts";
import slugify from "react-slugify";
import HomeLayout from "layouts/Home";
import { ReactElement } from "react";
import { HomeData } from "types/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Custom404 from "pages/404";

export default function Tag({ posts, allTags, tag }: HomeData): ReactElement {
  if (posts) {
    return (
      <HomeLayout
        title={`Blog etiqueta ${posts[0].tags.find((item) =>
          slugify(item).includes(tag || "")
        )} 📌`}
        posts={posts}
        allTags={allTags}
        tag={tag}
        pages={[]}
        currentPage={1}
      />
    );
  }
  return <Custom404 />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getTagsSlugs();
  return {
    paths,
    fallback: false,
  };
};

type Params = {
  tag?: string;
};

export const getStaticProps: GetStaticProps<Params> = async ({ params }) => {
  const tag = params?.tag;
  if (tag) {
    const { posts, allTags } = await getTagData(
      typeof tag === "string" ? tag : tag[0]
    );
    return {
      props: {
        posts,
        allTags,
        tag: typeof tag === "string" ? tag : tag[0],
      },
    };
  }
  return {
    props: {},
  };
};
