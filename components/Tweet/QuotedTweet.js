import useDarkMode from "../../hooks/useDarkMode";
import { colors, tweets } from "../../styles/theme";
import { formatTweetText } from "./formatTweetText";
import { Media } from "./Media";
import { Poll } from "./Poll";
import { getQuotedTwitterFormattedDate } from "../../utils/helpers";
import PropTypes from "prop-types";
export default function QuotedTweet({ data }) {
  const { darkMode } = useDarkMode();
  return (
    <blockquote className="container">
      <div className="tweet">
        <div>
          <a
            href={`https://twitter.com/${data.user[0].username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="header"
          >
            <img
              title={data.user[0].name}
              src={data.user[0].profile_image_url}
              alt={data.user[0].name}
            />
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
                  dateTime={new Date(data.tweet.created_at).toISOString()}
                  title={`Publicado: ${new Date(
                    data.tweet.created_at
                  ).toLocaleDateString("es", {
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
        </div>
        {data.polls ? <Poll data={data.polls} /> : null}
        {data.media ? <Media data={data.media} quoted={true} /> : null}
      </div>
      <style jsx>{`
        blockquote.container {
          max-width: 550px;
          border-width: 1px;
          border-radius: 15px;
          margin: 1rem auto;
        }
        .tweet :global(.twemoji) {
          height: 14px;
          width: 14px;
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
          margin: 0 6px;
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
          div.tweet:hover {
            border: ${darkMode ? "1px solid #536673" : tweets.tweetBorderHover};
          }
        }
        a.header img {
          width: 19px;
          height: 19px;
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
          overflow: hidden;
          border: ${darkMode ? "1px solid #45535d" : tweets.tweetBorder};
          border-radius: 15px;
          margin: ${tweets.containerMargin};
        }
        div.tweet > div {
          position: relative;
          padding: 10px 15px 5px 15px;
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

QuotedTweet.propTypes = {
  data: PropTypes.object,
};
