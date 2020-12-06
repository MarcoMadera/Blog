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
        div.tweet {
          color: ${tweets.tweetFontColor};
          overflow: hidden;
          background: ${tweets.tweetBgColor};
          border: ${tweets.tweetBorder};
          border-radius: 15px;
          margin: ${tweets.containerMargin};
        }
        @media (any-hover: hover) {
          div.tweet:hover {
            border: ${tweets.tweetBorderHover};
          }
        }
        div.tweet > div {
          position: relative;
          padding: 10px 15px 5px 15px;
        }
        div.tweet :global(.icon) {
          display: inline-block;
          height: 20px;
          vertical-align: text-bottom;
          background-size: contain;
          background-repeat: no-repeat;
        }
        div.tweet div :global(p) {
          text-align: left;
          line-height: 1.5125;
          margin: 0px;
          padding: 0px;
          font-size: 17px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}
