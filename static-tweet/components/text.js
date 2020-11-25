import { tweets } from "../../styles/theme";

export const P = (p) => (
  <p>
    {p.children}
    <style jsx>{`
      p {
        margin: ${tweets.textMargin};
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `}</style>
  </p>
);

export const Blockquote = (p) => (
  <>
    <blockquote {...p} />
    <style jsx>{`
      blockquote {
        background: ${tweets.accents1};
        color: ${tweets.accents5};
        border: 1px solid ${tweets.accents2};
        margin: ${tweets.containerMargin};
        padding: 0 1.25rem;
      }
    `}</style>
  </>
);

export const Hr = (p) => (
  <>
    <hr {...p} />
    <style jsx>{`
      hr {
        border: 0;
        border-top: 1px solid ${tweets.accents2};
        margin: ${tweets.textMargin};
      }
    `}</style>
  </>
);
