import useDarkMode from "hooks/useDarkMode";
import { colors, tweets } from "styles/theme";
import { formatTweetText } from "./formatTweetText";
import { Media } from "./Media";
import { Poll } from "./Poll";
import { formatNumber, getQuotedTwitterFormattedDate } from "utils/helpers";
import PropTypes from "prop-types";
import useMounted from "hooks/useMounted";
import QuotedTweet from "./QuotedTweet";

export default function RepliedTweet({ data }) {
  const { darkMode } = useDarkMode();
  const mounted = useMounted();
  const replyUrl = `https://twitter.com/intent/tweet?in_reply_to=${data.tweet.id}`;
  const likeUrl = `https://twitter.com/intent/like?tweet_id=${data.tweet.id}`;
  const retweetUrl = `https://twitter.com/intent/retweet?tweet_id=${data.tweet.id}`;
  const userprofile = `https://twitter.com/${data.user[0].username}`;
  const createdAt =
    typeof window !== "undefined" && mounted
      ? new Date(data.tweet.created_at)
      : null;
  return (
    <blockquote className="container">
      {data.repliedTweet ? <RepliedTweet data={data.repliedTweet} /> : null}
      <div className="tweet">
        <div>
          <a
            href={userprofile}
            className="referenced_avatar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              title={data.user[0].name}
              src={data.user[0].profile_image_url}
              alt={data.user[0].name}
              width="48"
              height="48"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://res.cloudinary.com/demo/image/twitter/w_48,h_48/${data.user[0].id}.jpg`;
              }}
            />
          </a>

          <span className="line"></span>
        </div>
        <div className="repliedTweet">
          <a
            href={`https://twitter.com/${data.user[0].username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="header"
          >
            <div className="infoContainer">
              <span className="name" title={data.user[0].name}>
                {data.user[0].name}
              </span>
              {data.user[0].verified ? (
                <span title="Cuenta verificada" className="verified"></span>
              ) : null}
              <span className="username" title={`@${data.user[0].username}`}>
                @{data.user[0].username} &middot;{" "}
                <time
                  dateTime={createdAt?.toISOString()}
                  title={`Publicado: ${createdAt?.toLocaleDateString("es", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}`}
                >
                  {getQuotedTwitterFormattedDate(data.tweet.created_at)}
                </time>
              </span>
            </div>
          </a>
          <p>{formatTweetText(data.tweet.text, data.tweet.entities)}</p>
          {data.polls ? <Poll data={data.polls} /> : null}
          {data.media ? <Media data={data.media} quoted={true} /> : null}
          {data.quotedTweet ? <QuotedTweet data={data.quotedTweet} /> : null}
          <div className="info">
            <a
              className="reply_count"
              href={replyUrl}
              title="Comentar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.tweet.public_metrics.reply_count} comentarios, Comentar en twitter`}
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
            </a>
            <a
              className="like"
              href={likeUrl}
              title="Me gusta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.tweet.public_metrics.like_count} me gusta, Dar me gusta en twitter`}
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
            </a>
            <a
              className="retweet"
              href={retweetUrl}
              title="Retweet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.tweet.public_metrics.retweet_count} retweets, Hacer retweet en twitter`}
            >
              <div>
                <div
                  className="icon icon-retweet"
                  role="img"
                  aria-hidden="true"
                />
              </div>
              {data.tweet.public_metrics.retweet_count > 0 && (
                <span className="retweets" aria-hidden="true">
                  {formatNumber(data.tweet.public_metrics.retweet_count)}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        a {
          text-decoration: none;
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
        .like,
        .reply_count,
        .retweet {
          display: flex;
          color: ${tweets.tweetColorGray};
          margin-right: 0.75rem;
        }
        .reply_count:visited,
        .like:visited,
        .retweet:visited {
          color: ${tweets.tweetLinkColor};
        }
        @media (any-hover: hover) {
          .like:hover,
          .like:focus {
            color: ${tweets.tweetColorRed};
          }
          .like:hover .icon-heart,
          .like:focus .icon-heart {
            background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23E0245E%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E);
          }
          .retweet:hover,
          .retweet:focus {
            color: ${tweets.tweetColorGreen};
          }
          .retweet:hover .icon-retweet,
          .retweet:focus .icon-retweet {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cdefs/%3E%3Cpath fill='%23169B56' d='M232.9 827.2l92.8 92.8c16 16 16 42 0 58s-42 16-58 0L104.1 814.2c-16-16-16-42 0-58l163.6-163.4c16-16 42-16 58 0s16 42 0 58l-94.4 94.4h547.1c22.7 0 41-18.3 41-41V541.6c0-22.7 18.3-41 41-41s41 18.3 41 41v203.6c0 45.2-36.7 81.9-81.9 81.9H232.9zM767.1 172.8L674.3 80c-16-16-16-42 0-58s42-16 58 0l163.6 163.6c16 16 16 42 0 58L732.3 407.2c-16 16-42 16-58 0s-16-42 0-58l94.4-94.4H215c-22.7 0-41 18.3-41 41v162.6c0 22.7-18.3 41-41 41s-41-18.3-41-41V254.8c0-45.2 36.7-82 81.9-82h593.2z'/%3E%3C/svg%3E");
          }
          .reply_count:hover,
          .reply_count:focus {
            color: #1b95e0;
          }
          .reply_count:hover .icon-replied,
          .reply_count:focus .icon-replied {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%231B95E0' d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'%3E%3C/path%3E%3C/svg%3E");
          }
        }
        .icon-heart {
          width: 1.15em;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23697882%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E);
        }
        .icon-retweet {
          width: 1.1em;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cdefs/%3E%3Cpath fill='%23697882' d='M232.9 827.2l92.8 92.8c16 16 16 42 0 58s-42 16-58 0L104.1 814.2c-16-16-16-42 0-58l163.6-163.4c16-16 42-16 58 0s16 42 0 58l-94.4 94.4h547.1c22.7 0 41-18.3 41-41V541.6c0-22.7 18.3-41 41-41s41 18.3 41 41v203.6c0 45.2-36.7 81.9-81.9 81.9H232.9zM767.1 172.8L674.3 80c-16-16-16-42 0-58s42-16 58 0l163.6 163.6c16 16 16 42 0 58L732.3 407.2c-16 16-42 16-58 0s-16-42 0-58l94.4-94.4H215c-22.7 0-41 18.3-41 41v162.6c0 22.7-18.3 41-41 41s-41-18.3-41-41V254.8c0-45.2 36.7-82 81.9-82h593.2z'/%3E%3C/svg%3E");
        }
        .icon-replied {
          width: 1.15em;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23697882' d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'%3E%3C/path%3E%3C/svg%3E");
        }
        .likes,
        .retweets {
          margin-left: 0.25rem;
        }

        blockquote.container {
          max-width: 550px;
          border-width: 1px;
          border-radius: 15px;
          margin: 1rem auto 0 auto;
        }
        .infoContainer {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          margin: 0px;
          overflow: hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: unset;
          -webkit-line-clamp: 1;
        }
        .name {
          font-weight: 700;
        }
        a.header {
          display: flex;
          font-size: 14px;
          align-items: center;
          color: inherit;
          text-decoration: none;
          margin-bottom: 5px;
          width: fit-content;
        }
        @media (any-hover: hover) {
          a.header:hover .name {
            color: ${tweets.tweetLinkColorHover};
          }
        }
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
        .username {
          margin: 0 6px;
          color: ${tweets.tweetColorGray};
        }
        .verified {
          display: inline-flex;
          background-image: ${darkMode
            ? `url(
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' height='16px' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z'/%3E%3C/svg%3E"
              )`
            : `url(
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231DA0F3' height='16px' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z'/%3E%3C/svg%3E"
                )`};
          width: 16px;
          height: 19px;
          vertical-align: middle;
          background-repeat: no-repeat;
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
        div.tweet div p {
          text-align: left;
          line-height: 1.5125;
          margin: 0px;
          white-space: pre-wrap;
          padding: 0px;
          font-size: 14px;
          font-weight: 400;
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
      `}</style>
    </blockquote>
  );
}

RepliedTweet.propTypes = {
  data: PropTypes.object,
};
