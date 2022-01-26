import { useCallback, useContext } from "react";
import CookiesContext from "context/CookiesContext";
import type { UseCookies } from "types/cookies";

export default function useCookies(): UseCookies {
  const context = useContext(CookiesContext);

  if (context === undefined) {
    throw new Error("useCookies must be used within a CookiesProvider");
  }

  const { acceptedcookies, setAcceptedCookies } = context;

  const getCookie = useCallback((cookieName: string): string | false => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || cookieName;
    }
    return false;
  }, []);

  const setCookie = useCallback(
    ({ name, value, age }: { name: string; value: string; age: number }) => {
      document.cookie = `${name}=${value}; max-age=${age}; Path=/;"`;
    },
    []
  );

  const deleteCookie = useCallback((cookieName: string): string => {
    return (document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;`);
  }, []);

  const toggleAcceptedCookies = useCallback(() => {
    if (acceptedcookies) {
      deleteCookie("_ga");
      setAcceptedCookies(false);
      return "Cookies desactivadas";
    }
    setAcceptedCookies(true);
    return "Cookies activadas";
  }, [acceptedcookies, deleteCookie, setAcceptedCookies]);

  return {
    acceptedcookies,
    setAcceptedCookies,
    getCookie,
    setCookie,
    deleteCookie,
    toggleAcceptedCookies,
  };
}
