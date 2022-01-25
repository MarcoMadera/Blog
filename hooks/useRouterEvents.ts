import { useRouter } from "next/router";
import { useEffect } from "react";
import a11ySmartFocus from "utils/a11ySmartFocus";
import useAnalytics from "./useAnalytics";
import useCookies from "./useCookies";
import NProgress from "nprogress";

export default function useRouterEvents(): void {
  const { acceptedcookies } = useCookies();
  const { trackWithGoogleAnalytics } = useAnalytics();
  const router = useRouter();

  useEffect(() => {
    function handleRouteChange() {
      trackWithGoogleAnalytics();
      a11ySmartFocus();
      NProgress.done();
    }
    const onHashChangeStart = (url: string) => {
      const hash = url.split("#")[1];
      const elementToFocus = document.getElementById(hash);
      if (elementToFocus) {
        a11ySmartFocus(elementToFocus);
      }
    };

    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", () => NProgress.done());
    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("routeChangeStart", () => NProgress.start());
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", () => NProgress.done());
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events, acceptedcookies, trackWithGoogleAnalytics]);
}
