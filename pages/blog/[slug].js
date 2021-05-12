import { getPostBySlug, getPostsSlugs } from "../../utils/posts";
import Seo from "../../components/Seo";
import MarkDown from "../../components/Markdown/index";
import TableOfContents from "../../components/TableOfContents";
import Comments from "../../components/Comment";
import Newsletter from "../../components/Newsletter";
import AllTags from "../../components/AllTags";
import RecommendedPosts from "../../components/RecommendedPosts";
import PropTypes from "prop-types";
import BlogFooter from "../../components/BlogFooter";
import { colors } from "../../styles/theme";
import { getFormattedDate, insertTextBetween } from "../../utils/helpers";
import { blogStyles } from "../../styles/blogStyles";
import { imageCloudProvider } from "../../site.config";
import getTweets from "../../lib/twitter";
import { H1, ALink, Hr } from "../../components/tags";
import useDarkMode from "../../hooks/useDarkMode";
import { UserContextProvider } from "../../context/UserContext";
import { CommentsContextProvider } from "../../context/CommentsContext";
import { TweetsContextProvider } from "../../context/TweetsContext";
export default function Post({
  title,
  description,
  date,
  cover,
  author,
  tags,
  content,
  nextPost,
  previousPost,
  recommendedPosts,
  profilePhoto,
  twitter,
  summary,
  slug,
  tweets,
  h2s,
}) {
  const { darkMode } = useDarkMode();
  return (
    <main>
      <Seo
        title={title}
        description={description}
        cover={
          cover.startsWith(imageCloudProvider)
            ? insertTextBetween(
                cover,
                imageCloudProvider.length,
                "/q_auto,f_auto,c_scale,w_760"
              )
            : cover
        }
        author={author}
        date={date}
      />
      <article
        className="blog"
        id="main"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <H1 itemProp="headline name" id="articleTitle">
            {title}
          </H1>
          <p>
            <time
              itemProp="datePublished"
              dateTime={new Date(date).toISOString()}
            >
              {getFormattedDate(date)}
            </time>
          </p>
        </header>
        <TableOfContents content={h2s} />
        <div itemProp="articlebody" aria-labelledby="articleTitle">
          <TweetsContextProvider tweets={tweets}>
            <MarkDown source={content} html={true} />
          </TweetsContextProvider>
        </div>
        <Hr />
        <BlogFooter
          slug={slug}
          title={title}
          profilePhoto={profilePhoto}
          twitter={twitter}
          author={author}
          summary={summary}
        />
        <nav>
          {previousPost ? (
            <ALink title="" href={`/blog/${previousPost.slug}`} rel="prev">
              <p>← Artículo anterior</p>
              {previousPost.title}
            </ALink>
          ) : (
            <div />
          )}
          {nextPost ? (
            <ALink title="" href={`/blog/${nextPost.slug}`} rel="next">
              <p>Siguiente artículo →</p>
              {nextPost.title}
            </ALink>
          ) : (
            <div />
          )}
        </nav>
        <UserContextProvider>
          <CommentsContextProvider>
            <Comments slug={slug} />
          </CommentsContextProvider>
        </UserContextProvider>
      </article>
      <aside>
        <AllTags tags={tags} title="Etiquetas del artículo" />
        <RecommendedPosts
          recommendedPosts={recommendedPosts}
          currentPost={slug}
        />
        <Newsletter />
      </aside>
      <style jsx>{`
        nav :global(a) {
          border: 3px solid
            ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
      <style jsx>{`
        main :global(.twemoji) {
          height: 1.1em;
          margin: 0 2px;
          vertical-align: -3px;
        }
        main {
          padding: 0 20px;
          margin: 10px auto 50px auto;
        }
        div[itemProp="articlebody"] {
          grid-area: body;
        }
        article > :global(hr) {
          grid-area: hr;
        }
        header :global(h1) {
          margin-right: 10px;
        }
        div[itemProp="articlebody"] :global(p) {
          text-align: justify;
          line-height: 1.6;
        }
        div[itemProp="articlebody"] :global(h2),
        div[itemProp="articlebody"] :global(h3) {
          font-weight: 600;
        }
        nav,
        main header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        nav {
          grid-area: nav;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        main header {
          align-items: center;
          grid-area: header;
        }
        nav :global(a) {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
          nav :global(a) {
            width: 100%;
            margin-bottom: 30px;
          }
        }
        @media screen and (min-width: 370px) and (max-width: 400px) {
          nav :global(a) {
            max-width: 165px;
          }
        }
        @media screen and (min-width: 400px) and (max-width: 500px) {
          nav :global(a) {
            width: 170px;
          }
        }
        @media screen and (min-width: 500px) and (max-width: 875px) {
          nav :global(a) {
            width: 230px;
          }
        }
        @media screen and (min-width: 875px) {
          main {
            display: grid;
            grid-template-columns: minmax(0px, 982px) 240px;
            grid-gap: 2em;
          }
          nav :global(a) {
            width: 230px;
          }
        }
        @media screen and (min-width: 1124px) {
          main {
            max-width: 1300px;
            grid-template-columns: minmax(0px, 982px) 240px;
          }
          article {
            display: grid;
            grid-template-columns: 240px minmax(0, 982px);
            grid-template-areas: "toc header" "toc body" "toc hr" "toc footer" "toc nav" "toc comments";
            column-gap: 2em;
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
  return {
    paths: getPostsSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const data = getPostBySlug(slug);
  const tweets = await getTweets(data.content);
  return {
    props: { ...data, tweets },
  };
}

Post.propTypes = {
  slug: PropTypes.string,
  h2s: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  cover: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.array,
  content: PropTypes.string,
  nextPost: PropTypes.object,
  tweets: PropTypes.object,
  previousPost: PropTypes.object,
  recommendedPosts: PropTypes.array,
  profilePhoto: PropTypes.string,
  twitter: PropTypes.string,
  summary: PropTypes.string,
};
