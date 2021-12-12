import { useContext } from "react";
import ElementsContext from "context/ElementsContext";
import DataMapContext from "context/DataMapContext";
import {
  Element,
  ElementCodeBlock,
  ElementImage,
  ElementTweet,
  ElementSpace,
  Ids,
  UElementRes,
} from "types/posts";

function useElementData(element: ElementImage): UElementRes["Img"];
function useElementData(element: ElementTweet): UElementRes["Tweet"];
function useElementData(element: ElementSpace): UElementRes["Space"];
function useElementData(element: ElementCodeBlock): UElementRes["CodeBlock"];
function useElementData(element: Element): UElementRes["Response"] {
  const elements = useContext(ElementsContext);
  const data = useContext(DataMapContext);
  const id: Ids = `${element.type}:${element.id}`;

  if (data?.addElement) {
    data.addElement(element);
    return { data: undefined, ignore: true };
  }

  return { data: elements ? elements[id] : undefined, ignore: false };
}

export default useElementData;
