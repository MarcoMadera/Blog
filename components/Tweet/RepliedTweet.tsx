import { tweets } from "styles/theme";
import TweetText from "./TweetText";
import { TweetMedia } from "./Media";
import { TweetPoll } from "./Poll";
import { formatNumber } from "utils";
import QuotedTweet from "./QuotedTweet";
import type { TweetData } from "types/tweet";
import React, { ReactElement } from "react";
import TweetHeaderInfo from "./TweetHeaderInfo";
import { A } from "components/tags";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";
import SpaceTweet from "./SpaceTweet";
import TweetUrlPreview from "./TweetUrlPreview";

interface RepliedTweetProps {
  data: TweetData;
}

export default function RepliedTweet({
  data,
}: RepliedTweetProps): ReactElement | null {
  const { trackWithGoogleAnalytics } = useAnalytics();
  const replyUrl = `https://twitter.com/intent/tweet?in_reply_to=${data.tweet.id}`;
  const likeUrl = `https://twitter.com/intent/like?tweet_id=${data.tweet.id}`;
  const retweetUrl = `https://twitter.com/intent/retweet?tweet_id=${data.tweet.id}`;
  const user = data.user?.[0];

  if (!user) {
    return null;
  }

  const userprofile = `https://twitter.com/${user.username}`;
  const tweetUrl = `https://twitter.com/${user.username}/status/${data.tweet.id}`;

  return (
    <blockquote className="container">
      {data.repliedTweet ? <RepliedTweet data={data.repliedTweet} /> : null}
      <div className="tweet">
        <div>
          <A
            href={userprofile}
            className="referenced_avatar u-photo"
            target="_blank"
            rel="noopener noreferrer"
            title={user.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.profile_image_url}
              alt={user.name}
              width="48"
              height="48"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://res.cloudinary.com/demo/image/twitter/w_48,h_48/${user.id}.jpg`;
              }}
            />
          </A>
          <span className="line"></span>
        </div>
        <div className="repliedTweet">
          <A
            href={`https://twitter.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer author"
            className="header author"
            hideToolTip={true}
          >
            <TweetHeaderInfo created_at={data.tweet.created_at} user={user} />
          </A>
          <TweetText text={data.tweet.text} entities={data.tweet.entities} />
          {data.poll ? <TweetPoll poll={data.poll} /> : null}
          {data.media ? <TweetMedia data={data.media} quoted={true} /> : null}
          {data.quotedTweet ? <QuotedTweet data={data.quotedTweet} /> : null}
          {data.spaceTweet ? <SpaceTweet spaceTweet={data.spaceTweet} /> : null}
          {data.urlPreview ? (
            <TweetUrlPreview urlPreview={data.urlPreview} />
          ) : null}
          <div className="info">
            <A
              className="reply_count"
              href={replyUrl}
              title="Comentar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.tweet.public_metrics.reply_count} comentarios, Comentar en twitter`}
              onClick={() => {
                trackWithGoogleAnalytics(HitType.SOCIAL, {
                  socialAction: "reply",
                  socialNetwork: "twitter",
                  socialTarget: tweetUrl,
                });
              }}
            >
              <div className="reply">
                <div
                  className="icon icon-replied"
                  role="img"
                  aria-hidden="true"
                />
              </div>
              {data.tweet.public_metrics.reply_count > 0 && (
                <span className="likes" aria-hidden="true">
                  {formatNumber(data.tweet.public_metrics.reply_count)}
                </span>
              )}
            </A>
            <A
              className="like"
              href={likeUrl}
              title="Me gusta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.tweet.public_metrics.like_count} me gusta, Dar me gusta en twitter`}
              onClick={() => {
                trackWithGoogleAnalytics(HitType.SOCIAL, {
                  socialAction: "like",
                  socialNetwork: "twitter",
                  socialTarget: tweetUrl,
                });
              }}
            >
              <div className="heart">
                <div
                  className="icon icon-heart"
                  role="img"
                  aria-hidden="true"
                />
              </div>
              {data.tweet.public_metrics.like_count > 0 && (
                <span className="likes" aria-hidden="true">
                  {formatNumber(data.tweet.public_metrics.like_count)}
                </span>
              )}
            </A>
            <A
              className="retweet"
              href={retweetUrl}
              title="Retweet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.tweet.public_metrics.retweet_count} retweets, Hacer retweet en twitter`}
              onClick={() => {
                trackWithGoogleAnalytics(HitType.SOCIAL, {
                  socialAction: "retweet",
                  socialNetwork: "twitter",
                  socialTarget: tweetUrl,
                });
              }}
            >
              <div
                className="icon icon-retweet"
                role="img"
                aria-hidden="true"
              ></div>
              {data.tweet.public_metrics.retweet_count > 0 && (
                <span className="retweets" aria-hidden="true">
                  {formatNumber(data.tweet.public_metrics.retweet_count)}
                </span>
              )}
            </A>
            {data.tweet.source ? (
              <A
                href={
                  "https://help.twitter.com/es/using-twitter/how-to-tweet#source-labels"
                }
                className="source"
                target="_blank"
                rel="noopener noreferrer"
                hideToolTip
              >
                {data.tweet.source}
              </A>
            ) : null}
          </div>
        </div>
      </div>
      <style jsx>{`
        .tweet :global(.header),
        .info :global(a) {
          text-decoration: none;
        }
        .tweet :global(a.header) {
          display: flex;
          font-size: 14px;
          align-items: center;
          color: inherit;
          margin-bottom: 5px;
          width: fit-content;
        }
        .referenced_avatar {
          display: inline-flex;
        }
        .line {
          display: block;
          content: "";
          height: calc(100% - 46px);
          width: 2px;
          background-color: #cccccc4d;
          margin: auto;
          border-radius: 4px;
        }
        .info {
          font-size: 0.875rem;
          display: flex;
          flex-wrap: wrap;
          margin: 10px 0 3px 0;
        }
        .info :global(.source),
        .dot {
          color: ${tweets.tweetColorGray};
        }
        .info :global(.source:hover) {
          color: ${tweets.tweetLinkColorHover};
        }
        .info :global(.like),
        .info :global(.reply_count),
        .info :global(.retweet) {
          display: flex;
          color: ${tweets.tweetColorGray};
          margin-right: 0.55rem;
        }
        .info :global(.like:visited),
        .info :global(.reply_count:visited),
        .info :global(.retweet:visited) {
          color: ${tweets.tweetLinkColor};
        }
        .icon-heart {
          width: 1.15em;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23697882%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E");
        }
        .icon-retweet {
          width: 1.1em;
          background-image: url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%201000%201000%27%3E%3Cdefs/%3E%3Cpath%20fill=%27%23697882%27%20d=%27M232.9%20827.2l92.8%2092.8c16%2016%2016%2042%200%2058s-42%2016-58%200L104.1%20814.2c-16-16-16-42%200-58l163.6-163.4c16-16%2042-16%2058%200s16%2042%200%2058l-94.4%2094.4h547.1c22.7%200%2041-18.3%2041-41V541.6c0-22.7%2018.3-41%2041-41s41%2018.3%2041%2041v203.6c0%2045.2-36.7%2081.9-81.9%2081.9H232.9zM767.1%20172.8L674.3%2080c-16-16-16-42%200-58s42-16%2058%200l163.6%20163.6c16%2016%2016%2042%200%2058L732.3%20407.2c-16%2016-42%2016-58%200s-16-42%200-58l94.4-94.4H215c-22.7%200-41%2018.3-41%2041v162.6c0%2022.7-18.3%2041-41%2041s-41-18.3-41-41V254.8c0-45.2%2036.7-82%2081.9-82h593.2z%27/%3E%3C/svg%3E");
        }
        .icon-replied {
          width: 1.15em;
          background-image: url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20fill=%27%23697882%27%20d=%27M14.046%202.242l-4.148-.01h-.002c-4.374%200-7.8%203.427-7.8%207.802%200%204.098%203.186%207.206%207.465%207.37v3.828c0%20.108.045.286.12.403.143.225.385.347.633.347.138%200%20.277-.038.402-.118.264-.168%206.473-4.14%208.088-5.506%201.902-1.61%203.04-3.97%203.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787%2012.972c-1.134.96-4.862%203.405-6.772%204.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66%200-6.318-2.476-6.318-5.886%200-3.534%202.768-6.302%206.3-6.302l4.147.01h.002c3.532%200%206.3%202.766%206.302%206.296-.003%201.91-.942%203.844-2.514%205.176z%27%3E%3C/path%3E%3C/svg%3E");
        }
        @media (any-hover: hover) {
          .info :global(.like:hover),
          .info :global(.like:focus) {
            color: ${tweets.tweetColorRed};
          }
          .info :global(.like:hover .icon-heart),
          .info :global(.like:focus .icon-heart) {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23E0245E%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E");
          }
          .info :global(.retweet:hover),
          .info :global(.retweet:focus) {
            color: ${tweets.tweetColorGreen};
          }
          .info :global(.retweet:hover .icon-retweet),
          .info :global(.retweet:focus .icon-retweet) {
            background-image: url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%201000%201000%27%3E%3Cdefs/%3E%3Cpath%20fill=%27%23169B56%27%20d=%27M232.9%20827.2l92.8%2092.8c16%2016%2016%2042%200%2058s-42%2016-58%200L104.1%20814.2c-16-16-16-42%200-58l163.6-163.4c16-16%2042-16%2058%200s16%2042%200%2058l-94.4%2094.4h547.1c22.7%200%2041-18.3%2041-41V541.6c0-22.7%2018.3-41%2041-41s41%2018.3%2041%2041v203.6c0%2045.2-36.7%2081.9-81.9%2081.9H232.9zM767.1%20172.8L674.3%2080c-16-16-16-42%200-58s42-16%2058%200l163.6%20163.6c16%2016%2016%2042%200%2058L732.3%20407.2c-16%2016-42%2016-58%200s-16-42%200-58l94.4-94.4H215c-22.7%200-41%2018.3-41%2041v162.6c0%2022.7-18.3%2041-41%2041s-41-18.3-41-41V254.8c0-45.2%2036.7-82%2081.9-82h593.2z%27/%3E%3C/svg%3E");
          }
          .info :global(.reply_count:hover),
          .info :global(.reply_count:focus) {
            color: #1b95e0;
          }
          .info :global(.reply_count:hover .icon-replied),
          .info :global(.reply_count:focus .icon-replied) {
            background-image: url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20fill=%27%231B95E0%27%20d=%27M14.046%202.242l-4.148-.01h-.002c-4.374%200-7.8%203.427-7.8%207.802%200%204.098%203.186%207.206%207.465%207.37v3.828c0%20.108.045.286.12.403.143.225.385.347.633.347.138%200%20.277-.038.402-.118.264-.168%206.473-4.14%208.088-5.506%201.902-1.61%203.04-3.97%203.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787%2012.972c-1.134.96-4.862%203.405-6.772%204.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66%200-6.318-2.476-6.318-5.886%200-3.534%202.768-6.302%206.3-6.302l4.147.01h.002c3.532%200%206.3%202.766%206.302%206.296-.003%201.91-.942%203.844-2.514%205.176z%27%3E%3C/path%3E%3C/svg%3E");
          }
        }
        .likes,
        .retweets {
          margin-left: 0.25rem;
          line-height: 1.2;
        }
        blockquote.container {
          max-width: 550px;
          border-width: 1px;
          border-radius: 15px;
          margin: 1rem auto 0 auto;
        }
        .name {
          font-weight: 700;
        }
        @media (any-hover: hover) {
          .tweet :global(a.header:hover .name) {
            color: ${tweets.tweetLinkColorHover};
          }
        }
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
        div.tweet {
          margin: ${tweets.containerMargin};
          display: grid;
          grid-template-columns: 50px minmax(0, 1fr);
          grid-template-rows: auto 1fr;
          justify-content: space-between;
          width: 100%;
          padding: 0 15px;
          margin-bottom: 10px;
        }
        .repliedTweet {
          position: relative;
          padding: 0 10px;
        }
      `}</style>
    </blockquote>
  );
}
