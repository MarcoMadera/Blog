import { unified } from "unified";
import markdown from "remark-parse";
import rehype2react from "rehype-react";
import remark2rehype from "remark-rehype";
import {
  createElement,
  ReactNode,
  ReactElement,
  JSXElementConstructor,
} from "react";
import * as prod from "react/jsx-runtime";
import shikiTwoslash from "remark-shiki-twoslash";
import markdownToHtmlAgain from "rehype-raw";

export default async function codeHighlighter(
  content: ReactNode,
  language?: string,
  meta?: string
): Promise<ReactElement<unknown, string | JSXElementConstructor<unknown>>> {
  const production = {
    createElement: createElement,
    // @ts-expect-error: the react types are missing.
    Fragment: prod.Fragment,
    // @ts-expect-error: the react types are missing.
    jsx: prod.jsx,
    // @ts-expect-error: the react types are missing.
    jsxs: prod.jsxs,
  };

  const processor = await unified()
    .use(markdown)
    .use([
      [shikiTwoslash, { themes: ["../../../lib/theme", "../../../lib/light"] }],
    ])
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(markdownToHtmlAgain)
    .use(rehype2react, production)
    .process(`~~~${language} ${meta} \n${content}~~~`);

  return processor.result as ReactElement<
    unknown,
    string | JSXElementConstructor<unknown>
  >;
}
