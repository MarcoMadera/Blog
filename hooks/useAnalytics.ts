import { useCallback, useEffect, useState } from "react";
import { dataToSendType, Fields, useAnalyticsParams } from "types/analytics";
import useCookies from "./useCookies";

export default function useAnalytics(page?: string): useAnalyticsParams {
  const [views, setViews] = useState(null);
  const { getCookie, setCookie, acceptedcookies } = useCookies();

  const trackWithGoogleAnalytics: useAnalyticsParams["trackWithGoogleAnalytics"] =
    useCallback(
      (hitType = "pageview", fields: Fields) => {
        if (!acceptedcookies) {
          return;
        }

        function addAnalyticsCookie() {
          const value = `GA1.2.${~~(2147483648 * Math.random())}.${~~(
            Date.now() / 1000
          )}`;
          setCookie({
            name: "_ga",
            value: value,
            age: 60 * 60 * 24 * 365,
          });
          return value;
        }

        const analyticsCookie = getCookie("_ga") || addAnalyticsCookie();

        const data: Partial<dataToSendType> = {
          v: "1",
          tid: "UA-177844057-1",
          aip: "1",
          cid: analyticsCookie,
          t: hitType,
          dr: document.referrer,
          dt: document.title,
          dl: location.href,
          ul: navigator.language.toLowerCase(),
          sr: `${screen.width}x${screen.height}`,
          vp: `${innerWidth}x${innerHeight}`,
        };

        if (fields && "eventCategory" in fields) {
          data.ec = fields.eventCategory;
          data.ea = fields.eventAction;
          data.el = fields.eventLabel;
          data.ev = fields.eventValue;
        }

        if (fields && "screenName" in fields) {
          data.cd = fields.screenName;
        }

        if (fields && "timingCategory" in fields) {
          data.utc = fields.timingCategory;
          data.utv = fields.timingVar;
          data.utt = fields.timingValue;
          data.utl = fields.timingLabel;
        }

        if (fields && "exDescription" in fields) {
          data.exd = fields.exDescription;
          data.exf = fields.exFatal;
        }

        if (fields && "socialNetwork" in fields) {
          data.sn = fields.socialNetwork;
          data.sa = fields.socialAction;
          data.st = fields.socialTarget;
        }

        navigator.sendBeacon(
          "https://google-analytics.com/collect",
          new URLSearchParams(data)
        );
      },
      [getCookie, setCookie, acceptedcookies]
    );

  useEffect(() => {
    if (!page) {
      return;
    }

    fetch(`/api/views/${page}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(setViews)
      .catch(() =>
        trackWithGoogleAnalytics("exception", {
          exDescription: "Error fetching views",
          exFatal: "0",
        })
      );
  }, [page, trackWithGoogleAnalytics]);

  return {
    trackWithGoogleAnalytics,
    views,
  };
}
