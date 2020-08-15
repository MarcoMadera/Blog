import Link from "next/link";
import Aside from "../components/Aside";
import Seo from "../components/Seo";
import { getSortedPosts } from "../utils/posts";
import styles from "./Home.module.css";
const Home = ({ posts }) => {
  return (
    <>
      <main>
        <Seo title="Página principal" />
        {posts.map(
          ({ frontmatter: { title, description, date, cover }, slug }) => (
            <article key={slug} className={styles.container}>
              <header className={styles.header}>
                <div>
                  <h3>
                    <Link href={"/blog/[slug]"} as={`/blog/${slug}`}>
                      <a>{title}</a>
                    </Link>
                  </h3>
                  <p>{description}</p>
                </div>
                <img src={cover} alt="blog cover" />
              </header>
              <section className={styles.footer}>
                <span>{date}</span>
              </section>
            </article>
          )
        )}
      </main>
      <Aside />
    </>
  );
};

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
