import { createContext, PropsWithChildren, ReactElement } from "react";
import { Elements } from "types/posts";

const ElementsContext = createContext<Elements | undefined>(undefined);

interface ElementsContextProviderProps {
  elements: Elements;
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
