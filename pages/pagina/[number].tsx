import { getPostsPagesPaths, getHomeDataFromPage } from "lib/posts";
import HomeLayout from "layouts/Home";
import { ReactElement } from "react";
import { HomeData } from "types/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Custom404 from "pages/404";

export default function Page(data: HomeData): ReactElement {
  if (data) {
    return (
      <HomeLayout
        title={`Marco Madera 📝 | Página ${data.currentPage}`}
        {...data}
      />
    );
  }
  return <Custom404 />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostsPagesPaths();
  return {
    paths,
    fallback: false,
  };
};

type Params = {
  number?: string;
};

export const getStaticProps: GetStaticProps<Params> = async ({ params }) => {
  const number = params?.number;
  if (number && !isNaN(Number(number))) {
    const { posts, pages, allTags } = await getHomeDataFromPage(
      Number(typeof number === "string" ? number : number[0])
    );
    return {
      props: {
        posts,
        allTags,
        pages,
        currentPage: Number(typeof number === "string" ? number : number[0]),
        number: typeof number === "string" ? number : number[0],
      },
    };
  }
  return {
    props: {},
  };
};
