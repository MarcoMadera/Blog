import { useCallback, useContext } from "react";
import CookiesContext from "context/CookiesContext";
import type { UseCookies } from "types/cookies";

export default function useCookies(): UseCookies {
  const context = useContext(CookiesContext);

  if (context === undefined) {
    throw new Error("useCookies must be used within a CookiesProvider");
  }

  const { acceptedCookies, setAcceptedCookies } = context;

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

  const deleteCookie = useCallback((cookieName: string): void => {
    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;`;
  }, []);

  const toggleAcceptedCookies = useCallback(() => {
    if (acceptedCookies) {
      deleteCookie("_ga");
      setAcceptedCookies(false);
      return "Cookies desactivadas";
    }
    setAcceptedCookies(true);
    return "Cookies activadas";
  }, [acceptedCookies, deleteCookie, setAcceptedCookies]);

  return {
    acceptedCookies,
    setAcceptedCookies,
    getCookie,
    setCookie,
    deleteCookie,
    toggleAcceptedCookies,
  };
}
