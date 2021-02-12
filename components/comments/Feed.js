import { Img } from "../tags";
import React from "react";
import PropTypes from "prop-types";
import MarkDown from "../Markdown";
import { instructions, renderers } from "../Markdown/instructions/comments";

export default function Feed({ allComments }) {
  return (
    <>
      {allComments.length > 0 ? (
        <ul>
          {allComments.map(({ avatar, username, comment, date, img }) => (
            <li key={username.concat(date)}>
              <article>
                <header>
                  <b>{username}</b>
                  <i>
                    {new Date(date).toLocaleDateString("es-MX", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </i>
                </header>
                <img src={avatar} alt={username} title={username} />
                <div>
                  <MarkDown
                    source={comment}
                    instructions={instructions}
                    renderers={renderers}
                  />
                  {img && <Img src={img} alt="" />}
                </div>
              </article>
            </li>
          ))}
          <style jsx>{`
            ul {
              margin: 5px 0;
            }
            div {
              grid-area: comment;
            }
            article :global(p) {
              margin-top: 0;
              word-break: break-word;
              white-space: pre-wrap;
            }
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              display: inline;
              margin: 0 auto;
              grid-area: avatar;
            }
            b {
              margin-right: 10px;
            }
            i {
              font-size: 13px;
            }
            header {
              display: flex;
              grid-area: username;
              align-items: baseline;
            }
            div :global(ul) {
              margin: 0;
            }
            li {
              list-style: none;
            }
            article {
              display: grid;
              grid-template-columns: 70px 1fr;
              grid-template-rows: auto 1fr;
              grid-template-areas: "avatar username" "avatar comment" "avatar .";
              justify-content: space-between;
              width: 100%;
              border: 1px solid #cccccc4d;
              border-radius: 10px;
              margin-bottom: 10px;
              padding: 10px 6px;
            }
          `}</style>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
Feed.propTypes = {
  allComments: PropTypes.array,
};
