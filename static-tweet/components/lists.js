import { tweets } from "../../styles/theme";

export const Ul = (p) => (
  <>
    <ul {...p} />
    <style jsx>{`
      ul {
        margin: ${tweets.textMargin};
        list-style-type: none;
        padding-left: 1rem;
      }
      ul :global(li:before) {
        content: "-";
        color: ${tweets.accents3};
        position: absolute;
        margin-left: -1rem;
      }
    `}</style>
  </>
);

export const Ol = (p) => (
  <>
    <ol {...p} />
    <style jsx>{`
      ol {
        margin: ${tweets.textMargin};
        padding-left: 1rem;
      }
    `}</style>
  </>
);

export const Li = (p) => (
  <>
    <li {...p} />
    <style jsx>{`
      li {
        padding-left: 0;
        margin: ${tweets.liMargin};
      }
    `}</style>
  </>
);
