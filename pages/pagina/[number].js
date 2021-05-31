import { getPostsPagesPaths, getHomeDataFromPage } from "../../utils/posts";
import HomeLayout from "../../layouts/Home";

export default function Page(data) {
  return (
    <HomeLayout
      title={`Marco Madera 📝 | Página ${data.currentPage}`}
      {...data}
    />
  );
}

export async function getStaticPaths() {
  const paths = getPostsPagesPaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { number } }) {
  const { posts, pages, tags } = getHomeDataFromPage(number);
  return { props: { posts, tags, pages, currentPage: Number(number) } };
}
