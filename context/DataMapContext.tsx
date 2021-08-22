import { createContext, PropsWithChildren, ReactElement } from "react";
import { ReactNode } from "react";

const DataMapContext = createContext<DataMapContextProviderProps | undefined>(
  undefined
);

interface DataMapContextProviderProps {
  addTweet: (id: string, hideConversation: boolean) => void;
  addImage: (src: { normal: string; full: string | undefined }) => void;
  addCodeBlock: (id: number, content: ReactNode[], language?: string) => void;
}

export function DataMapContextProvider({
  addTweet,
  addImage,
  addCodeBlock,
  children,
}: PropsWithChildren<DataMapContextProviderProps>): ReactElement {
  return (
    <DataMapContext.Provider value={{ addTweet, addImage, addCodeBlock }}>
      {children}
    </DataMapContext.Provider>
  );
}

export default DataMapContext;
