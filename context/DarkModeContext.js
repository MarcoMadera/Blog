/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
const DarkModeContext = createContext({ darkMode: true });

export function DarkModeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
