import { useContext } from "react";
import CookiesContext from "context/CookiesContext";
import { UseCookies } from "types/cookies";

export default function useCookies(): UseCookies {
  const context = useContext(CookiesContext);

  if (context === undefined) {
    throw new Error("useCookies must be used within a CookiesProvider");
  }

  const { acceptedcookies, setAcceptedCookies } = context;

  function getCookie(cookieName: string): string | false {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || cookieName;
    }
    return false;
  }

  function setCookie({
    name,
    value,
    age,
  }: {
    name: string;
    value: string;
    age: number;
  }) {
    document.cookie = `${name}=${value}; max-age=${age}; Path=/;"`;
  }

  function deleteCookie(cookieName: string) {
    return (document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;`);
  }

  return {
    acceptedcookies,
    setAcceptedCookies,
    getCookie,
    setCookie,
    deleteCookie,
  };
}
