import Head from "next/head";
import { getSiteMetaData } from "../utils/helpers";

export default function SEO({
  title,
  description = "",
  cover = "https://marcomadera.com/logo512.png",
  url = "https://marcomadera.com",
}) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = description || siteMetadata.description;

  return (
    <Head>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <meta name="description" content={metaDescription} />
      <meta
        name="og:title"
        property="og:title"
        content={title | siteMetadata.title}
      />

      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />

      <meta property="og:type" content="website" />
      {url !== "https://marcomadera.com" ? (
        <>
          <meta
            property="article:author"
            content="https://www.facebook.com/marco.mad.lop"
          />
          <meta
            property="article:publisher"
            content="https://www.facebook.com/marco.mad.lop/"
          />{" "}
        </>
      ) : (
        <meta property="og:type" content="article" />
      )}

      <meta property="og:site_name" content="https://marcomadera.com" />
      <meta property="og:image" content={cover} />
      <meta property="og:url" content={url} />
      <meta property="twitter:image" content={cover} />

      <link rel="icon" type="image/png" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/favicon-32x32.png" />
    </Head>
  );
}
