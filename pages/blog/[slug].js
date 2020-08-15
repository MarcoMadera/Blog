import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getPostBySlug, getPostsSlugs } from "../../utils/posts";
import Bio from "../../components/Bio";
import styles from "./blog.module.css";
import Seo from "../../components/Seo";

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
        <ReactMarkdown
          escapeHtml={false}
          source={post.content}
          renderers={{ code: CodeBlock }}
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        {previousPost ? (
          <Link href={"/blog/[slug]"} as={`/blog/${previousPost.slug}`}>
            <a>← {previousPost.frontmatter.title}</a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/blog/[slug]"} as={`/blog/${nextPost.slug}`}>
            <a>{nextPost.frontmatter.title} →</a>
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
