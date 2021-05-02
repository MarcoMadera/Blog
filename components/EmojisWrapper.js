import { createElement, createRef, useEffect } from "react";
import twemoji from "twemoji";
import propTypes from "prop-types";

export default function EmojisWrapper({
  tag = "div",
  other,
  options,
  children,
}) {
  const rootRef = createRef();
  useEffect(() => {
    twemoji.parse(rootRef.current, options);
  }, [rootRef, options]);

  return createElement(tag, { ref: rootRef, ...other }, children);
}

EmojisWrapper.propTypes = {
  tag: propTypes.string,
  other: propTypes.any,
  options: propTypes.any,
  children: propTypes.any,
};
