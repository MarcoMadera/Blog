import { tweets } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import twemoji from "twemoji";
import type { User } from "types/tweet";
import { ReactElement } from "react";
import { A } from "components/tags";
import useToolTip from "hooks/useToolTip";
import { useProcessHTML } from "hooks/useProcessHTML";

interface TweetHeaderProps {
  name: User["name"];
  username: User["username"];
  profile_image_url: User["profile_image_url"];
  verified: User["verified"];
  userId: User["id"];
}

export default function TweetHeader({
  name,
  username,
  profile_image_url,
  verified,
  userId,
}: Readonly<TweetHeaderProps>): ReactElement {
  const { darkMode } = useDarkMode();
  const { getToolTipAttributes } = useToolTip();
  const url = `https://twitter.com/${username}`;
  const parsedName = useProcessHTML(
    twemoji.parse(name, {
      className: "twemoji",
      base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
    })
  );

  return (
    <div className="header">
      <A
        href={url}
        className="avatar u-photo"
        target="_blank"
        title={`${name} (@${username})`}
        rel="noopener noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={48}
          height={48}
          src={profile_image_url}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://res.cloudinary.com/demo/image/twitter/w_48,h_48/${userId}.jpg`;
          }}
        />
      </A>
      <A
        href={url}
        className="author"
        target="_blank"
        rel="noopener noreferrer author"
        hideToolTip
      >
        <span className="name p-name">
          <span {...getToolTipAttributes(name)}>{parsedName} </span>
          {verified ? (
            <span
              className="verified"
              {...getToolTipAttributes("Cuenta verificada")}
            ></span>
          ) : null}
        </span>
        <span className="username" {...getToolTipAttributes(`@${username}`)}>
          @{username}
        </span>
      </A>
      <style jsx>{`
        .header :global(.twemoji) {
          height: 1.2em;
          vertical-align: top;
        }
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
        .header :global(.avatar) {
          height: 48px;
          width: 48px;
          min-width: 48px;
          min-height: 48px;
          margin-right: 0.625rem;
        }
        .header :global(.avatar > img) {
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
          display: inherit;
        }
        .header :global(.author) {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          justify-content: center;
        }
        @media (any-hover: hover) {
          .header :global(.author:hover) {
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
      `}</style>
    </div>
  );
}
