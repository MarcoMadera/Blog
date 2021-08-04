import codeStyles from "styles/codeStyles";
import { colors } from "styles/theme";
import markdown from "remark-parse";
import rehypePrism from "@mapbox/rehype-prism";
import rehype2react from "rehype-react";
import remark2rehype from "remark-rehype";
import unified from "unified";
import {
  createElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import useDarkMode from "hooks/useDarkMode";

interface InlineCodeProps {
  children: ReactNode[];
  classname?: string;
}

export function InlineCode({
  classname,
  children,
  ...attrbs
}: InlineCodeProps): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <code className={classname} {...attrbs}>
      {children}
      <style jsx>{`
        code {
          background: ${darkMode ? colors.dark_accents4 : colors.accents4};
        }
      `}</style>
      <style jsx>{`
        code {
          border-radius: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 14px;
          line-height: 1.8;
          padding: 3px 6px;
          overflow-wrap: break-word;
        }
      `}</style>
    </code>
  );
}

interface SpanProps {
  number: number;
}

function Span({ number }: SpanProps) {
  return <span>{`${number}\n`}</span>;
}

export function Pre({
  children,
  ...atrribs
}: PropsWithChildren<Record<string, string | ReactNode>>): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <div>
      <pre tabIndex={-1} {...atrribs}>
        {children}
      </pre>
      <style jsx>{`
        pre {
          background: ${darkMode ? colors.dark_background : colors.background};
          color: ${darkMode ? colors.dark_textColor : colors.dark_accents5};
          border: 1px solid ${darkMode ? "#45535d" : "#e1e8ed"};
        }
        pre :global(code[data-lang]:before) {
          background: ${darkMode ? colors.dark_background : colors.background};
          color: ${darkMode
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)"};
          border: 1px solid ${darkMode ? "#45535d" : "#e1e8ed"};
        }
      `}</style>
      <style jsx>{`
        div {
          margin: 20px 0;
          position: relative;
        }
        pre,
        pre :global(code),
        pre :global(code[data-lang]:before) {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        }
        pre {
          border-radius: 10px;
          display: block;
          font-size: 14px;
          hyphens: none;
          line-height: 1.8;
          margin: 0.5em 0px;
          overflow: auto;
          padding: 0.8em 1em;
          tab-size: 4;
          text-align: left;
          white-space: pre;
          word-break: normal;
          word-spacing: normal;
          word-wrap: normal;
          scrollbar-width: thin;
          scrollbar-color: #f03030bf transparent;
        }
        pre:focus {
          outline: none;
        }
        pre :global(code) {
          background: none;
          padding: 0;
        }
        pre::-webkit-scrollbar {
          height: 8px;
          width: 8px;
          overflow: visible;
        }
        pre::-webkit-scrollbar-thumb {
          background: #d32f2fe1;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 30px;
          border-bottom-left-radius: 30px;
        }
        pre::-webkit-scrollbar-track {
          background: transparent;
        }
        pre :global(code[data-lang]:before) {
          border-radius: 4px;
          content: attr(data-lang);
          font-size: 12px;
          padding: 2px 8px;
          position: absolute;
          right: 8px;
          text-transform: uppercase;
          top: -11px;
        }
      `}</style>
    </div>
  );
}

interface LeftLinesNumbersProps {
  lineNumbers: number[];
}

function LeftLinesNumbers({
  lineNumbers,
}: LeftLinesNumbersProps): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <code>
      {lineNumbers.map((number) => (
        <Span key={number} number={number} />
      ))}
      <style jsx>{`
        code {
          color: ${darkMode ? colors.dark_codeTextColor : colors.codeTextColor};
        }
      `}</style>
      <style jsx>{`
        code {
          float: left;
          font-size: 14px;
          margin-right: 10px;
        }
      `}</style>
    </code>
  );
}

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

interface CodeBlockProps {
  className?: string;
  language: string;
  meta?: string;
  value: ReactNode[];
  mdCode: boolean;
}

export function CodeBlock({
  language,
  value,
  mdCode,
}: PropsWithChildren<CodeBlockProps>): ReactElement {
  const { darkMode } = useDarkMode();
  const nodeValue = value[0] as string;
  const lineNumbers =
    typeof nodeValue === "object"
      ? []
      : Array.from(
          { length: (nodeValue?.match(/\n/g) || "").length },
          (_, i) => i + 1
        );

  const styles: {
    light: Record<string, string>;
    dark: Record<string, string>;
  } = codeStyles;

  const style = darkMode
    ? styles.dark[`${language}`] ?? undefined
    : styles.light[`${language}`] ?? undefined;

  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehype2react, {
      createElement: createElement,
      components: {
        pre: function PreformattedNode({ children }) {
          return (
            <>
              <Pre>{children as ReactNode}</Pre>
            </>
          );
        },
        code: function CodeNode({ children }) {
          return (
            <code data-lang={language}>
              <LeftLinesNumbers lineNumbers={lineNumbers} />
              {children}
            </code>
          );
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

  const file = processor.processSync(`~~~${language}\n${value}~~~`);

  return (
    <>
      {mdCode ? (
        file.result
      ) : (
        <Pre>
          <code data-lang={language}>{value}</code>
        </Pre>
      )}
      {style && (
        <style global jsx>
          {style}
        </style>
      )}
    </>
  );
}
