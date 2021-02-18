/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
const Context = createContext();

export function CookiesContextProvider({ children }) {
  const [acceptedcookies, setAcceptedCookies] = useState();
  return (
    <Context.Provider value={{ acceptedcookies, setAcceptedCookies }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
