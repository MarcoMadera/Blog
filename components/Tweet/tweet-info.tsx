import { formatNumber } from "utils";
import { tweets } from "styles/theme";
import type { User, Tweet } from "types/tweet";
import { ReactElement } from "react";
import TweetCreatedAt from "./TweetCreatedAt";
import { A } from "components/tags";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";

interface TweetInfoProps {
  username: User["username"];
  tweetId: Tweet["id"];
  metrics: Tweet["public_metrics"];
  created_at: Tweet["created_at"];
  source: Tweet["source"];
}

export default function TweetInfo({
  username,
  tweetId,
  metrics,
  created_at,
  source,
}: TweetInfoProps): ReactElement {
  const { trackWithGoogleAnalytics } = useAnalytics();
  const likeUrl = `https://twitter.com/intent/like?tweet_id=${tweetId}`;
  const retweetUrl = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;
  const tweetUrl = `https://twitter.com/${username}/status/${tweetId}`;

  return (
    <div className="info">
      <A
        className="like"
        href={likeUrl}
        title="Me gusta"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${metrics.like_count} me gusta, Dar me gusta en twitter`}
        onClick={() => {
          trackWithGoogleAnalytics(HitType.SOCIAL, {
            socialAction: "like",
            socialNetwork: "twitter",
            socialTarget: tweetUrl,
          });
        }}
      >
        <div className="heart">
          <div className="icon icon-heart" role="img" aria-hidden="true" />
        </div>
        {metrics.like_count > 0 && (
          <span className="likes" aria-hidden="true">
            {formatNumber(metrics.like_count)}
          </span>
        )}
      </A>
      <A
        className="retweet"
        href={retweetUrl}
        title="Retweet"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${metrics.retweet_count} retweets, Hacer retweet en twitter`}
        onClick={() => {
          trackWithGoogleAnalytics(HitType.SOCIAL, {
            socialAction: "retweet",
            socialNetwork: "twitter",
            socialTarget: tweetUrl,
          });
        }}
      >
        <div>
          <div className="icon icon-retweet" role="img" aria-hidden="true" />
        </div>
        {metrics.retweet_count > 0 && (
          <span className="retweets" aria-hidden="true">
            {formatNumber(metrics.retweet_count)}
          </span>
        )}
      </A>
      <A
        className="time"
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        hideToolTip
      >
        <TweetCreatedAt created_at={created_at} />
      </A>
      {source ? (
        <>
          <span>&nbsp;·&nbsp;</span>
          <A
            href={
              "https://help.twitter.com/es/using-twitter/how-to-tweet#source-labels"
            }
            className="time"
            target="_blank"
            rel="noopener noreferrer"
            hideToolTip
          >
            {source}
          </A>
        </>
      ) : null}
      <style jsx>{`
        .info {
          font-size: 0.875rem;
          display: flex;
          flex-wrap: wrap;
          margin: 10px 0 3px 0;
          color: ${tweets.tweetColorGray};
        }
        .info :global(.like),
        .info :global(.retweet) {
          display: flex;
          color: ${tweets.tweetColorGray};
          margin-right: 0.75rem;
        }
        .info :global(.like:visited),
        .info :global(.retweet:visited) {
          color: ${tweets.tweetLinkColor};
        }
        @media (any-hover: hover) {
          .info :global(.like:hover),
          .info :global(.like:focus) {
            color: ${tweets.tweetColorRed};
          }
          .info :global(.like:hover) .icon-heart,
          .info :global(.like:focus) .icon-heart {
            background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23E0245E%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E);
          }
          .info :global(.retweet:hover),
          .info :global(.retweet:focus) {
            color: ${tweets.tweetColorGreen};
          }
          .info :global(.retweet:hover) .icon-retweet,
          .info :global(.retweet:focus) .icon-retweet {
            background-image: url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%201000%201000%27%3E%3Cdefs/%3E%3Cpath%20fill=%27%23169B56%27%20d=%27M232.9%20827.2l92.8%2092.8c16%2016%2016%2042%200%2058s-42%2016-58%200L104.1%20814.2c-16-16-16-42%200-58l163.6-163.4c16-16%2042-16%2058%200s16%2042%200%2058l-94.4%2094.4h547.1c22.7%200%2041-18.3%2041-41V541.6c0-22.7%2018.3-41%2041-41s41%2018.3%2041%2041v203.6c0%2045.2-36.7%2081.9-81.9%2081.9H232.9zM767.1%20172.8L674.3%2080c-16-16-16-42%200-58s42-16%2058%200l163.6%20163.6c16%2016%2016%2042%200%2058L732.3%20407.2c-16%2016-42%2016-58%200s-16-42%200-58l94.4-94.4H215c-22.7%200-41%2018.3-41%2041v162.6c0%2022.7-18.3%2041-41%2041s-41-18.3-41-41V254.8c0-45.2%2036.7-82%2081.9-82h593.2z%27/%3E%3C/svg%3E");
          }
        }
        .icon-heart {
          width: 1.25em;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23697882%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E);
        }
        .icon-retweet {
          width: 1.2em;
          background-image: url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%201000%201000%27%3E%3Cdefs/%3E%3Cpath%20fill=%27%23697882%27%20d=%27M232.9%20827.2l92.8%2092.8c16%2016%2016%2042%200%2058s-42%2016-58%200L104.1%20814.2c-16-16-16-42%200-58l163.6-163.4c16-16%2042-16%2058%200s16%2042%200%2058l-94.4%2094.4h547.1c22.7%200%2041-18.3%2041-41V541.6c0-22.7%2018.3-41%2041-41s41%2018.3%2041%2041v203.6c0%2045.2-36.7%2081.9-81.9%2081.9H232.9zM767.1%20172.8L674.3%2080c-16-16-16-42%200-58s42-16%2058%200l163.6%20163.6c16%2016%2016%2042%200%2058L732.3%20407.2c-16%2016-42%2016-58%200s-16-42%200-58l94.4-94.4H215c-22.7%200-41%2018.3-41%2041v162.6c0%2022.7-18.3%2041-41%2041s-41-18.3-41-41V254.8c0-45.2%2036.7-82%2081.9-82h593.2z%27/%3E%3C/svg%3E");
        }
        .likes,
        .retweets {
          margin-left: 0.25rem;
        }
        .info :global(.time) {
          color: ${tweets.tweetColorGray};
        }
        @media (any-hover: hover) {
          .info :global(.time:hover),
          .info :global(.time:focus) {
            color: ${tweets.tweetLinkColorHover};
            text-decoration: none;
          }
          .info :global(.time:focus) {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  );
}
