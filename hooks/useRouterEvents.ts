import { useRouter } from "next/router";
import { useEffect } from "react";
import a11ySmartFocus from "utils/a11ySmartFocus";
import useAnalytics from "./useAnalytics";
import useCookies from "./useCookies";
import NProgress from "nprogress";

export default function useRouterEvents(): void {
  const { acceptedCookies } = useCookies();
  const { trackWithGoogleAnalytics } = useAnalytics();
  const router = useRouter();

  useEffect(() => {
    function handleRouteChangeComplete() {
      trackWithGoogleAnalytics();
      a11ySmartFocus();
      NProgress.done();
    }
    function handleHashChangeStart(url: string) {
      const hash = url.split("#")[1];
      const elementToFocus = document.getElementById(hash);
      a11ySmartFocus(elementToFocus);
    }

    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", () => NProgress.done());
    router.events.on("hashChangeStart", handleHashChangeStart);

    return () => {
      router.events.off("routeChangeStart", () => NProgress.start());
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", () => NProgress.done());
      router.events.off("hashChangeStart", handleHashChangeStart);
    };
  }, [router.events, acceptedCookies, trackWithGoogleAnalytics]);
}
