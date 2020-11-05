import Link from "next/link";
import { getPostBySlug, getPostsSlugs } from "../../utils/posts";
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
import { colors } from "../../styles/theme";
import { getFormattedDate } from "../../utils/helpers";
import { blogStyles } from "../../styles/blogStyles";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { imageCloudProvider, siteMetadata } from "../../site.config";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      showInlineLineNumbers={false}
      wrapLines={false}
      language={language}
      useInlineStyles={false}
      lineNumberStyle={{ color: "#aaa", fontSize: "14px" }}
    >
      {value}
    </SyntaxHighlighter>
  );
};

//collect every h2 in the post to place in table of contents
const contentAside = (content) => {
  const h2s = toc(content)
    .json.filter(({ lvl }) => lvl === 2)
    .map(({ content }) => content);
  return <Contents content={h2s} />;
};

export default function Post({ postData, slug }) {
  const { NEXT_PUBLIC_COMMENTS: tenantId } = process.env;
  const {
    post,
    frontmatter,
    nextPost,
    previousPost,
    recommendedPosts,
  } = postData;
  const [showComments, setShowComments] = useState(false);
  const [postTitle, setPostTitle] = useState();
  useEffect(() => {
    setPostTitle(frontmatter.title);
    if (frontmatter.title !== postTitle) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  }, [frontmatter.title, postTitle]);

  return (
    <main>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
        cover={
          frontmatter.coverImage ??
          `${imageCloudProvider}/c_scale,w_760/${frontmatter.cover}`
        }
        path={`/blog/${slug}`}
        author={frontmatter.author}
        date={frontmatter.date}
      />
      {contentAside(post.content)}
      <div className="blog" id="main">
        <article itemScope itemType="http://schema.org/Article">
          <div>
            <h1 itemProp="name">{frontmatter.title}</h1>
            <p>
              <time
                itemProp="datePublished"
                dateTime={new Date(frontmatter.date).toISOString()}
              >
                {getFormattedDate(new Date(frontmatter.date))}
              </time>
            </p>
          </div>
          <div itemProp="articlebody">
            <MarkDown
              source={post.content}
              renderers={{
                code: CodeBlock,
              }}
            />
          </div>
          <hr />
          <BlogFooter slug={slug} data={frontmatter} />
        </article>
        <nav>
          {previousPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${previousPost.slug}`}>
              <a>
                <p>← Artículo anterior</p>
                {previousPost.frontmatter.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${nextPost.slug}`}>
              <a>
                <p>Siguiente artículo →</p>
                {nextPost.frontmatter.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
        </nav>
        {showComments && (
          <FastCommentsCommentWidget
            tenantId={tenantId}
            allowAnon={true}
            hasDarkBackground={false}
          />
        )}
      </div>
      <aside>
        <AllTags tags={frontmatter.tag} title="Etiquetas del artículo" />
        <RecommendedPosts
          recommendedPosts={recommendedPosts}
          currentPost={slug}
        />
        <Newsletter />
      </aside>
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
        main > div > article > div:nth-of-type(1) {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }
        h1 {
          margin: 1em 0;
        }
        a {
          border: 3px solid ${colors.secondary};
          background: ${colors.white};
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
        @media print {
          nav {
            display: none;
          }
        }
      `}</style>
      <style global jsx>
        {blogStyles}
      </style>
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
  return { props: { postData, slug } };
}

Post.propTypes = {
  postData: PropTypes.object,
  slug: PropTypes.string,
};

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
};
