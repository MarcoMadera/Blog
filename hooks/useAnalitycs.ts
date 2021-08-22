import { useCallback, useEffect, useState } from "react";
import { dataToSendType, Fields, UseAnalitycsParams } from "types/analitycs";
import useCookies from "./useCookies";

export default function useAnalitycs(page?: string): UseAnalitycsParams {
  const [views, setViews] = useState(null);
  const { getCookie, setCookie } = useCookies();

  useEffect(() => {
    if (!page) {
      return;
    }

    fetch(`/api/views/${page}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(setViews)
      .catch((err) => console.log(err));
  }, [page]);

  const trackWithGoogleAnalitycs: UseAnalitycsParams["trackWithGoogleAnalitycs"] =
    useCallback(
      (hitType = "pageview", fields: Fields) => {
        if (!getCookie("_ga")) {
          setCookie({
            name: "_ga",
            value: `GA1.2.${~~(2147483648 * Math.random())}.${~~(
              Date.now() / 1000
            )}`,
            age: 60 * 60 * 24 * 365,
          });
        }

        const data: Partial<dataToSendType> = {
          v: "1",
          tid: "UA-177844057-1",
          aip: "1",
          cid: getCookie("_ga"),
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
      [getCookie, setCookie]
    );

  return {
    trackWithGoogleAnalitycs,
    views,
  };
}
