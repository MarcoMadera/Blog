import TweetHeader from "./tweet-header";
import TweetInfo from "./tweet-info";
import TweetAction from "./tweet-action";
import { tweets } from "../../../styles/theme";

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
          color: ${tweets.tweetFontColor};
          font: ${tweets.tweetFont};
          overflow: hidden;
          background: ${tweets.tweetBgColor};
          border: ${tweets.tweetBorder};
          border-radius: 5px;
          margin: ${tweets.containerMargin};
        }
        @media (any-hover: hover) {
          .tweet:hover {
            border: ${tweets.tweetBorderHover};
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
          height: 20px;
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
