import { useContext } from "react";
import CookiesContext from "context/CookiesContext";
import useNotification from "./useNotification";
export default function useCookies() {
  const { acceptedcookies, setAcceptedCookies } = useContext(CookiesContext);
  const { addNotification } = useNotification();

  function toggleAceptedCookies() {
    if (acceptedcookies === true) {
      localStorage.setItem("cookiesAccepted", "false");
      deleteCookie("_ga");
      addNotification({
        variant: "info",
        message: "Cookies desactivadas",
      });
      return setAcceptedCookies(false);
    }
    track("pageview");
    localStorage.setItem("cookiesAccepted", "true");
    addNotification({
      variant: "info",
      message: "Cookies activadas",
    });
    return setAcceptedCookies(true);
  }
  function getCookie(cookieName) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  function setCookie({ name, value, age }) {
    document.cookie = `${name}=${value}; max-age=${age}; Path=/;"`;
  }
  function deleteCookie(cookieName) {
    return (document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;`);
  }
  function track(type) {
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
      v: 1,
      tid: "UA-177844057-1",
      aip: 1,
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
  }
  return {
    acceptedcookies,
    setAcceptedCookies,
    toggleAceptedCookies,
    getCookie,
    setCookie,
    deleteCookie,
    track,
  };
}
