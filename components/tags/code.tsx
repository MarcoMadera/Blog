import codeStyles from "styles/codeStyles";
import { colors } from "styles/theme";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import useDarkMode from "hooks/useDarkMode";
import HtmlToReact from "html-to-react";
import useElementData from "hooks/useElementData";

interface InlineCodeProps {
  classname?: string;
}

export function InlineCode({
  classname,
  children,
  ...attrbs
}: PropsWithChildren<InlineCodeProps>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <code className={classname} {...attrbs}>
      {children}
      <style jsx>{`
        code {
          background: ${darkMode ? "#2F333A" : "#F5F5F5"};
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
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
          color: ${darkMode ? colors.dark_textColor : colors.dark_accents5};
          border: 1px solid ${darkMode ? "#45535d" : "#e1e8ed"};
        }
        pre :global(code[data-lang]:before) {
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
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

export function LeftLinesNumbers({
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

interface CodeBlockProps {
  className?: string;
  language: string;
  meta?: string;
  value: ReactNode[];
  mdCode: boolean;
  id: number;
}

export function CodeBlock({
  language,
  value,
  mdCode,
  id,
}: PropsWithChildren<CodeBlockProps>): ReactElement | null {
  const { darkMode } = useDarkMode();
  const { data, ignore } = useElementData({
    type: "codeBlock",
    content: value,
    id: id.toString(),
    language,
  });

  if (ignore) {
    return null;
  }

  const nodeValue = value[0];
  const lineNumbers =
    typeof nodeValue === "string"
      ? Array.from(
          { length: (nodeValue.match(/\n/g) || "").length },
          (_, i) => i + 1
        )
      : [];

  const styles: {
    light: Record<string, ReactElement>;
    dark: Record<string, ReactElement>;
  } = codeStyles;

  const style = darkMode
    ? styles.dark[`${language}`] ?? undefined
    : styles.light[`${language}`] ?? undefined;

  const htmlToReactParser = HtmlToReact.Parser();

  return (
    <>
      {mdCode && data ? (
        <code data-lang={language}>
          <LeftLinesNumbers lineNumbers={lineNumbers} />
          {htmlToReactParser.parse(data.result)}
        </code>
      ) : (
        <code data-lang={language}>{value}</code>
      )}
      {style && (
        <style global jsx>
          {style}
        </style>
      )}
    </>
  );
}
