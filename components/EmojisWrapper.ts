import {
  Attributes,
  createElement,
  createRef,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from "react";
import twemoji, { ParseObject } from "twemoji";

interface EmojisWrapperProps {
  tag?: string;
  options?: Partial<ParseObject>;
  attributes?: Attributes;
}

export default function EmojisWrapper({
  tag = "div",
  attributes,
  options,
  children,
}: PropsWithChildren<EmojisWrapperProps>): ReactElement {
  const rootRef = createRef();
  useEffect(() => {
    twemoji.parse(rootRef.current as HTMLElement, options);
  }, [rootRef, options]);

  return createElement(tag, { ref: rootRef, ...attributes }, children);
}
