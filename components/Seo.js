import Head from "next/head";
import { siteMetadata } from "../site.config";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
import { colors } from "../styles/theme";
const Seo = ({
  title,
  description = "",
  cover = `${siteMetadata.siteUrl}/logo512.png`,
  canonical = "",
  author = "",
  date = "",
}) => {
  const metaDescription = description || siteMetadata.description;
  const metaTitle = title || siteMetadata.title;
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);
  return (
    <Head>
      <title>{title}</title>
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
      {router.asPath.includes("/blog/") ? (
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
              __html: `{"@context":"http://schema.org","@type":"Article","headline":"${title}","description":"${metaDescription}","image":"${cover}","datePublished":"${date}","author":{"@type" : "Person","name" : "${author}"},"publisher": { "@type": "Organization", "name": "${siteMetadata.siteUrl}", "logo": { "@type": "ImageObject", "url": "${siteMetadata.siteUrl}logo.svg" } },,"mainEntityOfPage":{"@type": "WebPage","@id": "${siteMetadata.siteUrl}${router.asPath}"}}`,
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
