import Link from "next/link";
import codeTheme from "react-syntax-highlighter/dist/cjs/styles/prism/ghcolors";
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
import { colors } from "../../styles/theme";
import { getFormattedDate } from "../../utils/helpers";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      showInlineLineNumbers={true}
      wrapLines={false}
      language={language}
      style={codeTheme}
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

export default function Post({ postData, recommendedPosts }) {
  const { NEXT_PUBLIC_COMMENTS: tenantId } = process.env;
  const { post, frontmatter, nextPost, previousPost, slug } = postData;
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
        cover={frontmatter.cover760}
        url={`https://marcomadera.com/blog/${slug}`}
      />
      {contentAside(post.content)}
      <article className="blog" id="main">
        <section>
          <header>
            <h1>{frontmatter.title}</h1>
            <p>
              <time dateTime={new Date(frontmatter.date).toISOString()}>
                {getFormattedDate(new Date(frontmatter.date))}
              </time>
            </p>
          </header>
          <MarkDown
            source={post.content}
            renderers={{
              code: CodeBlock,
            }}
          />
          <hr />
          <BlogFooter slug={slug} blogTitle={frontmatter.title} />
        </section>
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
      </article>
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
        a {
          border: 3px solid ${colors.secondary};
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
          line-height: 1.6;
        }
        .blog video {
          filter: brightness(110%);
        }
        .blog blockquote {
          border-left: 5px solid ${colors.primary};
          padding-left: 10px;
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
        }

        .blog .mjx-chtml,
        .blog .mjx-chtml:focus {
          display: block !important;
          flex-wrap: wrap;
          white-space: unset;
          width: fit-content;
          margin: 0 auto;
          font-size: 100%;
          line-break: anywhere;
        }
        .blog .MathJax_Preview {
          display: none;
        }

        .blog h1 {
          font-size: 1.8em;
        }
        .blog > aside:nth-of-type(1) {
          order: 1;
        }
        .article {
          order: 2;
        }
        .rightAside {
          order: 3;
        }
        .blog a {
          color: ${colors.primary};
        }
        .blog header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }
        .blog a:hover {
          text-decoration: underline;
          color: ${colors.secondary};
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
          line-height: 1.6;
          padding-inline-start: 0;
          margin-block-end: 0;
          padding: 0 20px 0 0;
          margin-left: 20px;
        }
        .blog img,
        .blog video {
          display: block;
          margin: auto;
          max-width: 99%;
          clip-path: inset(0% 0% 0% 0% round 10px);
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
          font-size: 14px !important;
        }
        .blog table {
          margin: 0 auto;
          display: table;
        }
        .blog details {
          border: 1px solid ${colors.gray};
          border-radius: 4px;
          padding: 0.5em 0.5em 0;
        }

        .blog input[type="number"],
        .blog select {
          border: 1px solid ${colors.gray};
          border-radius: 4px;
          padding: 0.5em;
        }
        .blog input[type="color"] {
          border-radius: 100%;
          height: 40px;
          width: 40px;
          border: none;
          outline: none;
          cursor: pointer;
          -webkit-appearance: none;
        }
        .blog dialog {
          border-color: ${colors.secondary};
        }

        .blog input[type="color"]::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        .blog input[type="color"]::-webkit-color-swatch {
          border: none;
          border-radius: 100%;
        }
        .blog meter {
          --background: ${colors.white};
          --optimum: ${colors.primary};
          --sub-optimum: ${colors.secondary};
          --sub-sub-optimum: ${colors.primary};

          /* The gray background in Firefox */
          background: var(--background);
          display: block;
          margin-bottom: 1em;
          width: 100%;
          height: 30px;
        }

        /* The gray background in Chrome, etc. */
        .blog meter::-webkit-meter-bar {
          background: var(--background);
        }

        /* The green (optimum) bar in Firefox */
        .blog meter:-moz-meter-optimum::-moz-meter-bar {
          background: linear-gradient(
            90deg,
            ${colors.primary},
            ${colors.secondary}
          );
        }

        /* The green (optimum) bar in Chrome etc. */
        .blog meter::-webkit-meter-optimum-value {
          background: linear-gradient(
            90deg,
            ${colors.primary},
            ${colors.secondary}
          );
        }

        /* The yellow (sub-optimum) bar in Firefox */
        .blog meter:-moz-meter-sub-optimum::-moz-meter-bar {
          background: var(--sub-optimum);
        }

        /* The yellow (sub-optimum) bar in Chrome etc. */
        .blog meter::-webkit-meter-suboptimum-value {
          background: var(--sub-optimum);
        }

        /* The red (even less good) bar in Firefox */
        .blog meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
          background: var(--sub-sub-optimum);
        }

        /* The red (even less good) bar in Chrome etc. */
        .blog meter::-webkit-meter-even-less-good-value {
          background: var(--sub-sub-optimum);
        }
        .blog progress,          /* All HTML5 progress enabled browsers */
        .blog progress[role]     /* polyfill */ {
          /* Turns off styling - not usually needed, but good to know. */
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;

          /* gets rid of default border in Firefox and Opera. */
          border: none;

          /* Needs to be in here for Safari polyfill so background images work as expected. */
          background-size: auto;

          /* Dimensions */
          width: 100%;
          border: 1px solid ${colors.gray};
          border-radius: 20px;
        }

        /* Polyfill */
        .blog progress[role]:after {
          background-image: none; /* removes default background from polyfill */
        }

        /* Ensure fallback text doesn't appear in polyfill */
        .blog progress[role] strong {
          display: none;
        }
        .blog progress,                          /* Firefox  */ 
        .blog progress[role][aria-valuenow] {
          /* Polyfill */
          background: unset !important; /* !important is needed by the polyfill */
        }

        /* Chrome */
        .blog progress::-webkit-progress-bar {
          background: unset;
        }
        /* IE10 */
        .blog progress {
          color: ${colors.primary};
          border-radius: 20px;
        }

        /* Firefox */
        .blog progress::-moz-progress-bar {
          background: ${colors.primary};
          border-radius: 20px;
        }

        .blog caption {
          padding: 8px;
          caption-side: bottom;
        }

        /* Chrome */
        .blog progress::-webkit-progress-value {
          background: ${colors.primary};
          border-radius: 20px;
        }

        /* Polyfill */
        .blog progress[aria-valuenow]:before {
          background: ${colors.primary};
          border-radius: 20px;
        }

        .blog summary {
          font-weight: bold;
          margin: -0.5em -0.5em 0;
          padding: 0.5em;
        }
        .blog details > summary::marker {
          color: ${colors.primary};
        }
        .blog details > summary::-webkit-details-marker {
          color: ${colors.primary};
        }

        .blog details[open] {
          padding: 0.5em;
        }

        .blog details[open] summary {
          border-bottom: 1px solid ${colors.gray};
          margin-bottom: 0.5em;
        }
        .blog figure {
          margin: 0 auto;
          display: block;
          width: fit-content;
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
  return { props: { postData, recommendedPosts } };
}

Post.propTypes = {
  postData: PropTypes.object,
  recommendedPosts: PropTypes.array,
};

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
};
