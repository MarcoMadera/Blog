import {
  createRef,
  PropsWithChildren,
  ReactElement,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import twemoji from "twemoji";

interface EmojisWrapperProps {
  options?: Partial<TwemojiOptions>;
}

export default function EmojisWrapper({
  options,
  children,
}: PropsWithChildren<EmojisWrapperProps>): ReactElement {
  const rootRef = createRef<HTMLElement>();

  useEffect(() => {
    const defaultOptions = {
      className: "twemoji",
    };

    if (rootRef.current) {
      twemoji.parse(rootRef.current, options ?? defaultOptions);
    }
  }, [rootRef, options]);

  const childrenWithRootRef = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, { ref: rootRef });
    }
    return child;
  });

  return <>{childrenWithRootRef}</>;
}
