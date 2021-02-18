import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import "../styles/globals.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { siteMetadata } from "../site.config";
import { DarkModeContextProvider } from "../context/DarkModeContext";
import { CookiesContextProvider } from "../context/CookiesContext";
export default function App({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <DarkModeContextProvider>
      <CookiesContextProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "((e,a,t)=>{for(var i,o,n=a.hostname.split('.'),c=e.cookie.match(/(^|; ?)_ga=GA1.d.(d+.d+)(;|$)/),r=c?c[2]:~~(2e9*Math.random())+'.'+~~(Date.now()/1e3),l=n.length;l--&&(o=`_ga=GA1.${n.length-l}.${r}`,e.cookie=`${o};max-age=63115200;domain=${n.slice(l).join('.')}`,!e.cookie.split(/; ?/).includes(o)););track=((o,n,c,l,d)=>{i={v:1,tid:'UA-177844057-1',aip:1,cid:r,t:o,dr:e.referrer,dt:e.title,dl:a.href,ul:t.language.toLowerCase(),sr:`${screen.width}x${screen.height}`,vp:`${innerWidth}x${innerHeight}`},n&&(i.ec=n),c&&(i.ea=c),l&&(i.el=l),d&&(i.ev=d),t.sendBeacon('https://google-analytics.com/collect',new URLSearchParams(i))})})(document,location,navigator)",
            }}
          />
          <link
            rel="preconnect dns-prefetch"
            href="https://www.google-analytics.com"
          />
          <link
            rel="manifest"
            href={`${siteMetadata.siteUrl}/manifest.json`}
          ></link>
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesContextProvider>
    </DarkModeContextProvider>
  );
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
