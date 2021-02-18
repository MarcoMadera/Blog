import { useContext } from "react";
import DarkModeContext from "../context/DarkModeContext";

export default function useDarkMode() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  function toggleDarkMode() {
    if (darkMode === false) {
      localStorage.setItem("theme", "dark");
      return setDarkMode(true);
    } else {
      localStorage.setItem("theme", "light");
      return setDarkMode(false);
    }
  }
  return {
    darkMode,
    setDarkMode,
    toggleDarkMode,
  };
}
