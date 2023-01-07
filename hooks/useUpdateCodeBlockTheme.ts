import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import useDarkMode from "./useDarkMode";

export default function useUpdateCodeBlockTheme(): void {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const updateCodeBlockTheme = useCallback(() => {
    if (darkMode) {
      document.querySelectorAll("pre.shiki.theme").forEach((element) => {
        const applyStyleElement =
          element.parentElement?.className === "tag-container"
            ? element.parentElement
            : element;
        applyStyleElement?.setAttribute("style", "display:block");
      });
      document.querySelectorAll("pre.shiki.light").forEach((element) => {
        const applyStyleElement =
          element.parentElement?.className === "tag-container"
            ? element.parentElement
            : element;
        applyStyleElement?.setAttribute("style", "display:none");
      });
    } else {
      document.querySelectorAll("pre.shiki.light").forEach((element) => {
        const applyStyleElement =
          element.parentElement?.className === "tag-container"
            ? element.parentElement
            : element;
        applyStyleElement?.setAttribute("style", "display:block");
      });
      document.querySelectorAll("pre.shiki.theme").forEach((element) => {
        const applyStyleElement =
          element.parentElement?.className === "tag-container"
            ? element.parentElement
            : element;
        applyStyleElement?.setAttribute("style", "display:none");
      });
    }
  }, [darkMode]);

  useEffect(() => {
    updateCodeBlockTheme();

    router.events.on("routeChangeComplete", updateCodeBlockTheme);

    return () => {
      router.events.off("routeChangeComplete", updateCodeBlockTheme);
    };
  }, [darkMode, router.events, updateCodeBlockTheme]);
}
