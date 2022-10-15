import useDarkMode from "hooks/useDarkMode";
import { tweets } from "styles/theme";
import { ReactElement } from "react";
import type { User } from "types/tweet";
import TweetCreatedAt from "./TweetCreatedAt";
import useToolTip from "hooks/useToolTip";

export default function TweetHeaderInfo({
  user,
  created_at,
}: {
  user: User;
  created_at: string;
}): ReactElement {
  const { darkMode } = useDarkMode();
  const { getToolTipAttributes } = useToolTip();

  return (
    <div className="infoContainer">
      <span className="name" {...getToolTipAttributes(user.name)}>
        {user.name}
      </span>
      {user.verified ? (
        <span
          className="verified"
          {...getToolTipAttributes("Cuenta verificada")}
        ></span>
      ) : null}
      <span className="username" {...getToolTipAttributes(`@${user.username}`)}>
        @{user.username} &middot;{" "}
      </span>
      <span className="username date">
        <TweetCreatedAt created_at={created_at} variant="short" />
      </span>
      <style jsx>{`
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
          margin-right: 6px;
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
          margin-right: 5px;
        }
        .username {
          color: ${tweets.tweetColorGray};
        }
        .date {
          margin-right: 6px;
        }
      `}</style>
    </div>
  );
}
