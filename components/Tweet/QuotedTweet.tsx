import useDarkMode from "hooks/useDarkMode";
import { tweets } from "styles/theme";
import TweetText from "./TweetText";
import { TweetMedia } from "./Media";
import { TweetPoll } from "./Poll";
import type { TweetData } from "types/tweet";
import { ReactElement } from "react";
import TweetHeaderInfo from "./TweetHeaderInfo";
import useToolTip from "hooks/useToolTip";
import SpaceTweet from "./SpaceTweet";
import TweetUrlPreview from "./TweetUrlPreview";

interface QuotedTweetProps {
  data: TweetData;
}

export default function QuotedTweet({
  data,
}: QuotedTweetProps): ReactElement | null {
  const { darkMode } = useDarkMode();
  const { getToolTipAttributes } = useToolTip();
  const user = data.user?.[0];

  if (!user) {
    return null;
  }
  const urlsToIgnore: string[] = [];
  if (data.urlPreview) {
    urlsToIgnore.push(data.urlPreview.expanded_url);
  }

  return (
    <blockquote className="container">
      <div className="tweet">
        <div>
          <a
            href={`https://twitter.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="header"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.profile_image_url}
              alt={user.name}
              {...getToolTipAttributes(user.name)}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://res.cloudinary.com/demo/image/twitter/w_19,h_19/${user.id}.jpg`;
              }}
            />
            <TweetHeaderInfo created_at={data.tweet.created_at} user={user} />
          </a>
          <TweetText
            text={data.tweet.text}
            entities={data.tweet.entities}
            urlsToIgnore={urlsToIgnore}
          />
        </div>
        {data.poll ? <TweetPoll poll={data.poll} /> : null}
        {data.media ? <TweetMedia data={data.media} quoted={true} /> : null}
        {data.spaceTweet ? <SpaceTweet spaceTweet={data.spaceTweet} /> : null}
        {data.urlPreview ? (
          <TweetUrlPreview urlPreview={data.urlPreview} />
        ) : null}
      </div>
      <style jsx>{`
        blockquote.container {
          max-width: 550px;
          border-width: 1px;
          border-radius: 15px;
          margin: 1rem auto;
        }
        .tweet :global(.url-preview-large a) {
          border-radius: 0 0 16px 16px;
          border: none;
        }
        .tweet :global(.url-preview-small a) {
          margin: 2px 15px 15px 15px;
        }
        a.header {
          display: flex;
          font-size: 15px;
          align-items: center;
          color: inherit;
          text-decoration: none;
          margin-bottom: 5px;
          width: fit-content;
        }
        @media (any-hover: hover) {
          a.header:hover :global(.name) {
            color: ${tweets.tweetLinkColorHover};
          }
          div.tweet:hover {
            border: ${darkMode ? "1px solid #536673" : tweets.tweetBorderHover};
          }
        }
        a.header img {
          width: 19px;
          height: 19px;
          border-radius: 50%;
          margin-right: 6px;
        }
        div.tweet {
          border: ${darkMode ? "1px solid #45535d" : tweets.tweetBorder};
          border-radius: 15px;
          margin: ${tweets.containerMargin};
        }
        div.tweet > div {
          position: relative;
          padding: 10px 15px 5px 15px;
        }
      `}</style>
    </blockquote>
  );
}
