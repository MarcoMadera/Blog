import { ReactChild, ReactNode, ReactPortal } from "react";

export function getNodeText(
  node: ReactNode | ReactNode[] | ReactPortal | ReactChild
): string {
  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }
  if (!node) {
    return "";
  }
  if (["string", "number", "boolean"].includes(typeof node)) {
    return node.toString();
  }
  if (typeof node === "object") {
    return getNodeText((node as ReactPortal).props.children);
  }
  return "";
}
