import codeStyles from "../../styles/codeStyles";
import { colors } from "../../styles/theme";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "refractor/lang/json";
import css from "refractor/lang/css";

export const InlineCode = ({ children }) => {
  return (
    <code>
      {children}
      <style jsx>{`
        code {
          background: #f5f5f5;
          padding: 3px 6px;
          border-radius: 6px;
        }
      `}</style>
    </code>
  );
};

export const CodeBlock = ({ language, value = "" }) => {
  SyntaxHighlighter.registerLanguage("json", json);
  SyntaxHighlighter.registerLanguage("css", css);
  const style = codeStyles[`${language}`] ?? undefined;
  return (
    <div style={{ position: "relative", margin: "20px 0" }}>
      <SyntaxHighlighter
        showLineNumbers={true}
        showInlineLineNumbers={false}
        wrapLines={false}
        language={language}
        useInlineStyles={false}
        lineNumberStyle={{ color: "#aaa", fontSize: "14px" }}
        codeTagProps={{ "data-lang": language }}
        PreTag={({ children }) => <pre>{children}</pre>}
      >
        {value}
      </SyntaxHighlighter>
      {style && (
        <style global jsx>
          {style}
        </style>
      )}
      {language && (
        <style global jsx>{`
          code[data-lang]::before {
            border-radius: 4px;
            color: rgba(0, 0, 0, 0.7);
            content: attr(data-lang);
            font-size: 12px;
            padding: 2px 8px;
            position: absolute;
            right: 8px;
            text-transform: uppercase;
            top: -11px;
            border: 1px solid #ccc;
            background: ${colors.white};
          }
          code[data-lang] {
            width: 100%;
          }
          code,
          pre {
            font-family: Roboto Mono, monospace;
            hyphens: none;
            line-height: 1.8;
            overflow: auto;
            tab-size: 4;
            text-align: left;
            white-space: pre;
            word-break: normal;
            word-spacing: normal;
            word-wrap: normal;
            font-size: 14px;
          }
          pre {
            display: block;
            border-radius: 10px;
            margin: 0.5em 0px;
            overflow: auto;
            padding: 0.8em 1em;
            border: 1px solid #ccc;
            color: rgb(36, 41, 46);
          }
          code span {
            font-family: monospace;
          }
        `}</style>
      )}
    </div>
  );
};
