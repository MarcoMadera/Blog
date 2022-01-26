import { ReactElement } from "react";
import type { SpaceData } from "types/tweet";
import { getQuotedTwitterFormattedDate } from "utils";
import EmojisWrapper from "components/EmojisWrapper";
import useToolTip from "hooks/useToolTip";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";

export default function SpaceTweet({
  spaceTweet,
}: {
  spaceTweet: SpaceData | undefined;
}): ReactElement {
  const { getToolTipAttrbutes } = useToolTip();
  const { trackWithGoogleAnalytics } = useAnalytics();
  if (!spaceTweet) {
    return <></>;
  }
  return (
    <div className="space-tweet">
      <div className="space-tweet__header">
        <div className="space-tweet__header-left">
          <div className="space-tweet__header-left-name">
            <EmojisWrapper>
              <span className="name">
                <span className="space-tweet__header-left-date">
                  {getQuotedTwitterFormattedDate(
                    spaceTweet.data.scheduled_start ?? spaceTweet.data.ended_at
                  )}
                </span>{" "}
                &middot; {spaceTweet.includes.users[0].name}{" "}
                <a
                  href={`https://twitter.com/${spaceTweet.includes.users[0].username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{spaceTweet.includes.users[0].username}
                </a>
              </span>
              <div className="space-tweet__body">
                <p className="title">{spaceTweet.data.title}</p>
                {spaceTweet.data.description && (
                  <p>{spaceTweet.data.description}</p>
                )}
              </div>
            </EmojisWrapper>
          </div>
        </div>
        <div className="space-tweet__header-right">
          {spaceTweet.includes.users.map((user, index) => {
            if (index === 4) {
              const moreParticipants = spaceTweet.includes.users.length - 3;
              return (
                <div
                  className="space-tweet__header-right-more"
                  key={index}
                  {...getToolTipAttrbutes(
                    `Más ${moreParticipants} participantes`
                  )}
                >
                  <span>+{moreParticipants}</span>
                </div>
              );
            }
            if (index > 2) return null;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={user.id}
                src={user.profile_image_url}
                alt={user.name}
                {...getToolTipAttrbutes(`${user.name} @${user.username}`)}
              />
            );
          })}
        </div>
      </div>
      <a
        className="spaceLink"
        href={`https://twitter.com/i/spaces/${spaceTweet.data.id}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackWithGoogleAnalytics(HitType.SOCIAL, {
            socialAction: "click space",
            socialNetwork: "twitter",
            socialTarget: `https://twitter.com/i/spaces/${spaceTweet.data.id}`,
          });
        }}
      >
        {spaceTweet.data.state === "ended"
          ? "Escucha la grabación en twitter"
          : spaceTweet.data.state === "started"
          ? "Unete a este espacio en twitter"
          : "Establece un recordatorio en twitter"}
      </a>
      <style jsx>{`
        span,
        p {
          color: #fff;
        }
        .space-tweet .twemoji {
          font-size: 1.2em;
        }
        .spaceLink {
          background-color: rgba(255, 255, 255, 0.3);
          transition-duration: 0.2s;
          transition-property: background-color, box-shadow;
          border-radius: 9999px;
          border: none;
          color: #fff;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          margin: 4px 2px;
          cursor: pointer;
        }
        .spaceLink:hover {
          background-color: rgba(26, 26, 26, 0.3);
        }
        .title {
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;
          margin-top: 0.5rem;
        }
        .space-tweet {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          border-radius: 0.5rem;
          background-image: linear-gradient(
            61.63deg,
            rgb(45, 66, 255) -15.05%,
            rgb(156, 99, 250) 104.96%
          );
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
          margin: 0.5rem 0;
        }
        .space-tweet__header {
          display: grid;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0 0 0.5rem 0;
          grid-template-columns: minmax(0, 1fr) 72px;
          grid-gap: 0.5rem;
          width: 100%;
          position: relative;
        }
        .space-tweet__header-left {
          overflow: hidden;
        }
        .space-tweet__header-left-date {
          font-weight: 700;
        }
        .space-tweet__header-left-name :global(.name) {
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .space-tweet__header-left-name a,
        .space-tweet__header-left-name :global(span) {
          color: #fff;
        }
        .space-tweet__header-right {
          overflow: hidden;
          width: 72px;
          height: 72px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .space-tweet__header-right img {
          border-radius: 50%;
          border: 1px solid #fff;
        }
        .space-tweet__header-right img:nth-of-type(1) {
          width: 3.1rem;
          height: 3.1rem;
          position: ${spaceTweet.includes.users.length > 1
            ? "absolute"
            : "static"};
          left: 0;
          top: 0;
          z-index: 1;
        }
        .space-tweet__header-right img:nth-of-type(2) {
          width: 2.1rem;
          height: 2.1rem;
          position: absolute;
          right: 0;
          bottom: 17px;
          z-index: 2;
        }
        .space-tweet__header-right img:nth-of-type(3) {
          width: 1.6rem;
          height: 1.6rem;
          position: absolute;
          bottom: 5px;
          z-index: 0;
        }
        .space-tweet__header-right-more {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 6px;
          right: 4px;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background-color: #fff;
          user-select: none;
          z-index: 0;
        }
        .space-tweet__header-right-more span {
          color: #000;
          font-size: 0.8rem;
          margin-top: -0.2rem;
        }
      `}</style>
    </div>
  );
}
