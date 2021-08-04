import { createContext, PropsWithChildren, ReactElement } from "react";
import { Images } from "types/posts";

const ImagesContext = createContext<Images | undefined>(undefined);

interface ImagesContextProviderProps {
  images: Images;
}

export function ImagesContextProvider({
  images,
  children,
}: PropsWithChildren<ImagesContextProviderProps>): ReactElement {
  return (
    <ImagesContext.Provider value={images}>{children}</ImagesContext.Provider>
  );
}

export default ImagesContext;
