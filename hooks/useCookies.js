import { useContext } from "react";
import CookiesContext from "../context/CookiesContext";

export default function useCookies() {
  const { acceptedcookies, setAcceptedCookies } = useContext(CookiesContext);

  function toggleCookies() {
    if (acceptedcookies === true) {
      localStorage.setItem("cookiesAccepted", "false");
      return setAcceptedCookies(false);
    }

    localStorage.setItem("cookiesAccepted", "true");
    return setAcceptedCookies(true);
  }
  return {
    acceptedcookies,
    setAcceptedCookies,
    toggleCookies,
  };
}
