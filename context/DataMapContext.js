/* eslint-disable react/prop-types */
import { createContext } from "react";

const DataMapContext = createContext();

export function DataMapContextProvider({ addTweet, addImage, children }) {
  return (
    <DataMapContext.Provider value={{ addTweet, addImage }}>
      {children}
    </DataMapContext.Provider>
  );
}

export default DataMapContext;
