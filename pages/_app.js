import { useRouter } from "next/router";
import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import "../styles/globals.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    // update page url minimal google analytics
    const handleRouteChange = () => {
      window.ma.trackEvent("Category", "Action", "Label", "Value");
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    // Reset focus on page change
    Router.events.on("routeChangeStart", () => {
      document.body.setAttribute("tabIndex", "-1");
    });

    document.body.addEventListener("blur", () => {
      document.body.removeAttribute("tabIndex");
    });
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)}, l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r) r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")}, n=function(r,s,t,u,v,w,x){var z="https://www.google-analytics.com/collect", A=m({v:"1",ds:"web",aip:c.anonymizeIp?1:void 0,tid:b,cid:l(),t:r||"pageview", sd:c.colorDepth&&screen.colorDepth?screen.colorDepth+"-bits":void 0,dr:e.referrer|| void 0,dt:e.title,dl:e.location.origin+e.location.pathname+e.location.search,ul:c.language? (f.language||"").toLowerCase():void 0,de:c.characterSet?e.characterSet:void 0, sr:c.screenSize?(a.screen||{}).width+"x"+(a.screen||{}).height:void 0,vp:c.screenSize&& a.visualViewport?(a.visualViewport||{}).width+"x"+(a.visualViewport||{}).height:void 0, ec:s||void 0,ea:t||void 0,el:u||void 0,ev:v||void 0,exd:w||void 0,exf:"undefined"!=typeof x&& !1==!!x?0:void 0});if(f.sendBeacon)f.sendBeacon(z,A);else{var y=new XMLHttpRequest; y.open("POST",z,!0),y.send(A)}};d.pushState=function(r){return"function"==typeof d.onpushstate&& d.onpushstate({state:r}),setTimeout(n,c.delay||10),i.apply(d,arguments)},n(), a.ma={trackEvent:function o(r,s,t,u){return n("event",r,s,t,u)}, trackException:function q(r,s){return n("exception",null,null,null,null,r,s)}}}) (window, "UA-177844057-1",{anonymizeIp:true,colorDepth:true,characterSet:true,screenSize:true,language:true});',
          }}
        />
        <link
          rel="preconnect dns-prefetch"
          href="https://www.google-analytics.com"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default App;
