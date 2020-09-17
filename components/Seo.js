import Head from "next/head";
import { getSiteMetaData } from "../utils/helpers";
import PropTypes from "prop-types";
const Seo = ({
  title,
  description = "",
  cover = "https://marcomadera.com/logo512.png",
  url = "https://marcomadera.com/",
}) => {
  const siteMetadata = getSiteMetaData();
  const metaDescription = description || siteMetadata.description;
  const metaTitle = title || siteMetadata.title;

  return (
    <Head>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" property="og:title" content={metaTitle} />
      <meta name="og:locale" content="es-MX" />
      <meta name="robots" content="index,follow" />
      <link
        rel="alternate"
        type="application/rss+xml"
        href="https://marcomadera.com/rss.xml"
        title="Marco Madera"
      ></link>
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:creator"
        content={`@${siteMetadata.social.twitter}`}
      />
      <meta name="twitter:site" content={`@${siteMetadata.social.twitter}`} />

      {url !== siteMetadata.siteUrl ? (
        <>
          <meta property="og:type" content="article" />
          <meta
            property="article:author"
            content={`https://www.facebook.com/${siteMetadata.social.facebook}`}
          />
          <meta
            property="article:publisher"
            content={`https://www.facebook.com/${siteMetadata.social.facebook}`}
          />{" "}
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
      <meta property="og:url" content={url} />
      <meta property="twitter:image" content={cover} />

      <link rel="icon" type="image/png" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/favicon-32x32.png" />
    </Head>
  );
};

export default Seo;

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cover: PropTypes.string,
  url: PropTypes.string,
};
