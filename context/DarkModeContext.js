/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
const Context = createContext();

export function DarkModeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Context.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
