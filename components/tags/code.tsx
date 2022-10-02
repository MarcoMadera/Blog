import codeStyles from "styles/codeStyles";
import { colors } from "styles/theme";
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  Children,
  isValidElement,
  ReactFragment,
  ReactPortal,
} from "react";
import useDarkMode from "hooks/useDarkMode";
import HtmlToReact from "html-to-react";
import useElementData from "hooks/useElementData";
import { ElementType } from "types/posts";
import useNotification from "hooks/useNotification";
import { CopyToClipboard } from "components/icons/CopyToClipboard";

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
  const { addNotification } = useNotification();

  function getTextChild(
    children: string | number | boolean | ReactFragment | ReactPortal
  ): string | string[] {
    if (typeof children === "string") {
      return children;
    }
    if (isValidElement(children)) {
      return getTextChild(children?.props?.children);
    }
    if (Array.isArray(children)) {
      return children.map((child) => getTextChild(child)).join("");
    }
    return "";
  }
  const copyToClipboard = () => {
    const data = Children.map(children, (child) => {
      return getTextChild((child as ReactElement)?.props?.children);
    });
    if (data) {
      try {
        navigator.clipboard.writeText(data?.join(""));
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
      <pre tabIndex={-1} {...atrribs}>
        {children}
        <button
          title="Copiar al portapapeles"
          aria-label="Copiar al portapapeles"
          onClick={copyToClipboard}
        >
          <CopyToClipboard color="#ccc" width={30} height={30} />
        </button>
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
          overflow: auto;
          padding: 0.8em 0;
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

interface MetaData {
  addedLines: number[];
  removedLines: number[];
  highlight: number[];
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
  });

  let metadata = {} as MetaData;

  try {
    metadata = JSON.parse(meta?.toString() || "{}");
  } catch {
    metadata = {} as MetaData;
  }
  const { addedLines, removedLines, highlight }: MetaData = metadata;

  if (ignore) {
    return null;
  }

  const nodeValue = value[0];
  const code = data?.result as string;
  const lines = code?.split("\n");
  if (lines?.[0]) {
    lines[0] = lines[0].replace("<div>", "");
    lines.pop();
  }

  const valueArray = Children.toArray(value).filter(
    (child) => child !== "\n" && child
  );
  const numberOfNewLines = valueArray.filter((child) => {
    if (isValidElement(child)) {
      return true;
    }
    return false;
  }).length;

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

  const style = darkMode
    ? styles.dark[`${language}`] ?? styles.dark["default"]
    : styles.light[`${language}`] ?? styles.light["default"];

  const htmlToReactParser = HtmlToReact.Parser();

  return (
    <>
      {mdCode && data ? (
        <code data-lang={language}>
          {lines.map((line, index) => {
            const isAddedLine = addedLines?.includes(index + 1);
            const isRemovedLine = removedLines?.includes(index + 1);
            const isHighlightedLine = highlight?.includes(index + 1);

            const dataLine = isAddedLine
              ? "+"
              : isRemovedLine
              ? "-"
              : index + 1;
            return (
              <span data-line={dataLine} key={index}>
                {htmlToReactParser.parse(line) || " "}
                <style jsx>{`
                  span {
                    display: block;
                    position: relative;
                    width: 100%;
                  }
                  span:before {
                    content: attr(data-line);
                    display: inline-block;
                    width: 1.5em;
                    margin-right: 0.5em;
                    text-align: left;
                    color: ${
                      isAddedLine
                        ? "rgb(48, 200, 94)"
                        : isRemovedLine
                        ? "rgb(255, 69, 69)"
                        : isHighlightedLine
                        ? "#d6bcf7"
                        : "rgb(170, 170, 170)"
                    };
                    border-left: 6px solid ${
                      isHighlightedLine ? "#d6bcf7" : "transparent"
                    });
                    padding-left: 10px;
                  }
                  span:after {
                    content: "";
                    left: 0;
                    opacity: 0.15;
                    pointer-events: none;
                    position: absolute;
                    top: 0;
                    width: 100%;
                    background-color: ${
                      isHighlightedLine
                        ? "#d6bcf7"
                        : isAddedLine
                        ? "rgb(48, 200, 94)"
                        : isRemovedLine
                        ? "rgb(255, 69, 69)"
                        : "transparent"
                    };
                    height: 100%;
                  }
                `}</style>
              </span>
            );
          })}
        </code>
      ) : (
        <code data-lang={language}>
          <LeftLinesNumbers lineNumbers={lineNumbers} />
          {value}
          <style jsx>{`
            code[data-lang=${language}] {
              display: block;
              padding: 10px 20px;
            }
          `}</style>
        </code>
      )}
      {style && (
        <style global jsx>
          {style}
        </style>
      )}
    </>
  );
}
