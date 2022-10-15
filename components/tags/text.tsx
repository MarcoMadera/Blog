import { colors } from "styles/theme";
import { colors as codeColors } from "styles/code/colors";
import useDarkMode from "hooks/useDarkMode";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import { noteStyles } from "../../styles/components/noteStyles";
import { Bulb, Info, Alert, Star, Check } from "components/icons";
import useToolTip from "hooks/useToolTip";

interface Text {
  children: ReactNode;
}

interface AbbrProps extends Text {
  title?: string;
}

export function Abbr({ children, title, ...attribs }: AbbrProps): ReactElement {
  const { darkMode } = useDarkMode();
  const { getToolTipAttributes } = useToolTip();

  return (
    <abbr {...getToolTipAttributes(title ?? "")} {...attribs}>
      {children}
      <style jsx>{`
        abbr:after {
          border-color: ${darkMode ? colors.dark_primary : colors.primary};
        }
      `}</style>
      <style jsx>{`
        abbr {
          position: relative;
          text-decoration: none;
        }
        abbr:after {
          border-style: dashed;
          border-width: 0 0 2px;
          bottom: 0px;
          content: "";
          width: 100%;
          left: 0;
          position: absolute;
        }
        @media print {
          abbr:after {
            border: none;
            content: " (" attr(${title}) ") ";
            position: unset;
          }
        }
      `}</style>
    </abbr>
  );
}

export function Blockquote({ children }: Text): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <blockquote>
      {children}
      <style jsx>{`
        blockquote {
          background: ${darkMode ? colors.dark_accents3 : colors.accents3};
        }
      `}</style>
      <style jsx>{`
        blockquote {
          display: block;
          position: relative;
          padding: 0px 40px 0px 40px;
          border: 1px solid #cccccc4d;
          border-radius: 10px;
        }
        blockquote::before {
          font-family: Georgia, serif;
          font-size: 60px;
          font-weight: bold;
          color: #c70000;
          position: absolute;
          content: "“";
          left: 5px;
          top: 5px;
        }
        blockquote :global(a.source) {
          display: block;
          max-width: 80%;
          margin: 0 0 0 auto;
          text-align: right;
          width: fit-content;
        }
        @media screen and (min-width: 0px) and (max-width: 500px) {
          blockquote {
            margin-left: 15px;
            margin-right: 15px;
          }
        }
      `}</style>
    </blockquote>
  );
}

export function Dialog({ children, ...attr }: Text): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <dialog {...attr}>
      {children}
      <style jsx>{`
        dialog {
          border-color: ${colors.primary};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          background: ${darkMode ? colors.dark_background : colors.background};
        }
      `}</style>
      <style jsx>{`
        dialog {
          margin: 0 auto;
          padding: 10px;
        }
      `}</style>
    </dialog>
  );
}

export function Hr(props: Record<string, string | number>): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <>
      <hr {...props} />
      <style jsx>{`
        hr {
          border: 1px solid ${darkMode ? "#45535d" : "#e1e8ed"};
          border-bottom: 0px;
          border-left: 0px;
          border-right: 0px;
          margin: 0.5em 0;
        }
      `}</style>
    </>
  );
}

export function Kbd({ children, ...attribs }: Text): ReactElement {
  return (
    <kbd {...attribs}>
      {children}
      <style jsx>{`
        kbd {
          background-color: #eee;
          border: 1px solid #b4b4b4;
          border-radius: 3px;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
            0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
          color: #333;
          display: inline-block;
          font-family: monospace;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          padding: 2px 4px;
          white-space: nowrap;
        }
      `}</style>
    </kbd>
  );
}

interface PTypes {
  children: ReactNode;
  [x: string]: string | number | ReactNode;
}
export function P({
  children,
  ...attribs
}: PropsWithChildren<PTypes>): ReactElement {
  return (
    <p {...attribs}>
      {children}
      <style jsx>{`
        p {
          -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
          break-inside: avoid; /* IE 10+ */
          line-height: 25.6px;
          margin: 1em 0;
          page-break-inside: avoid; /* Firefox */
        }
      `}</style>
    </p>
  );
}

interface CaptionProps {
  children: ReactNode;
}
export function Caption({ children }: CaptionProps): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <p role="note">
      <em>{children}</em>
      <style jsx>
        {`
          p {
            font-size: 0.8em;
            margin: 0;
            margin-top: 0.5em;
            color: ${darkMode ? colors.dark_textColor : colors.textColor};
            text-align: center;
          }
        `}
      </style>
    </p>
  );
}

interface NoteTypes {
  type: "success" | "info" | "danger" | "tip" | "important" | string;
  title?: string;
  isInline: boolean;
}
export function Note({
  children,
  type = "info",
  isInline,
  title,
}: PropsWithChildren<NoteTypes>): ReactElement {
  const { darkMode } = useDarkMode();

  const style = type ? noteStyles[`${type}`] : noteStyles.normal;

  const noteTitles: Record<string, string | ReactElement> = {
    info: (
      <>
        <Info className="note-icon" width={24} height={24} fill="#3448c5" />
        {title || "Nota"}
      </>
    ),
    danger: (
      <>
        <Alert className="note-icon" width={24} height={24} fill="#ff5050" />
        {title || "Precaución"}
      </>
    ),
    success: (
      <>
        <Check className="note-icon" width={24} height={24} fill="#4caf50" />
        {title || "Pasos"}
      </>
    ),
    important: (
      <>
        <Star className="note-icon" width={24} height={24} fill="#EFCE4A" />
        {title || "Importante"}
      </>
    ),
    tip: (
      <>
        <Bulb className="note-icon" width={24} height={24} />
        {title || "Tip"}
      </>
    ),
  };

  return (
    <>
      <div role="note" className={type}>
        <div>
          <p>
            <strong>{noteTitles[type]}:</strong> {isInline ? children : null}
          </p>
          {!isInline ? <>{children}</> : null}
        </div>
        <style jsx>{`
          div[role="note"] {
            padding: 12px;
            border-radius: 3px 7px 7px 3px;
            width: 100%;
            margin: 16px 0;
            color: inherit;
            background: ${darkMode ? colors.dark_accents4 : colors.accents4};
          }
          div[role="note"] :global(svg.note-icon) {
            display: inline-block;
            vertical-align: sub;
            margin-right: 7px;
          }
          div[role="note"] :global(p code),
          div[role="note"] :global(li code) {
            color: ${darkMode ? codeColors.dark_purple : codeColors.purple};
          }
          div[role="note"] :global(li::marker) {
            font-weight: bold;
          }
          p {
            margin: 0;
          }
        `}</style>
      </div>
      {style && (
        <style global jsx>
          {style}
        </style>
      )}
    </>
  );
}
