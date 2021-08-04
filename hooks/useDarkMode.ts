import { Dispatch, SetStateAction, useContext } from "react";
import DarkModeContext from "context/DarkModeContext";

export default function useDarkMode(): {
  darkMode: boolean;
  setDarkMode?: Dispatch<SetStateAction<boolean>>;
  toggleDarkMode: () => void;
} {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  function toggleDarkMode() {
    if (!setDarkMode) {
      return;
    }
    if (darkMode === false) {
      localStorage.setItem("theme", "dark");
      return setDarkMode(true);
    }

    localStorage.setItem("theme", "light");
    return setDarkMode(false);
  }
  return {
    darkMode,
    setDarkMode,
    toggleDarkMode,
  };
}
