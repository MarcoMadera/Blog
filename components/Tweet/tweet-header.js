import { tweets } from "../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";

export default function TweetHeader({
  name,
  username,
  profile_image_url,
  verified,
  tweetId,
}) {
  const { darkMode } = useDarkMode();
  const url = `https://twitter.com/${username}`;
  const tweetUrl = `https://twitter.com/${username}/status/${tweetId}`;
  return (
    <div className="header">
      <a
        href={url}
        className="avatar"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          width={48}
          height={48}
          src={profile_image_url}
          alt={name}
          title={name}
        />
      </a>
      <a
        href={url}
        className="author"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="name" title={name}>
          {name}{" "}
          {verified ? (
            <span className="verified" title="Cuenta verificada"></span>
          ) : null}
        </span>
        <span className="username" title={`@${username}`}>
          @{username}
        </span>
      </a>
      <a
        href={tweetUrl}
        className="brand"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="icon-twitter" title="Ver en Twitter" role="img" />
      </a>

      <style jsx>{`
        .header {
          display: flex;
          padding: 3px 3px 10px 3px;
          -webkit-box-orient: vertical;
          margin: 0px;
          overflow: hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: unset;
          -webkit-line-clamp: 1;
        }
        .header .name :global(.twemoji) {
          height: 16px;
          width: 16px;
        }
        .verified {
          background-image: ${darkMode
            ? `url(
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' height='20px' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z'/%3E%3C/svg%3E"
              )`
            : `url(
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231DA0F3' height='20px' viewBox='0 0 24 24'%3E%3Cdefs/%3E%3Cpath d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z'/%3E%3C/svg%3E"
              )`};
          width: 20px;
          margin-left: 3px;
          background-repeat: no-repeat;
        }
        .avatar {
          height: 48px;
          width: 48px;
          min-width: 48px;
          min-height: 48px;
          margin-right: 0.625rem;
        }
        .avatar > img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
          display: inherit;
        }
        .author {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          justify-content: center;
        }
        @media (any-hover: hover) {
          .author:hover {
            color: ${tweets.tweetLinkColorHover};
          }
        }
        .name,
        .username {
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .name {
          display: flex;
          min-height: 21px;
          font-weight: 700;
        }
        .username {
          color: ${tweets.tweetColorGray};
          font-size: 0.875rem;
        }
        .brand {
          margin-left: auto;
          height: fit-content;
        }
        .icon-twitter {
          width: 25px;
          height: 25px;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%231da1f2%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
        }
      `}</style>
    </div>
  );
}

TweetHeader.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  profile_image_url: PropTypes.string,
  verified: PropTypes.bool,
  tweetId: PropTypes.string,
};
