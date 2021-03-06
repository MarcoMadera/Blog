import codeStyles from "../../styles/codeStyles";
import { colors } from "../../styles/theme";
import markdown from "remark-parse";
import prism from "@mapbox/rehype-prism";
import PropTypes from "prop-types";
import rehype2react from "rehype-react";
import remark2rehype from "remark-rehype";
import unified from "unified";
import { createElement } from "react";
import useDarkMode from "../../hooks/useDarkMode";

export function InlineCode({ classname, children, ...attrbs }) {
  const { darkMode } = useDarkMode();

  return (
    <code className={classname} {...attrbs}>
      {children}
      <style jsx>{`
        code {
          background: ${darkMode ? colors.dark_accents4 : colors.accents4};
          border-radius: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 14px;
          line-height: initial;
          padding: 3px 6px;
          display: inline-block;
        }
      `}</style>
    </code>
  );
}

function Span({ number }) {
  return <span>{`${number}\n`}</span>;
}

export function Pre({ children, ...atrribs }) {
  const { darkMode } = useDarkMode();
  return (
    <div>
      <pre {...atrribs}>{children}</pre>
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
          background: ${darkMode ? colors.dark_background : colors.background};
          border: 1px solid #ccc;
          border-radius: 10px;
          color: ${darkMode ? colors.dark_textColor : colors.dark_accents5};
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
          background: ${darkMode ? colors.dark_background : colors.background};
          border: 1px solid #ccc;
          border-radius: 4px;
          color: ${darkMode
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)"};
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

function LeftLinesNumbers({ lineNumbers }) {
  const { darkMode } = useDarkMode();
  return (
    <code>
      {lineNumbers.map((number) => (
        <Span key={number} number={number} />
      ))}
      <style jsx>{`
        code {
          color: ${darkMode ? colors.dark_codeTextColor : colors.codeTextColor};
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

export function CodeBlock({ language, value = "" }) {
  const { darkMode } = useDarkMode();

  const lineNumbers = Array.from(
    { length: (value.match(/\n/g) || "").length + 1 },
    (_, i) => i + 1
  );

  const style = darkMode
    ? codeStyles.dark[`${language}`] ?? undefined
    : codeStyles.light[`${language}`] ?? undefined;

  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(prism, { ignoreMissing: true })
    .use(rehype2react, {
      createElement: createElement,
      components: {
        pre: function PreformattedNode({ children }, i) {
          return <Pre key={i}>{children}</Pre>;
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
          const clase = className.split(" ");
          return (
            <span
              className={
                !clase[clase.length - 1].includes("language-")
                  ? customClasses[clase[clase.length - 1]] ??
                    clase[clase.length - 1]
                  : clase[clase.length - 1].replace("language-", "")
              }
            >
              {children}
            </span>
          );
        },
      },
    });

  const file = processor.processSync(`~~~${language}\n${value}\n~~~`);

  return (
    <>
      {file.contents.props.children}
      {style && (
        <style global jsx>
          {style}
        </style>
      )}
    </>
  );
}

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  language: PropTypes.string,
  meta: PropTypes.string,
  value: PropTypes.string,
};
InlineCode.propTypes = {
  classname: PropTypes.string,
  children: PropTypes.node,
};
LeftLinesNumbers.propTypes = {
  lineNumbers: PropTypes.array,
};
Pre.propTypes = {
  children: PropTypes.node,
};
Span.propTypes = {
  number: PropTypes.number,
};
