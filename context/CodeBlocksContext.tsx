import { createContext, PropsWithChildren, ReactElement } from "react";
import { CodeBlocks } from "types/posts";

const CodeBlocksContext = createContext<CodeBlocks | undefined>(undefined);

interface CodeBlocksContextProviderProps {
  codeBlocks: CodeBlocks;
}

export function CodeBlocksContextProvider({
  codeBlocks,
  children,
}: PropsWithChildren<CodeBlocksContextProviderProps>): ReactElement {
  return (
    <CodeBlocksContext.Provider value={codeBlocks}>
      {children}
    </CodeBlocksContext.Provider>
  );
}

export default CodeBlocksContext;
