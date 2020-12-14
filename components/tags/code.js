import codeStyles from "../../styles/codeStyles";
import { colors } from "../../styles/theme";
import unified from "unified";
import markdown from "remark-parse";
import rehype2react from "rehype-react";
import remark2rehype from "remark-rehype";
import prism from "@mapbox/rehype-prism";
import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
export const InlineCode = ({ children, ...attrbs }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <code {...attrbs}>
      {children}
      <style jsx>{`
        code {
          background: ${darkMode ? colors.dark_accents4 : colors.accents4};
          padding: 3px 6px;
          border-radius: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          line-height: 1.8;
          font-size: 14px;
        }
      `}</style>
    </code>
  );
};

const Span = ({ number }) => {
  return <span>{`${number}\n`}</span>;
};

const LeftLinesNumbers = ({ lineNumbers }) => {
  return (
    <code>
      {lineNumbers.map((number) => (
        <Span key={number} number={number} />
      ))}
      <style jsx>{`
        code {
          float: left;
          margin-right: 10px;
          color: ${colors.accents1};
          font-size: 14px;
        }
      `}</style>
    </code>
  );
};

const customClasses = {
  atrule: "a",
  "attr-equals": "A",
  "attr-name": "b",
  "attr-value": "B",
  attribute: "c",
  boolean: "C",
  "class-name": "D",
  class: "D",
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

export const CodeBlock = ({ language, value = "" }) => {
  const { darkMode } = useContext(ThemeContext);
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
    .use(prism, [{ ignoreMissing: true }])
    .use(rehype2react, {
      createElement: React.createElement,
      components: {
        pre: function PreCode({ children }) {
          return (
            <pre>
              {children}
              <style jsx>{`
                pre {
                  border: 1px solid #ccc;
                  border-radius: 10px;
                  color: ${darkMode
                    ? colors.dark_textColor
                    : colors.dark_accents5};
                  display: block;
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
                    Consolas, "Liberation Mono", "Courier New", monospace;
                  font-size: 14px;
                  hyphens: none;
                  line-height: 1.8;
                  background: ${darkMode
                    ? colors.dark_background
                    : colors.background};
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
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
                    Consolas, "Liberation Mono", "Courier New", monospace;
                }
              `}</style>
            </pre>
          );
        },
        code: function CodeBlock({ children }) {
          return (
            <code data-lang={language}>
              <LeftLinesNumbers lineNumbers={lineNumbers} />
              {children}
              <style jsx>{`
                code::before {
                  border-radius: 4px;
                  color: ${darkMode
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)"};
                  content: attr(data-lang);
                  font-size: 12px;
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
                    Consolas, "Liberation Mono", "Courier New", monospace;
                  padding: 2px 8px;
                  position: absolute;
                  right: 8px;
                  text-transform: uppercase;
                  top: -11px;
                  border: 1px solid #ccc;
                  background: ${darkMode
                    ? colors.dark_background
                    : colors.background};
                }
              `}</style>
            </code>
          );
        },
        span: function Spann({ className, children }) {
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
};

LeftLinesNumbers.propTypes = {
  lineNumbers: PropTypes.array,
};
InlineCode.propTypes = {
  children: PropTypes.node,
};
Span.propTypes = {
  number: PropTypes.number,
};
CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
  meta: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
