import Link from "next/link";
import Aside from "../components/Aside";
import Seo from "../components/Seo";
import { getSortedPosts } from "../utils/posts";
import styles from "./Home.module.css";
import Newsletter from "../components/Newsletter";
const Home = ({ posts }) => {
  return (
    <main className={styles.container}>
      <Seo title="Página principal" />
      <Aside />
      <section className={styles.section}>
        <h4>Últimos artículos</h4>
        {posts.map(
          ({ frontmatter: { title, description, date, cover }, slug }) => (
            <article key={slug} className={styles.article}>
              <Link href={"/blog/[slug]"} as={`/blog/${slug}`}>
                <a>
                  <header className={styles.header}>
                    <section className={styles.content}>
                      <h3>{title}</h3>
                      <p>
                        {description}..
                        <span className={styles.readMore}>Leer más</span>
                      </p>
                    </section>
                    <img
                      className={styles.cover}
                      src={cover}
                      alt="Portada de blog"
                    />
                  </header>
                </a>
              </Link>
              <footer className={styles.footer}>
                <span>{date}</span>
              </footer>
            </article>
          )
        )}
      </section>
      <Newsletter />
    </main>
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
