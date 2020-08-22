import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getPostBySlug, getPostsSlugs, getPostsTags } from "../../utils/posts";
import Seo from "../../components/Seo";
import MarkDown from "../../components/MarkDown";
import toc from "markdown-toc-unlazy";
import Contents from "../../components/Contents";
import Newsletter from "../../components/Newsletter";
import AllTags from "../../components/AllTags";
import { useState, useEffect } from "react";
import { FastCommentsCommentWidget } from "fastcomments-react";
import styles from "./blog.module.css";
import PropTypes from "prop-types";
import BlogFooter from "../../components/BlogFooter";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {value}
    </SyntaxHighlighter>
  );
};

const contentAside = (content, post) => {
  const result = toc(content)
    .json.filter(({ lvl }) => lvl === 2)
    .map(({ content }) => content);
  return <Contents content={result} post={post} />;
};

export default function Post({ postData, tags }) {
  const { post, frontmatter, currentPost, nextPost, previousPost } = postData;
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);
  return (
    <main className={styles.GenericBlog}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
        cover={frontmatter.cover760}
        url={`https://marcomadera.com/blog/${currentPost.slug}`}
      />
      {contentAside(post.content, currentPost.slug)}
      <div className={styles.article}>
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
          {loaded && (
            <BlogFooter slug={currentPost.slug} blogTitle={frontmatter.title} />
          )}
        </article>
        <nav className={styles.nav}>
          {previousPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${previousPost.slug}`}>
              <a className={styles.navBtn}>
                <p>← Blog anterior</p>
                {previousPost.frontmatter.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${nextPost.slug}`}>
              <a className={styles.navBtn}>
                <p>Siguiente blog →</p>
                {nextPost.frontmatter.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
        </nav>
        {loaded && <FastCommentsCommentWidget tenantId="29_5iZ6VPE" />}
      </div>
      <div className={styles.rightAside}>
        <AllTags tags={tags} />
        <Newsletter />
      </div>
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
  const tags = [...new Set(getPostsTags().map(({ params }) => params.slug))];
  const postData = getPostBySlug(slug);
  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: { postData, tags } };
}

Post.propTypes = {
  postData: PropTypes.object,
  tags: PropTypes.array,
  post: PropTypes.object,
  frontmatter: PropTypes.object,
  currentPost: PropTypes.object,
  nextPost: PropTypes.object,
  previousPost: PropTypes.object,
};

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
};
