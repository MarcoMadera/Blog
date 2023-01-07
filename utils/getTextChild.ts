import { isValidElement, ReactFragment, ReactPortal } from "react";

export function getTextChild(
  children: string | number | boolean | ReactFragment | ReactPortal
): string | string[] {
  if (typeof children === "string") {
    return children;
  }
  if (isValidElement(children)) {
    return getTextChild(children?.props?.children);
  }
  if (Array.isArray(children)) {
    return children.map((child) => getTextChild(child)).join("");
  }
  return "";
}
