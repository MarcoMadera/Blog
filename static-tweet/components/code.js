import { tweets } from "../../styles/theme";

export const Code = (p) => (
  <>
    <code {...p} />
    <style jsx>{`
      code {
        font-size: 14px;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
      }
      code.inline {
        color: ${tweets.inlineCodeColor};
        font-size: 1rem;
        white-space: pre-wrap;
      }
    `}</style>
  </>
);

export const Pre = (p) => (
  <>
    <pre {...p} />
    <style jsx>{`
      pre {
        color: ${tweets.codeColor};
        background: ${tweets.codeBgColor};
        padding: 1.25rem;
        margin: ${tweets.containerMargin};
        white-space: pre;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    `}</style>
  </>
);
