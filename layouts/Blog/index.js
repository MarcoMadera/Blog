import Seo from "components/Seo";
import MarkDown from "components/Markdown/index";
import TableOfContents from "./TableOfContents";
import Comments from "components/Comment";
import Newsletter from "components/Newsletter";
import AllTags from "components/AllTags";
import RecommendedPosts from "./RecommendedPosts";
import PropTypes from "prop-types";
import BlogFooter from "./BlogFooter";
import { colors } from "styles/theme";
import { getFormattedDate, insertTextBetween } from "utils/helpers";
import { imageCloudProvider } from "site.config";
import { H1, ALink, Hr } from "components/tags";
import useDarkMode from "hooks/useDarkMode";
import { UserContextProvider } from "context/UserContext";
import { CommentsContextProvider } from "context/CommentsContext";
import { TweetsContextProvider } from "context/TweetsContext";
import styles from "./Blog.module.css";
import { useEffect } from "react";
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
  readingTimeInMinutes,
}) {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: "POST",
    });
  }, [slug]);

  return (
    <main className={styles.main}>
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
            </time>{" "}
            &middot;{` ${readingTimeInMinutes} minutos de lectura `}
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
        <nav className={styles.nav}>
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
    </main>
  );
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
  readingTimeInMinutes: PropTypes.number,
};
