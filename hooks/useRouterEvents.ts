import { useRouter } from "next/router";
import { useEffect } from "react";
import a11ySmartFocus from "utils/a11ySmartFocus";
import useAnalitycs from "./useAnalitycs";
import useCookies from "./useCookies";
import NProgress from "nprogress";

export default function useRouterEvents(): void {
  const { acceptedcookies } = useCookies();
  const { trackWithGoogleAnalitycs } = useAnalitycs();
  const router = useRouter();

  useEffect(() => {
    function handleRouteChange() {
      if (acceptedcookies === true) {
        trackWithGoogleAnalitycs();
      }
      a11ySmartFocus();
      NProgress.done();
    }

    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", () => NProgress.start());
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", () => NProgress.done());
    };
  }, [router.events, acceptedcookies, trackWithGoogleAnalitycs]);
}
