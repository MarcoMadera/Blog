import { colors } from "../styles/theme";
import Head from "next/head";
import PropTypes from "prop-types";
import { siteMetadata } from "../site.config";
import { useRouter } from "next/router";
import useDarkMode from "../hooks/useDarkMode";

export default function Seo({
  author = "",
  canonical = "",
  cover = `${siteMetadata.siteUrl}/logo512.png`,
  date = "",
  description = "",
  title,
}) {
  const metaDescription = description || siteMetadata.description;
  const metaTitle = title || siteMetadata.title;
  const router = useRouter();
  const { darkMode } = useDarkMode();

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <link
        rel="canonical"
        href={
          canonical ?? router.asPath === "/"
            ? siteMetadata.siteUrl
            : `${siteMetadata.siteUrl}${router.asPath}`
        }
      />
      <meta property="og:locale" content="es-MX" />
      <meta name="robots" content="index,follow" />
      <meta name="monetization" content="$ilp.uphold.com/wjQdnNyGYBgW" />
      <meta
        name="theme-color"
        content={darkMode ? colors.dark_background : colors.background}
      />
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
      {router.asPath.startsWith("/blog/") &&
      !router.asPath.startsWith("/blog/etiqueta") ? (
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
              __html: `{"@context":"https://schema.org","@type":"Article","headline":"${metaTitle}","description":"${metaDescription}","image":"${cover}","datePublished":"${date}","author":{"@type":"Person","name":"${
                author || siteMetadata.author.name
              }"},"publisher":{"@type":"Organization","name":"${
                siteMetadata.siteUrl
              }","logo":{"@type":"ImageObject","url":"${
                siteMetadata.siteUrl
              }/logo.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"${
                siteMetadata.siteUrl
              }${router.asPath}"}}`,
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
      <meta
        property="og:url"
        content={`${siteMetadata.siteUrl}${router.asPath}`}
      />
      <meta property="twitter:image" content={cover} />
    </Head>
  );
}

Seo.propTypes = {
  author: PropTypes.string,
  canonical: PropTypes.string,
  cover: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
};
