import { useEffect } from "react";
import useAnalytics from "./useAnalytics";
import useCookies from "./useCookies";
import useDarkMode from "./useDarkMode";

export default function useLocalStorageState(): void {
  const { setDarkMode } = useDarkMode();
  const { trackWithGoogleAnalytics } = useAnalytics();
  const { setAcceptedCookies } = useCookies();

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setDarkMode(false);
    }

    if (localStorage.getItem("theme") !== "light") {
      setDarkMode(true);
    }

    if (localStorage.getItem("cookiesAccepted") === "true") {
      trackWithGoogleAnalytics();
      setAcceptedCookies(true);
    }

    if (localStorage.getItem("cookiesAccepted") === "false") {
      setAcceptedCookies(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDarkMode, setAcceptedCookies]);
}
