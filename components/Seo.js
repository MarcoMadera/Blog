import Head from "next/head";
import { siteMetadata } from "../site.config";
import PropTypes from "prop-types";
const Seo = ({
  title,
  description = "",
  cover = `${siteMetadata.siteUrl}/logo512.png`,
  path = "",
  canonical = "",
  author = "",
  date = "",
}) => {
  const metaDescription = description || siteMetadata.description;
  const metaTitle = title || siteMetadata.title;
  return (
    <Head>
      {path.includes("/blog/") ? (
        <title>{title}</title>
      ) : (
        <title>{`${title} | ${siteMetadata.title}`}</title>
      )}
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <link
        rel="canonical"
        href={
          canonical || path
            ? `${siteMetadata.siteUrl}${path}`
            : siteMetadata.siteUrl
        }
      />
      <meta property="og:locale" content="es-MX" />
      <meta name="robots" content="index,follow" />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${siteMetadata.siteUrl}/rss.xml`}
        title="Marco Madera"
      ></link>
      <meta property="og:description" content={metaDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:creator"
        content={`@${siteMetadata.social.twitter}`}
      />
      <meta name="twitter:site" content={`@${siteMetadata.social.twitter}`} />
      <meta property="fb:app_id" content="373017180730319" />
      {path.includes("/blog/") ? (
        <>
          <meta property="og:type" content="article" />
          {author === siteMetadata.author.name && (
            <meta
              property="article:author"
              content={`https://www.facebook.com/${siteMetadata.social.facebook}`}
            />
          )}
          <meta
            property="article:publisher"
            content={`https://www.facebook.com/${siteMetadata.social.facebook}`}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{"@context":"http://schema.org","@type":"NewsArticle","headline":"${title}","image":["${cover}"],"datePublished":"${date}","dateModified":"${date}","author":{"@type" : "Person","name" : "${author}"},"publisher":"Marco Madera","mainEntityOfPage":"${siteMetadata.siteUrl}${path}"}`,
            }}
          />
        </>
      ) : (
        <meta property="og:type" content="website" />
      )}

      <meta
        property="og:site_name"
        content={`${siteMetadata.title}: ${siteMetadata.description}`}
      />
      <meta property="og:image" content={cover} />
      <meta property="og:image:alt" content={metaDescription} />
      <meta property="og:url" content={`${siteMetadata.siteUrl}${path}`} />
      <meta property="twitter:image" content={cover} />
    </Head>
  );
};

export default Seo;

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cover: PropTypes.string,
  path: PropTypes.string,
  author: PropTypes.string,
  canonical: PropTypes.string,
  date: PropTypes.string,
};
