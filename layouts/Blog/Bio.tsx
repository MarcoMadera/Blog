import { ReactElement } from "react";
import { colors } from "styles/theme";
import { PostWithMedia } from "types/posts";

export default function Bio({
  author,
  profilePhoto,
  summary,
  twitter,
}: Pick<
  PostWithMedia,
  "author" | "profilePhoto" | "summary" | "twitter"
>): ReactElement {
  return (
    <div>
      <span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profilePhoto} alt={author} width="40" height="40" />
        <a
          href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${twitter}&tw_p=followbutton`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Seguir
        </a>
      </span>
      <p>
        Escrito por{" "}
        <strong itemProp="author" translate="no">
          {author}
        </strong>{" "}
        {summary}{" "}
      </p>
      <style jsx>{`
        div {
          align-items: center;
          display: grid;
          grid-template-columns: auto 1fr;
          margin-top: 10px;
        }
        a {
          background-color: ${colors.twitter};
          border: none;
          border-radius: 0px 0px 10px 10px;
          box-sizing: border-box;
          color: ${colors.background} !important;
          cursor: pointer;
          display: none;
          font: normal normal normal 11px/18px "Helvetica Neue", Arial,
            sans-serif;
          font-weight: 600;
          height: 20px;
          margin-left: -2px;
          margin-top: 22px;
          padding: 1px 7px 1px 6px;
          outline: 0;
          overflow: hidden;
          position: absolute;
          text-align: left;
          transition: 0.3s ease;
          white-space: nowrap;
          width: 40px;
        }
        a:hover,
        a:focus {
          display: inline-block;
          margin-left: 0;
          margin-top: 20px;
          padding: 1px 5px 4px 4px;
          text-decoration: underline;
          width: 40px;
        }
        img {
          clip-path: inset(0% round 10px);
          height: 40px;
          transition: 0.3s ease;
          width: 40px;
        }
        img:hover {
          transform: scale(1.1);
        }
        p {
          margin: 0;
        }
        span {
          display: inline-flex;
          margin-right: 10px;
          position: relative;
          vertical-align: middle;
        }
        span:hover img + a,
        span:hover img:hover + a {
          animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
          display: inline-block;
        }
        span:hover img + a {
          width: 40px;
        }
        span:hover img:hover + a {
          width: 44px;
        }
        @keyframes scale-in-center {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
