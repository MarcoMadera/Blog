import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getPostBySlug, getPostsSlugs, getPostsTags } from "../../utils/posts";
import Bio from "../../components/Bio";
import Seo from "../../components/Seo";
import MarkDown from "../../components/MarkDown";
import toc from "markdown-toc-unlazy";
import Contents from "../../components/Contents";
import Newsletter from "../../components/Newsletter";
import { useState, useEffect } from "react";
import { FastCommentsCommentWidget } from "fastcomments-react";
import styles from "./blog.module.css";
import PropTypes from "prop-types";

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
          <footer>
            {loaded && (
              <>
                <button
                  className={styles.tweet}
                  onClick={() => {
                    window.open(
                      `https://twitter.com/share?url=https://marcomadera.com/blog/${currentPost.slug}&text=${frontmatter.title}`,
                      "popup",
                      "width=600,height=500,scrollbars=no,resizable=no"
                    );
                    return false;
                  }}
                >
                  Tweet
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://facebook.com/sharer/sharer.php?u=${`https://marcomadera.com/blog/${currentPost.slug}&quote=${frontmatter.title}`}`,
                      "popup",
                      "width=600,height=500,scrollbars=no,resizable=no"
                    );
                    return false;
                  }}
                  className={styles.share}
                >
                  fb share
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `http://www.linkedin.com/shareArticle?mini=true&url=${`https://marcomadera.com/blog/${currentPost.slug}&title=${frontmatter.title}`}&source=marcomadera.com`,
                      "popup",
                      "width=600,height=500,scrollbars=no,resizable=no"
                    );
                    return false;
                  }}
                  className={styles.shareLinkedIn}
                >
                  in share
                </button>
              </>
            )}
            <Bio />
          </footer>
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
