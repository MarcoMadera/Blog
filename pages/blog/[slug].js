import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getPostBySlug, getPostsSlugs } from "../../utils/posts";
import Bio from "../../components/Bio";
import styles from "./blog.module.css";
import Seo from "../../components/Seo";
import MarkDown from "../../components/MarkDown";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {value}
    </SyntaxHighlighter>
  );
};

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  return (
    <main className={styles.GenericBlog}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.date}</p>
        </header>
        <MarkDown
          source={post.content}
          renderers={{
            code: CodeBlock,
          }}
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className={styles.nav}>
        {previousPost ? (
          <Link href={"/blog/[slug]"} as={`/blog/${previousPost.slug}`}>
            <a className={styles.navBtn}>
              ← {previousPost.frontmatter.title}
              <p>Blog anterior</p>
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/blog/[slug]"} as={`/blog/${nextPost.slug}`}>
            <a className={styles.navBtn}>
              {nextPost.frontmatter.title} →<p>Siguiente blog</p>
            </a>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}

export async function getStaticPaths() {
  const paths = getPostsSlugs();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postData = getPostBySlug(slug);

  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: postData };
}
