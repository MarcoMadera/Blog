import { A } from "components/tags";
import Tweet from "components/Tweet";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import { IMentions } from "types/mentions";
import { getFormattedDate } from "utils";
import { getDefaultTweetDataFromMention } from "utils/getDefaultTweetDataFromMention";

export function WebMention({
  mentions,
}: {
  mentions: IMentions;
}): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <ul>
      {mentions.children.map((mention) => {
        const source = mention.url || mention["wm-source"];
        const isTweet = source.includes("twitter.com");
        const isLike = mention["wm-property"] === "like-of";
        const isRepost = mention["wm-property"] === "repost-of";
        const isReply = mention["wm-property"] === "in-reply-to";
        const isMention = mention["wm-property"] === "mention-of";

        if (isTweet && (isMention || isReply)) {
          return (
            <li key={mention["wm-id"]}>
              <Tweet
                id={source.split("/").pop() || ""}
                hideConversation={true}
                mockData={getDefaultTweetDataFromMention(mention)}
              />
              <style jsx>{`
                li {
                  list-style: none;
                }
                li :global(.tweet) {
                  background-color: ${darkMode ? "#1f2937" : "#fefefe"};
                }
              `}</style>
            </li>
          );
        }

        if (isLike || isRepost || isReply || isMention) {
          return (
            <li key={mention["wm-id"]}>
              <article>
                <header>
                  <A href={mention.author.url}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mention.author.photo} alt={mention.author.name} />
                  </A>{" "}
                  <span>
                    <A
                      href={mention.author.url || mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {mention.author.name}
                    </A>{" "}
                    <A
                      href={mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {isRepost && "reposteó"}
                      {isLike && "le dio like a"}
                      {isReply && "repondió"}
                      {isMention && "mencionó"}
                    </A>{" "}
                    este post el{" "}
                    {getFormattedDate(
                      new Date(mention.published || mention["wm-received"])
                    )}
                  </span>
                </header>
                {(isReply || isMention) && (
                  <div className="reply">
                    <p>
                      <span>
                        {mention.content?.text.slice(0, 300)}
                        {(mention.content?.html?.length || 0) > 300
                          ? "..."
                          : null}
                      </span>
                    </p>
                  </div>
                )}
              </article>
              <style jsx>{`
                article {
                  background-color: ${darkMode ? "#1f2937" : "#fefefe"};
                  border: 1px solid ${darkMode ? "#374151" : "#e1e8ed"};
                }
                li :global(a) {
                  color: ${darkMode ? "#fff" : "#535a60"};
                  text-decoration: none;
                }
              `}</style>
              <style jsx>{`
                li {
                  list-style: none;
                }
                article {
                  position: relative;
                  max-width: 550px;
                  border-width: 1px;
                  -webkit-border-radius: 15px;
                  -moz-border-radius: 15px;
                  border-radius: 15px;
                  margin: 2rem auto;
                  display: flex;
                  justify-content: center;
                  padding: 1rem;
                  border-radius: 0.5rem;
                  flex-direction: column;
                }
                img {
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  margin-right: 8px;
                }
                header {
                  display: flex;
                  align-items: center;
                }

                span {
                  font-size: 14px;
                }
                li :global(a) {
                  text-decoration: none;
                }

                li :global(a:hover) {
                  text-decoration: underline;
                }
              `}</style>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}
