import { unified } from "unified";
import markdown from "remark-parse";
import rehypePrism from "@mapbox/rehype-prism";
import rehype2react from "rehype-react";
import remark2rehype from "remark-rehype";
import {
  createElement,
  ReactNode,
  ReactElement,
  JSXElementConstructor,
} from "react";
import { ReactMarkdownProps } from "react-markdown/lib/ast-to-react";
import React from "react";
import { CreateElementLike } from "rehype-react/lib";

const customClasses: Record<string, string> = {
  atrule: "a",
  "attr-equals": "A",
  "attr-name": "b",
  "attr-value": "B",
  attribute: "c",
  boolean: "C",
  class: "d",
  "class-name": "D",
  color: "e",
  comment: "E",
  "control-flow": "f",
  function: "F",
  id: "g",
  important: "G",
  interpolation: "h",
  keyword: "H",
  "maybe-class-name": "i",
  module: "I",
  "n-th": "j",
  nil: "J",
  number: "k",
  operator: "K",
  parameter: "l",
  "plain-text": "L",
  "property-access": "m",
  property: "M",
  "pseudo-class": "n",
  "pseudo-element": "N",
  punctuation: "o",
  "regex-delimiter": "O",
  rule: "p",
  selector: "P",
  string: "q",
  style: "Q",
  tag: "r",
  "template-string": "R",
  unit: "s",
  url: "S",
  variable: "t",
  regex: "T",
  "regex-flags": "u",
};

export default function codeHighlighter(
  content: ReactNode[],
  language?: string
): ReactElement<unknown, string | JSXElementConstructor<unknown>> {
  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehype2react, {
      createElement: createElement as CreateElementLike,
      components: {
        pre: function PreformattedNode(props: unknown) {
          const { children } = props as ReactMarkdownProps;
          return <>{children}</>;
        },
        code: function CodeNode(props: unknown) {
          const { children } = props as ReactMarkdownProps;
          return <>{children}</>;
        },
        span: function SpanNode(props: unknown) {
          const { children, className } = props as {
            children: ReactNode[];
            className: string;
          };
          const classNames = className.split(" ");
          return (
            <span
              className={
                !classNames[classNames.length - 1].includes("language-")
                  ? customClasses[classNames[classNames.length - 1]] ??
                    classNames[classNames.length - 1]
                  : classNames[classNames.length - 1].replace("language-", "")
              }
            >
              {children as ReactNode}
            </span>
          );
        },
      },
    });

  const processData = processor.processSync(`~~~${language}\n${content}~~~`);
  return processData.result as ReactElement<
    unknown,
    string | JSXElementConstructor<unknown>
  >;
}
