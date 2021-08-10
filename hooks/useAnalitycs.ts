import { useCallback, useEffect, useState } from "react";
import useCookies from "./useCookies";

export default function useAnalitycs(view?: string): {
  trackWithGoogleAnalitycs: (type?: string) => void;
  views: number | null;
} {
  const [views, setViews] = useState(null);
  const { setCookie, getCookie } = useCookies();

  useEffect(() => {
    if (!view) {
      return;
    }

    fetch(`/api/views/${view}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(setViews)
      .catch((err) => console.log(err));
  }, [view]);

  const trackWithGoogleAnalitycs = useCallback(
    (type = "pageview") => {
      if (!getCookie("_ga")) {
        setCookie({
          name: "_ga",
          value: `GA1.2.${~~(2147483648 * Math.random())}.${~~(
            Date.now() / 1000
          )}`,
          age: 60 * 60 * 24 * 365,
        });
      }
      const data = {
        v: "1",
        tid: "UA-177844057-1",
        aip: "1",
        cid: getCookie("_ga"),
        t: type,
        dr: document.referrer,
        dt: document.title,
        dl: location.href,
        ul: navigator.language.toLowerCase(),
        sr: `${screen.width}x${screen.height}`,
        vp: `${innerWidth}x${innerHeight}`,
      };
      navigator.sendBeacon(
        "https://google-analytics.com/collect",
        new URLSearchParams(data)
      );
    },
    [getCookie, setCookie]
  );

  return {
    trackWithGoogleAnalitycs,
    views,
  };
}
