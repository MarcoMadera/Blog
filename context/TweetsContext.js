/* eslint-disable react/prop-types */
import { createContext } from "react";

const TweetsContext = createContext({});

export function TweetsContextProvider({ tweets, children }) {
  return (
    <TweetsContext.Provider value={tweets}>{children}</TweetsContext.Provider>
  );
}

export default TweetsContext;
