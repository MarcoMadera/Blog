import Link from "next/link";
import Aside from "../components/Aside";
import Seo from "../components/Seo";
import { getSortedPosts, getPostsTags } from "../utils/posts";
import Newsletter from "../components/Newsletter";
import styles from "./Home.module.css";
import slugify from "react-slugify";
import PropTypes from "prop-types";
const Home = ({ posts, tags }) => {
  return (
    <main className={styles.container}>
      <Seo title="Página principal" />
      <Aside />
      <section className={styles.section}>
        <h4>Últimos artículos</h4>
        {posts.map(
          ({
            frontmatter: { title, description, date, cover, tag, author },
            slug,
          }) => (
            <article key={slug} className={styles.article}>
              <Link href={"/blog/[slug]/"} as={`/blog/${slug}/`}>
                <a>
                  <header className={styles.header}>
                    <section className={styles.content}>
                      <h3>{title}</h3>
                      <p>
                        {description}..{" "}
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
                <div>
                  {tag.length &&
                    tag.map((tag) => (
                      <Link
                        href={"/blog/tag/[slug]/"}
                        as={`/blog/tag/${slugify(tag)}/`}
                        key={tag}
                      >
                        <a className={styles.tag}>#{tag}</a>
                      </Link>
                    ))}
                </div>
                <span>
                  {author} | {date}
                </span>
              </footer>
            </article>
          )
        )}
      </section>
      <div className={styles.rightAside}>
        {tags.length && (
          <>
            <h4>Todas la tags</h4>
            {tags.map((tag) => (
              <Link
                href={"/blog/tag/[slug]/"}
                as={`/blog/tag/${tag}/`}
                key={tag}
              >
                <a className={styles.tags}>#{tag}</a>
              </Link>
            ))}
          </>
        )}
        <Newsletter />
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const posts = getSortedPosts();
  const tags = [...new Set(getPostsTags().map(({ params }) => params.slug))];

  return {
    props: {
      posts,
      tags,
    },
  };
}

export default Home;

Home.propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array,
};
