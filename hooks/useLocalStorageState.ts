import { useEffect } from "react";
import useAnalitycs from "./useAnalitycs";
import useCookies from "./useCookies";
import useDarkMode from "./useDarkMode";

export default function useLocalStorageState(): void {
  const { setDarkMode } = useDarkMode();
  const { trackWithGoogleAnalitycs } = useAnalitycs();
  const { setAcceptedCookies } = useCookies();

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setDarkMode && setDarkMode(false);
    }

    if (localStorage.getItem("theme") !== "light") {
      setDarkMode && setDarkMode(true);
    }

    if (localStorage.getItem("cookiesAccepted") === "true") {
      trackWithGoogleAnalitycs();
      setAcceptedCookies && setAcceptedCookies(true);
    }

    if (localStorage.getItem("cookiesAccepted") === "false") {
      setAcceptedCookies && setAcceptedCookies(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDarkMode, setAcceptedCookies]);
}
