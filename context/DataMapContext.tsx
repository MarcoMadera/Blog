import { createContext, PropsWithChildren, ReactElement } from "react";

const DataMapContext = createContext<DataMapContextProviderProps | undefined>(
  undefined
);

interface DataMapContextProviderProps {
  addTweet: (id: string, hideConversation: boolean) => void;
  addImage: (src: { normal: string; full: string | undefined }) => void;
}

export function DataMapContextProvider({
  addTweet,
  addImage,
  children,
}: PropsWithChildren<DataMapContextProviderProps>): ReactElement {
  return (
    <DataMapContext.Provider value={{ addTweet, addImage }}>
      {children}
    </DataMapContext.Provider>
  );
}

export default DataMapContext;
