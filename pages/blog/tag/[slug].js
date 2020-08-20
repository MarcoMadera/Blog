import { getPostsByTag, getPostsTags } from "../../../utils/posts";
import Link from "next/link";
import styles from "../../Home.module.css";
import slugify from "react-slugify";
import Aside from "../../../components/Aside";
import Newsletter from "../../../components/Newsletter";

const tag = ({ postsByTag, slug }) => {
  return (
    <main className={styles.container}>
      <Aside />
      <section className={styles.section}>
        <h4>Tag {slug.charAt(0).toUpperCase() + slug.slice(1)}</h4>
        {postsByTag.length ? (
          postsByTag.map(
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
          )
        ) : (
          <h1>No hay resultados</h1>
        )}
      </section>
      <Newsletter />
    </main>
  );
};

export default tag;

export async function getStaticPaths() {
  const paths = getPostsTags();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const postData = getPostsByTag(slug);
  return { props: postData };
}
