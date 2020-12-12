import Link from "next/link";
import { getPostBySlug, getPostsSlugs } from "../../utils/posts";
import Seo from "../../components/Seo";
import MarkDown from "../../components/MarkDown";
import toc from "markdown-toc-unlazy";
import Contents from "../../components/Contents";
import Newsletter from "../../components/Newsletter";
import AllTags from "../../components/AllTags";
import RecommendedPosts from "../../components/RecommendedPosts";
import { FastCommentsCommentWidget } from "fastcomments-react";
import PropTypes from "prop-types";
import BlogFooter from "../../components/BlogFooter";
import { colors } from "../../styles/theme";
import { getFormattedDate } from "../../utils/helpers";
import { blogStyles } from "../../styles/blogStyles";
import { siteMetadata, imageCloudProvider } from "../../site.config";
import getTweets from "../../lib/get-tweets";
import { Tweets } from "../../lib/tweets";
import useMounted from "../../hooks/useMounted";
import { useRouter } from "next/router";
import { H1 } from "../../components/tags";
import { useContext } from "react";
import { ThemeContext } from "../../components/Layout";
//collect every h2 in the post to place in table of contents
const contentAside = (content) => {
  const h2s = toc(content)
    .json.filter(({ lvl }) => lvl === 2)
    .map(({ content }) => content);
  return <Contents content={h2s} />;
};

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
}) {
  const { NEXT_PUBLIC_COMMENTS: tenantId } = process.env;
  const router = useRouter();
  const mounted = useMounted();
  const { darkMode } = useContext(ThemeContext);
  return (
    <main>
      <Seo
        title={title}
        description={description}
        cover={
          author !== siteMetadata.author.name
            ? cover
            : `${imageCloudProvider}/c_scale,w_760/${cover}`
        }
        author={author}
        date={date}
      />
      {contentAside(content)}
      <div className="blog" id="main">
        <article itemScope itemType="http://schema.org/Article">
          <div>
            <H1 itemProp="name">{title}</H1>
            <p>
              <time
                itemProp="datePublished"
                dateTime={new Date(date).toISOString()}
              >
                {getFormattedDate(new Date(date))}
              </time>
            </p>
          </div>
          <div itemProp="articlebody">
            <Tweets.Provider value={tweets}>
              <MarkDown source={content} />
            </Tweets.Provider>
          </div>
          <hr />
          <BlogFooter
            slug={slug}
            title={title}
            profilePhoto={profilePhoto}
            twitter={twitter}
            author={author}
            summary={summary}
          />
        </article>
        <nav>
          {previousPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${previousPost.slug}`}>
              <a>
                <p>← Artículo anterior</p>
                {previousPost.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={"/blog/[slug]"} as={`/blog/${nextPost.slug}`}>
              <a>
                <p>Siguiente artículo →</p>
                {nextPost.title}
              </a>
            </Link>
          ) : (
            <div />
          )}
        </nav>
        {mounted && (
          <FastCommentsCommentWidget
            tenantId={tenantId}
            urlId={`${siteMetadata.siteUrl}${router.asPath}`}
            url={`${siteMetadata.siteUrl}${router.asPath}`}
          />
        )}
      </div>
      <aside>
        <AllTags tags={tags} title="Etiquetas del artículo" />
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
        div[itemProp="articlebody"] :global(p) {
          text-align: justify;
          line-height: 1.6;
        }
        div[itemProp="articlebody"] :global(h2),
        div[itemProp="articlebody"] :global(h3) {
          font-weight: 600;
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
          margin-top: 30px;
        }
        aside {
          margin-top: 20px;
        }
        article {
          overflow: hidden;
        }
        a {
          border: 3px solid
            ${darkMode ? colors.darkSecondary : colors.secondary};
          padding: 7px 10px;
          font-size: 14px;
          text-align: center;
          align-self: stretch;
          width: 220px;
          color: ${darkMode ? colors.darkPrimary : colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${darkMode ? colors.darkSecondary : colors.secondary};
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
  return {
    paths: getPostsSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  let data = getPostBySlug(slug);
  const tweets = await getTweets(data.content);
  return {
    props: { ...data, tweets },
  };
}

Post.propTypes = {
  slug: PropTypes.string,
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
