import { ReactNode, useContext } from "react";
import CodeBlocksContext from "context/CodeBlocksContext";
import DataMapContext from "context/DataMapContext";
import { CodeBlockData } from "types/posts";

export default function useCodeBlock(
  id: number,
  content: ReactNode[],
  language: string
):
  | {
      ignore: boolean;
      data?: undefined;
    }
  | {
      data: CodeBlockData | undefined;
      ignore?: undefined;
    } {
  const codeBlocks = useContext(CodeBlocksContext);
  const data = useContext(DataMapContext);
  if (data?.addCodeBlock) {
    data.addCodeBlock(id, content, language);
    return { ignore: true };
  }

  return { data: codeBlocks ? codeBlocks[id] : undefined };
}
