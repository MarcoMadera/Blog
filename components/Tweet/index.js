/* eslint-disable react/prop-types */
import useTweet from "../../hooks/useTweet";
import { colors, tweets } from "../../styles/theme";
import useDarkMode from "../../hooks/useDarkMode";
import TweetHeader from "./tweet-header";
import TweetInfo from "./tweet-info";
import TweetAction from "./tweet-action";
import { Poll } from "./Poll";
import { Media } from "./Media";
import { formatTweetText } from "./formatTweetText";
import QuotedTweet from "./QuotedTweet";

export default function Tweet({ id, caption }) {
  const { data } = useTweet(id);
  const user = Array.isArray(data?.user) ? data?.user[0] : null;
  const { darkMode } = useDarkMode();
  // Happens when `getStaticProps` is traversing the tree to collect the tweet ids
  if (!user) {
    return null;
  }
  const quotedTweetUrl = data.quotedTweet
    ? `https://twitter.com/${data?.quotedTweet?.user[0]?.username}/status/${data?.quotedTweet?.tweet?.id}`
    : undefined;

  return (
    <div className="container">
      {data && (
        <div className="tweet">
          <div>
            <TweetHeader
              name={user.name}
              username={user.username}
              verified={user.verified}
              profile_image_url={user.profile_image_url}
              tweetId={data.tweet.id}
            />
            <section>
              <p>
                {formatTweetText(
                  data.tweet.text,
                  data.tweet.entities,
                  quotedTweetUrl
                )}
              </p>
              {data.polls ? <Poll data={data.polls} /> : null}
              {data.media ? <Media data={data.media} /> : null}
              {data.quotedTweet ? (
                <QuotedTweet data={data.quotedTweet} />
              ) : null}
              <TweetInfo
                username={user.username}
                tweetId={data.tweet.id}
                metrics={data.tweet.public_metrics}
                created_at={data.tweet.created_at}
              />
            </section>
          </div>
          <TweetAction
            name={user.name}
            username={user.username}
            tweetId={data.tweet.id}
            metrics={data.tweet.public_metrics}
          />
        </div>
      )}
      {caption != null ? <p className="caption">{caption}</p> : null}
      <style jsx>{`
        div.container {
          max-width: 550px;
          border-width: 1px;
          border-radius: 15px;
          margin: 2rem auto;
        }
        section {
          padding: 0 3px;
        }
        div p.caption {
          font-size: 14px;
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }

        div.tweet {
          overflow: hidden;
          border: ${darkMode ? "1px solid #45535d" : tweets.tweetBorder};
          border-radius: 15px;
          margin: ${tweets.containerMargin};
        }
        @media (any-hover: hover) {
          div.tweet:hover {
            border: ${darkMode ? "1px solid #536673" : tweets.tweetBorderHover};
          }
        }
        div.tweet > div {
          position: relative;
          padding: 7px 12px 5px 12px;
        }
        div.tweet :global(.icon) {
          display: inline-block;
          height: 20px;
          vertical-align: text-bottom;
          background-size: contain;
          background-repeat: no-repeat;
        }
        div.tweet div p {
          text-align: left;
          line-height: 1.5125;
          margin: 0px;
          white-space: pre-wrap;
          padding: 0px;
          font-size: 17px;
          font-weight: 400;
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
      `}</style>
    </div>
  );
}
