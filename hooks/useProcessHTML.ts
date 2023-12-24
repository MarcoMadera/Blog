import {
  Children,
  ReactNode,
  isValidElement,
  useEffect,
  useState,
} from "react";
import * as prod from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export function useProcessHTML(text?: string): ReactNode[] | null {
  const [content, setContent] = useState<ReactNode[] | null>(null);

  useEffect(
    function () {
      (async function () {
        if (!text) return;
        const file = await unified()
          .use(rehypeParse, { fragment: true })
          .use(rehypeReact, production)
          .process(text);
        const children = Children.map(file.result, (child) => {
          if (isValidElement(child)) return child;
          return null;
        });
        setContent(children);
      })();
    },
    [text]
  );

  return content;
}
