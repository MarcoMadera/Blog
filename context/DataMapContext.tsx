import { createContext, PropsWithChildren, ReactElement } from "react";
import type { Element } from "types/posts";
const DataMapContext = createContext<DataMapContextProviderProps | undefined>(
  undefined
);

interface DataMapContextProviderProps {
  addElement: (element: Element) => void;
}

export function DataMapContextProvider({
  addElement,
  children,
}: PropsWithChildren<DataMapContextProviderProps>): ReactElement {
  return (
    <DataMapContext.Provider value={{ addElement }}>
      {children}
    </DataMapContext.Provider>
  );
}

export default DataMapContext;
