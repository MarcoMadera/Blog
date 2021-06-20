import { getHomeDataFromPage } from "lib/posts";
import HomeLayout from "layouts/Home";

export default function Home(data) {
  return (
    <HomeLayout
      title="Marco Madera 📝 | Web, React, CSS, JavaScript, NodeJs"
      {...data}
    />
  );
}

export async function getStaticProps() {
  const { posts, pages, tags } = await getHomeDataFromPage(1);
  return { props: { posts, tags, pages, currentPage: 1 } };
}
