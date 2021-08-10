import { Dispatch, SetStateAction, useContext } from "react";
import DarkModeContext from "context/DarkModeContext";
import useLocalStorage from "./useLocalStorage";

export default function useDarkMode(): {
  darkMode: boolean;
  setDarkMode?: Dispatch<SetStateAction<boolean>>;
  toggleDarkMode: () => void;
} {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const setThemeLocalStorage = useLocalStorage("theme", "dark")[1];

  function toggleDarkMode() {
    if (!setDarkMode) {
      return;
    }
    if (darkMode === false) {
      setThemeLocalStorage("dark");
      return setDarkMode(true);
    }

    setThemeLocalStorage("light");
    return setDarkMode(false);
  }
  return {
    darkMode,
    setDarkMode,
    toggleDarkMode,
  };
}
