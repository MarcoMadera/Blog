import { getHomeDataFromPage } from "lib/posts";
import HomeLayout from "layouts/Home";
import { ReactElement } from "react";
import { GetStaticProps } from "next";
import type { HomeData } from "types/posts";

export default function Home(data: HomeData): ReactElement {
  return (
    <HomeLayout
      title="Marco Madera 📝 | Web, React, CSS, JavaScript, NodeJs"
      {...data}
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { posts, pages, allTags, microMemories } = await getHomeDataFromPage(1);

  return {
    props: { posts, allTags, pages, currentPage: 1, microMemories },
  };
};
