import { createContext, PropsWithChildren, ReactElement } from "react";
import type { ElementsData } from "types/posts";

const ElementsContext = createContext<ElementsData | undefined>(undefined);

interface ElementsContextProviderProps {
  elements: ElementsData;
}

export function ElementsContextProvider({
  elements,
  children,
}: PropsWithChildren<ElementsContextProviderProps>): ReactElement {
  return (
    <ElementsContext.Provider value={elements}>
      {children}
    </ElementsContext.Provider>
  );
}

export default ElementsContext;
