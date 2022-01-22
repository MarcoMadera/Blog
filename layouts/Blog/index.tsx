import Seo from "components/Seo";
import MarkDown from "components/Markdown/index";
import TableOfContents from "./TableOfContents";
import Comments from "./Comment";
import NewsletterCard from "components/Newsletter/NewsletterCard";
import RecommendedPosts from "./RecommendedPosts";
import BlogFooter from "./BlogFooter";
import { colors } from "styles/theme";
import TagsHeader from "./TagsHeader";
import { getFormattedDate } from "utils";
import { H1, ALink, Hr } from "components/tags";
import useDarkMode from "hooks/useDarkMode";
import { UserContextProvider } from "context/UserContext";
import { CommentsContextProvider } from "context/CommentsContext";
import { PostWithMedia } from "types/posts";
import { ReactElement } from "react";
import { ElementsContextProvider } from "context/ElementsContext";
import {
  isImgFromCloudProvider,
  replaceUrlImgTransformations,
} from "utils/cloudProvider";
import EmojisWrapper from "components/EmojisWrapper";

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
  elements,
  h2s,
  readingTimeInMinutes,
}: PostWithMedia): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <main>
      <Seo
        title={title}
        description={description}
        cover={
          isImgFromCloudProvider(cover)
            ? replaceUrlImgTransformations(cover, "q_auto,f_auto,c_scale,w_760")
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
          <TagsHeader tags={tags} />
          <H1 itemProp="headline name" id="articleTitle">
            {title}
          </H1>
          <p>
            <time
              itemProp="datePublished"
              dateTime={new Date(date).toISOString()}
            >
              {getFormattedDate(date)}
            </time>{" "}
            &middot;{` ${readingTimeInMinutes} minutos de lectura `}
          </p>
        </header>
        <TableOfContents h2s={h2s} />
        <div itemProp="articlebody" aria-labelledby="articleTitle">
          <ElementsContextProvider elements={elements}>
            <EmojisWrapper options={{ className: "twemoji" }}>
              <MarkDown source={content} html={true} type="post" />
            </EmojisWrapper>
          </ElementsContextProvider>
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
            <span></span>
          )}
          {nextPost ? (
            <ALink title="" href={`/blog/${nextPost.slug}`} rel="next">
              <p>Siguiente artículo →</p>
              {nextPost.title}
            </ALink>
          ) : (
            <span></span>
          )}
        </nav>
        <UserContextProvider>
          <CommentsContextProvider>
            <Comments slug={slug} />
          </CommentsContextProvider>
        </UserContextProvider>
      </article>
      <aside>
        <RecommendedPosts recommendedPosts={recommendedPosts} slug={slug} />
        <NewsletterCard />
      </aside>
      <style jsx>{`
        nav :global(a) {
          border: 3px solid ${darkMode ? colors.dark_secondary : colors.primary};
        }
      `}</style>
      <style jsx>{`
        main :global(.twemoji) {
          height: 24px;
          margin: 0 2px;
          vertical-align: top;
        }
        main {
          padding: 0 20px;
          margin: 10px auto 50px auto;
        }
        div {
          grid-area: body;
        }
        article > :global(hr) {
          grid-area: hr;
        }
        div :global(li),
        div :global(p) {
          line-height: 28px;
          font-size: 17.2px;
          word-spacing: 3px;
          letter-spacing: -0.3px;
        }
        div :global(h2) {
          font-size: 2.2rem;
          margin-top: 1em;
        }
        div :global(h3) {
          font-size: 1.6rem;
          margin-top: 1em;
        }
        div :global(h2),
        div :global(h3) {
          font-weight: 600;
          letter-spacing: -0.5px;
        }
        nav {
          grid-area: nav;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        main header {
          grid-area: header;
        }
        header :global(h1) {
          margin: 0 0 0.5em 0;
          font-weight: bold;
          letter-spacing: -1.5px;
          font-size: 40px;
        }
        header p {
          margin: 0;
          font-size: 14px;
          color: #929292;
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
        nav p {
          font-size: 16px;
          text-align: center;
          margin: 0;
        }
        @media screen and (min-width: 0px) and (max-width: 400px) {
          nav :global(a) {
            width: 100%;
            margin-bottom: 30px;
          }
        }
        @media screen and (min-width: 400px) and (max-width: 525px) {
          nav :global(a) {
            width: 170px;
          }
        }
        @media screen and (min-width: 525px) and (max-width: 875px) {
          nav :global(a) {
            width: 230px;
          }
        }
        @media screen and (min-width: 875px) {
          main {
            display: grid;
            grid-template-columns: minmax(0px, 944px) 240px;
            grid-gap: 3.375em;
          }
          nav :global(a) {
            width: 230px;
          }
        }
        @media screen and (min-width: 1124px) {
          main {
            max-width: 1300px;
            grid-template-columns: minmax(0px, 944px) 240px;
          }
          article {
            display: grid;
            grid-template-columns: 240px minmax(0, 944px);
            grid-template-areas: "toc header" "toc body" "toc hr" "toc footer" "toc nav" "toc comments";
            column-gap: 3.375em;
          }
        }
        @media print {
          nav {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
