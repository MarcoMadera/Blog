import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  getPostBySlug,
  getPostsSlugs,
  getPostsByTags,
} from "../../utils/posts";
import Seo from "../../components/Seo";
import MarkDown from "../../components/MarkDown";
import toc from "markdown-toc-unlazy";
import Contents from "../../components/Contents";
import Newsletter from "../../components/Newsletter";
import AllTags from "../../components/AllTags";
import RecommendedPosts from "../../components/RecommendedPosts";
import { useState, useEffect } from "react";
import { FastCommentsCommentWidget } from "fastcomments-react";
import PropTypes from "prop-types";
import BlogFooter from "../../components/BlogFooter";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {value}
    </SyntaxHighlighter>
  );
};

//collect every h2 in the post to place in table of contents
const contentAside = (content, post) => {
  const h2s = toc(content)
    .json.filter(({ lvl }) => lvl === 2)
    .map(({ content }) => content);
  return <Contents content={h2s} post={post} />;
};

export default function Post({ postData, recommendedPosts }) {
  const { post, frontmatter, currentPost, nextPost, previousPost } = postData;
  const [loaded, setloaded] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    setData(frontmatter.title);
    if (frontmatter.title !== data) {
      setloaded(false);
    } else {
      setloaded(true);
    }
  }, [frontmatter.title, data]);

  return (
    <main>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
        cover={frontmatter.cover760}
        url={`https://marcomadera.com/blog/${currentPost.slug}`}
      />
      {contentAside(post.content, currentPost.slug)}
      <div className="blog">
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
        <nav>
          {previousPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${previousPost.slug}`}>
              <a>
                <p>← Blog anterior</p>
                {previousPost.frontmatter.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${nextPost.slug}`}>
              <a>
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
      <div>
        <AllTags tags={frontmatter.tag} title="Etiquetas del blog" />
        <RecommendedPosts
          recommendedPosts={recommendedPosts}
          currentPost={currentPost.slug}
        />
        <Newsletter />
      </div>
      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: minmax(0px, 760px);
          grid-gap: 2em;
          justify-content: center;
          padding: 0 20px;
          margin-bottom: 50px;
        }
        nav {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        a {
          border: 3px solid #e74c3ccb;
          background: white;
          padding: 7px 10px;
          font-size: 14px;
          text-align: center;
          align-self: stretch;
          width: 220px;
        }
        p {
          font-size: 16px;
          text-align: center !important;
          margin: 0;
        }
        @media screen and (min-width: 0px) and (max-width: 370px) {
          a {
            width: 100%;
            margin-bottom: 30px;
          }
        }
        @media screen and (min-width: 370px) and (max-width: 400px) {
          a {
            max-width: 165px;
          }
        }
        @media screen and (min-width: 400px) and (max-width: 500px) {
          a {
            width: 170px;
          }
        }
        @media screen and (min-width: 500px) and (max-width: 1024px) {
          a {
            width: 230px;
          }
        }
        @media screen and (min-width: 1024px) {
          main {
            grid-template-columns: 240px minmax(0px, 710px) 240px;
          }
        }
      `}</style>
      <style global jsx>{`
        .blog p {
          text-align: justify;
        }

        .blog h1 {
          font-size: 1.8em;
        }
        .blog > aside {
          order: 1;
        }
        .article {
          order: 2;
        }
        .rightAside {
          order: 3;
        }
        .blog a {
          color: #da0000;
        }
        .blog header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }
        .blog a:hover {
          text-decoration: underline;
          color: #e74c3ccb;
        }

        .blog span {
          font-family: var(--general-font-family);
        }
        .blog code span {
          font-family: monospace;
        }

        .blog ol,
        .blog ul {
          padding: 0;
        }

        .blog ul li {
          list-style-type: disc;
        }
        .blog ol li {
          list-style-type: decimal;
        }
        .blog ol li,
        .blog ul li {
          list-style-position: outside;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          padding-inline-start: 0;
          margin-block-end: 0;
          padding: 0 20px 0 0;
          margin-left: 20px;
        }

        .blog img {
          display: block;
          margin: auto;
          max-width: 99%;
          border-radius: 10px;
          transition: ease 0.3s;
        }
        .blog img:hover {
          position: static;
          transform: scale(1.1);
        }

        .blog img[alt$="100px"] {
          display: block;
          height: 100px;
        }
        .blog img[alt$="ajustar izquierda 50px"] {
          display: block;
          height: 50px;
          float: left;
          margin: 10px;
        }

        .blog img[alt$="ajustar derecha"] {
          display: block;
          float: right;
          margin: 10px;
        }
        .blog img[alt$="ajustar derecha 200px"] {
          display: block;
          float: right;
          height: 300px;
          margin: 10px;
        }

        .blog img[alt$="100px"] {
          display: block;
          height: 100px;
        }
        .blog pre {
          border-radius: 10px;
        }
        .blog pre code {
          line-height: 20px;
          font-size: 14px;
        }
        .blog table {
          margin: 0 auto;
          display: table;
        }
      `}</style>
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
  const recommendedPosts = getPostsByTags(postData.frontmatter.tag);
  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: { postData, recommendedPosts } };
}

Post.propTypes = {
  postData: PropTypes.object,
  tags: PropTypes.array,
  recommendedPosts: PropTypes.array,
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
