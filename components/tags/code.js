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
import styles from "./code.module.css";

export function InlineCode({ classname, children, ...attrbs }) {
  const { darkMode } = useDarkMode();
  return (
    <code
      className={`${
        classname ? `${`${classname} ${styles.inlineCode}`}` : styles.inlineCode
      } `}
      {...attrbs}
    >
      {children}
      <style jsx>{`
        code {
          background: ${darkMode ? colors.dark_accents4 : colors.accents4};
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
    <div className={styles.preCode}>
      <pre tabIndex="-1" {...atrribs}>
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
    </div>
  );
}

function LeftLinesNumbers({ lineNumbers }) {
  const { darkMode } = useDarkMode();
  return (
    <code className={styles.leftNumbers}>
      {lineNumbers.map((number) => (
        <Span key={number} number={number} />
      ))}
      <style jsx>{`
        code {
          color: ${darkMode ? colors.dark_codeTextColor : colors.codeTextColor};
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

export function CodeBlock({ language, value = "", mdCode }) {
  const { darkMode } = useDarkMode();
  const lineNumbers =
    typeof value[0] === "object"
      ? []
      : Array.from(
          { length: (value[0]?.match(/\n/g) || "").length },
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

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  language: PropTypes.string,
  meta: PropTypes.string,
  value: PropTypes.array,
  mdCode: PropTypes.bool,
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
