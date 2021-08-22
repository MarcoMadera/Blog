import useTweet from "hooks/useTweet";
import { colors, tweets } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import TweetHeader from "./tweet-header";
import TweetInfo from "./tweet-info";
import TweetAction from "./tweet-action";
import { TweetPoll } from "./Poll";
import { TweetMedia } from "./Media";
import TweetText from "./TweetText";
import QuotedTweet from "./QuotedTweet";
import RepliedTweet from "./RepliedTweet";
import { ReactElement, ReactNode } from "react";

interface TweetProps {
  id: string;
  caption: string | ReactNode;
  hideConversation: boolean;
}

export default function Tweet({
  id,
  caption,
  hideConversation,
}: TweetProps): ReactElement | null {
  const { data, ignore } = useTweet(id, hideConversation);
  const user = Array.isArray(data?.user) ? data?.user[0] : null;

  const { darkMode } = useDarkMode();

  // Happens when `getStaticProps` is traversing the tree to collect the tweet ids
  if (!user || ignore) {
    return null;
  }

  const quotedTweetUser = Array.isArray(data?.quotedTweet?.user)
    ? data?.quotedTweet?.user[0]
    : null;
  const repliedTweetUser = Array.isArray(data?.repliedTweet?.user)
    ? data?.repliedTweet?.user[0]
    : null;

  const quotedTweetUrl = quotedTweetUser
    ? `https://twitter.com/${quotedTweetUser.username}/status/${data?.quotedTweet?.tweet?.id}`
    : undefined;
  const repliedTweetUrl = repliedTweetUser
    ? `https://twitter.com/${repliedTweetUser.username}/status/${data?.tweet?.id}`
    : undefined;
  const currentTweetUrl = `https://twitter.com/${user.username}/status/${data?.tweet.id}`;

  return (
    <div className="container">
      {data && (
        <div className="tweet">
          <a
            href={repliedTweetUrl || currentTweetUrl}
            className="brand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver en Twitter"
          >
            <div className="icon-twitter" title="Ver en Twitter" role="img" />
          </a>
          {data.repliedTweet ? <RepliedTweet data={data.repliedTweet} /> : null}
          <div>
            <TweetHeader
              name={user.name}
              username={user.username}
              userId={user.id}
              verified={user.verified}
              profile_image_url={user.profile_image_url}
            />
            <section>
              <TweetText
                text={data.tweet.text}
                entities={data.tweet.entities}
                quotedTweetUrl={quotedTweetUrl}
                original={true}
              />
              {data.poll ? <TweetPoll poll={data.poll} /> : null}
              {data.media ? <TweetMedia data={data.media} /> : null}
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
        .brand {
          position: absolute;
          z-index: 10;
          left: calc(100% - 41px);
          top: 11px;
          margin-left: auto;
          height: fit-content;
        }
        .icon-twitter {
          width: 25px;
          height: 25px;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%231da1f2%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
        }
        div.container {
          position: relative;
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
          padding: ${data?.repliedTweet
            ? "0px 12px 5px 12px"
            : "7px 12px 5px 12px"};
          margin-top: ${data?.repliedTweet ? "-3px" : "0px"};
        }
        div.tweet :global(.icon) {
          display: inline-block;
          height: 18px;
          vertical-align: text-bottom;
          background-size: contain;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}
