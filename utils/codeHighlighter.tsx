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
import { ReactMarkdownProps } from "react-markdown/lib/ast-to-react";
import React, { PropsWithChildren } from "react";
import { CreateElementLike } from "rehype-react/lib";
import shikiTwoslash from "remark-shiki-twoslash";
import markdownToHtmlAgain from "rehype-raw";

export default async function codeHighlighter(
  content: ReactNode[],
  language?: string,
  meta?: string
): Promise<ReactElement<unknown, string | JSXElementConstructor<unknown>>> {
  const processor = await unified()
    .use(markdown)
    .use([
      [shikiTwoslash, { themes: ["../../../lib/theme", "../../../lib/light"] }],
    ])
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(markdownToHtmlAgain)
    .use(rehype2react, {
      createElement: createElement as CreateElementLike,
      components: {
        code: function CodeNode(props: PropsWithChildren<unknown>) {
          const { children } = props as ReactMarkdownProps;
          return (
            <code {...props} data-lang={language}>
              {children}
            </code>
          );
        },
      },
    })
    .process(`~~~${language} ${meta} \n${content}~~~`);

  return processor.result as ReactElement<
    unknown,
    string | JSXElementConstructor<unknown>
  >;
}
