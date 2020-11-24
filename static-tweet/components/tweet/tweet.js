import TweetHeader from "./tweet-header";
import TweetInfo from "./tweet-info";
import TweetAction from "./tweet-action";

export default function Tweet({ children, data }) {
  return (
    <div className="tweet">
      <div>
        <TweetHeader tweet={data} />
        {children}
        <TweetInfo tweet={data} />
      </div>
      <TweetAction tweet={data} />
      <style jsx>{`
        .tweet {
          color: var(--tweet-font-color);
          font: var(--tweet-font);
          overflow: hidden;
          background: var(--tweet-bg-color);
          border: var(--tweet-border);
          border-radius: 5px;
          margin: var(--container-margin);
        }
        @media (any-hover: hover) {
          .tweet:hover {
            border: var(--tweet-border-hover);
          }
        }
        .tweet > div {
          position: relative;
          padding: 1.25rem 1.25rem 0.625rem 1.25rem;
        }
      `}</style>
      <style jsx global>{`
        .tweet :global(.icon) {
          display: inline-block;
          height: 1.25em;
          vertical-align: text-bottom;
          background-size: contain;
          background-repeat: no-repeat;
        }
        :global(.blog) .tweet :global(p) {
          text-align: left;
        }
      `}</style>
    </div>
  );
}
