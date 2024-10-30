import { Children, ReactNode, isValidElement } from "react";
import * as prod from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export function useProcessHTML(text?: string): ReactNode[] | null {
  if (!text) return null;

  const file = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, production)
    .processSync(text);
  const children = Children.map(file.result, (child) => {
    if (isValidElement(child)) return child;
    return null;
  });

  return children;
}
