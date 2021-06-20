/* eslint-disable react/prop-types */
import { createContext } from "react";

const ImagesContext = createContext({});

export function ImagesContextProvider({ images, children }) {
  return (
    <ImagesContext.Provider value={images}>{children}</ImagesContext.Provider>
  );
}

export default ImagesContext;
