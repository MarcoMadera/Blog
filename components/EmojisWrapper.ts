import {
  createElement,
  createRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactHTML,
  useEffect,
} from "react";
import twemoji, { ParseObject } from "twemoji";

interface EmojisWrapperProps {
  tag?: keyof ReactHTML;
  options?: Partial<ParseObject>;
  attributes?: HTMLAttributes<EmojisWrapperProps["tag"]>;
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
