import Head from "next/head";
import { ReactElement } from "react";
import { siteMetadata } from "site.config";

export default function GlobalHead(): ReactElement {
  return (
    <Head key={1}>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="preload"
        as="image"
        href={`${siteMetadata.siteUrl}/favicon-48x48.png`}
      />
      <link
        rel="preconnect dns-prefetch"
        href="https://www.google-analytics.com"
      />
      <link rel="preconnect dns-prefetch" href="https://res.cloudinary.com" />
      <link rel="manifest" href={`${siteMetadata.siteUrl}/manifest.json`} />
      <link
        rel="icon"
        type="image/png"
        href={`${siteMetadata.siteUrl}/favicon-32x32.png`}
      />
      <link
        rel="apple-touch-icon"
        href={`${siteMetadata.siteUrl}/favicon-32x32.png`}
      />
      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href={`${siteMetadata.siteUrl}/sitemap.xml`}
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </Head>
  );
}
