import codeStyles from "styles/codeStyles";
import { colors } from "styles/theme";
import { PropsWithChildren, ReactElement, ReactNode, Children } from "react";
import useDarkMode from "hooks/useDarkMode";
import HtmlToReact from "html-to-react";
import useElementData from "hooks/useElementData";
import { ElementType } from "types/posts";
import useNotification from "hooks/useNotification";
import { CopyToClipboard } from "components/icons/CopyToClipboard";
import useToolTip from "hooks/useToolTip";
import { getTextChild } from "utils/getTextChild";
import { DEFAULT } from "styles/code/languages/default";

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
}: PropsWithChildren<Record<string, string | ReactNode>>): ReactElement {
  const { darkMode } = useDarkMode();
  const { addNotification } = useNotification();
  const { getToolTipAttributes } = useToolTip();

  const copyToClipboard = () => {
    const data = Children.map(children, (child) => {
      return getTextChild((child as ReactElement)?.props?.children);
    });
    if (data) {
      try {
        navigator.clipboard.writeText(data.join(""));
        addNotification({
          variant: "success",
          message: "Copiado al portapapeles",
        });
        return;
      } catch (error) {
        addNotification({
          variant: "error",
          message: "Error al copiar al portapapeles",
        });
        return;
      }
    }
    addNotification({
      variant: "error",
      message: "Error al copiar al portapapeles",
    });
  };

  return (
    <div>
      {children}
      <button
        aria-label="Copiar al portapapeles"
        onClick={copyToClipboard}
        {...getToolTipAttributes("Copiar al portapapeles")}
      >
        <CopyToClipboard color="#ccc" width={30} height={30} />
      </button>
      <style global jsx>{`
        pre {
          background: ${darkMode ? colors.cinder : colors.romance};
          color: ${darkMode ? colors.greyGoose : colors.balticSea};
          border: 1px solid ${darkMode ? "#45535d" : "#e1e8ed"};
        }
        pre :global(code[data-lang]:before) {
          background: ${darkMode ? colors.cinder : colors.romance};
          color: ${darkMode
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)"};
          border: 1px solid ${darkMode ? "#45535d" : "#e1e8ed"};
        }
      `}</style>
      <style jsx>{`
        button {
          background: ${darkMode ? "rgba(31, 41, 55, 1)" : "#fefefe"};
          border: ${darkMode
            ? "1px solid transparent"
            : "1px solid rgba(31, 41, 55, 0.2)"};
        }
        button:hover,
        button:focus {
          background: ${darkMode ? "rgba(31, 41, 55, 0.8)" : "#fefefe"};
          border: ${darkMode
            ? "1px solid transparent"
            : "1px solid rgba(31, 41, 55, 0.8)"};
        }
      `}</style>
      <style global jsx>{`
        pre,
        pre :global(code),
        pre :global(code[data-lang]:before) {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        }
        pre {
          border-radius: 10px;
          display: grid;
          font-size: 14px;
          hyphens: none;
          line-height: 1.8;
          margin: 0.5em 0px;
          tab-size: 4;
          text-align: left;
          white-space: pre;
          word-break: normal;
          word-spacing: normal;
          word-wrap: normal;
          scrollbar-width: thin;
          scrollbar-color: #f03030bf transparent;
          min-height: 80px;
          align-items: center;
        }
        pre:focus {
          outline: none;
        }
        pre :global(code) {
          background: none;
          padding: 0;
          display: grid;
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
      <style jsx>{`
        div {
          margin: 20px 0;
          position: relative;
        }
        button {
          position: absolute;
          bottom: 20px;
          right: 20px;

          outline: none;
          cursor: pointer;
          border-radius: 6px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
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
          color: ${darkMode ? colors.silverChalice : colors.boulder};
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
  meta,
}: PropsWithChildren<CodeBlockProps>): ReactElement | null {
  const { darkMode } = useDarkMode();
  const { data, ignore } = useElementData({
    type: ElementType.CODEBLOCK,
    content: value,
    id: id.toString(),
    language,
    meta: meta || "",
  });

  if (ignore) {
    return null;
  }

  const nodeValue = value[0];
  const code = data?.result as string;
  const classLines = code?.match(/class="line"/g);
  const lines = code?.split("\n");
  if (lines?.[0]) {
    lines[0] = lines[0].replace("<div>", "");
    lines.pop();
  }
  const numberOfNewLines = classLines?.length || 0;

  const lineNumbers =
    typeof nodeValue === "string"
      ? Array.from(
          { length: (nodeValue.match(/\n/g) || "").length },
          (_, i) => i + 1
        )
      : Array.from({ length: numberOfNewLines }, (_, i) => i + 1);

  const styles: {
    light: Record<string, ReactElement>;
    dark: Record<string, ReactElement>;
  } = codeStyles;

  const style = darkMode ? styles.dark["default"] : styles.light["default"];

  const htmlToReactParser = HtmlToReact.Parser();

  return (
    <>
      {mdCode && data ? (
        <code>{htmlToReactParser.parse(code) || " "}</code>
      ) : (
        <pre>
          <code data-lang={language}>
            <LeftLinesNumbers lineNumbers={lineNumbers} />
            {value}
          </code>
          <style jsx>{`
            code[data-lang=${language}] {
              display: block;
              padding: 10px 20px;
              overflow: auto;
            }
            code::-webkit-scrollbar {
              height: 8px;
              width: 8px;
              overflow: visible;
            }
            code::-webkit-scrollbar-thumb {
              background: #d32f2fe1;
              border-top-left-radius: 0;
              border-top-right-radius: 0;
              border-bottom-right-radius: 30px;
              border-bottom-left-radius: 30px;
            }
            code::-webkit-scrollbar-track {
              background: transparent;
            }
          `}</style>
        </pre>
      )}
      {style && (
        <style global jsx>
          {style}
        </style>
      )}
      {
        <style global jsx>
          {DEFAULT}
        </style>
      }
    </>
  );
}
