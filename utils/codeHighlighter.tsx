import unified from "unified";
import markdown from "remark-parse";
import rehypePrism from "@mapbox/rehype-prism";
import rehype2react from "rehype-react";
import remark2rehype from "remark-rehype";
import { createElement, ReactNode } from "react";

const customClasses = {
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
};

export default function codeHighlighter(
  content: ReactNode[],
  language?: string
): ReactNode[] {
  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehype2react, {
      createElement: createElement,
      components: {
        pre: function PreformattedNode({ children }) {
          return <>{children as ReactNode}</>;
        },
        code: function CodeNode({ children }) {
          return <>{children}</>;
        },
        span: function SpanNode({ className, children }) {
          const cless = className as string;
          const clase = cless.split(" ");
          const allCustomClasses: Record<string, string> = customClasses;
          return (
            <span
              className={
                !clase[clase.length - 1].includes("language-")
                  ? allCustomClasses[clase[clase.length - 1]] ??
                    clase[clase.length - 1]
                  : clase[clase.length - 1].replace("language-", "")
              }
            >
              {children as ReactNode}
            </span>
          );
        },
      },
    });

  const processData = processor.processSync(`~~~${language}\n${content}~~~`);
  return processData.result as ReactNode[];
}
