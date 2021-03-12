/* eslint-disable react/prop-types */
import { createContext } from "react";

const TweetsMapContext = createContext();

export function TweetsMapContextProvider({ addTweet, children }) {
  return (
    <TweetsMapContext.Provider value={addTweet}>
      {children}
    </TweetsMapContext.Provider>
  );
}

export default TweetsMapContext;
