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
import { H1, ALink, Hr, Img } from "components/tags";
import useDarkMode from "hooks/useDarkMode";
import { UserContextProvider } from "context/UserContext";
import { CommentsContextProvider } from "context/CommentsContext";
import type { HeadingData, PostWithMedia } from "types/posts";
import { ElementType } from "types/posts";
import { ReactElement } from "react";
import { ElementsContextProvider } from "context/ElementsContext";
import {
  isImgFromCloudProvider,
  replaceUrlImgTransformations,
} from "utils/cloudProvider";
import EmojisWrapper from "components/EmojisWrapper";
import { PillAction } from "./PillAction";

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
  readingTimeInMinutes,
  blurDataURL,
  coverData,
}: PostWithMedia): ReactElement {
  const { darkMode } = useDarkMode();
  const headingData = Object.keys(elements)
    .filter((key) => key.startsWith(ElementType.HEADING))
    .map((key) => elements[key as `heading:${string}`]) as HeadingData[];

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
        className="blog h-entry"
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
              className="dt-published"
            >
              {getFormattedDate(date)}
            </time>{" "}
            &middot;{` ${readingTimeInMinutes} minutos de lectura `}
          </p>
          <div className="coverContainer">
            <Img
              src={replaceUrlImgTransformations(
                cover,
                "q_auto,f_auto,c_scale,w_1000,h_580"
              )}
              width={1050}
              height={700}
              blurDataURL={blurDataURL}
              fullImage={{
                base64: blurDataURL,
                img: {
                  src: cover,
                  width: coverData.width,
                  height: coverData.height,
                },
              }}
              alt={title}
              title={title}
            />
          </div>
        </header>
        <TableOfContents headings={headingData} slug={slug} />
        <EmojisWrapper>
          <div
            itemProp="articlebody"
            aria-labelledby="articleTitle"
            className="e-content"
          >
            <ElementsContextProvider elements={elements}>
              <MarkDown source={content} html={true} type="post" />
            </ElementsContextProvider>
          </div>
        </EmojisWrapper>
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
        <RecommendedPosts recommendedPosts={recommendedPosts} slug={slug} />
        <UserContextProvider>
          <CommentsContextProvider>
            <Comments slug={slug} />
          </CommentsContextProvider>
        </UserContextProvider>
        <NewsletterCard />
      </article>
      <aside>
        <PillAction title={title} slug={slug}></PillAction>
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
        div :global(sup) {
          font-weight: 600;
        }
        div :global(h3) {
          font-size: 1.6rem;
          margin-top: 1em;
        }
        div :global(h2),
        div :global(h3) {
          font-weight: 400;
          letter-spacing: -0.5px;
          color: ${darkMode ? colors.dark_secondary : colors.primary};
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
          margin: 0px 0 0.5em 0;
          font-weight: 400;
          letter-spacing: -1.5px;
          font-size: 40px;
        }
        .coverContainer {
          margin: 30px 0 30px 0;
        }
        header p {
          margin: 0;
          font-size: 18px;
          color: #929292;
          font-weight: 500;
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
          aside {
            display: none;
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
            max-width: 1400px;
            grid-template-columns: minmax(0px, 1100px) 240px;
          }
          header :global(h1) {
            margin: 20px 0 0.5em 0;
            font-size: 48px;
          }
          .coverContainer {
            margin: 80px -200px 30px -200px;
          }
          article {
            display: grid;
            grid-template-columns: 240px minmax(0, 944px);
            grid-template-areas: "toc header" "toc body" "toc hr" "toc footer" "toc nav" "toc recommendedPosts" "toc comments" "toc newsletter";
            column-gap: 4.375em;
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
