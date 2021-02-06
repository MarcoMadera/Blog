import { Img, A } from "../tags";
import React from "react";
import HtmlToReactParser from "html-to-react";
import PropTypes from "prop-types";

export default function Feed({ allComments }) {
  function parseComment(comment) {
    const allowedTags = ["i", "del", "strong", "u", "p"];
    const isValidNode = ({ type }) => type !== "script";
    const processNodeDefinitions = new HtmlToReactParser.ProcessNodeDefinitions(
      React
    );
    const instructions = [
      {
        shouldProcessNode: function ({ type, name }) {
          return type === "tag" && name === "enlace";
        },
        processNode: function Anchor(node, children) {
          return node.attribs.a ? (
            <A
              target={node.attribs.a?.startsWith("#") ? "_self" : "_blank"}
              rel={
                node.attribs.a?.startsWith("#")
                  ? undefined
                  : "noopener noreferrer"
              }
              href={node.attribs.a}
            >
              {children}
            </A>
          ) : (
            children
          );
        },
      },
      {
        shouldProcessNode: function ({ type, name }) {
          return type === "tag" && !allowedTags.includes(name);
        },
        processNode: function Text(_, children) {
          return <>{children}</>;
        },
      },
      {
        // Anything else
        shouldProcessNode: function ({ type, name }) {
          if (allowedTags.includes(name)) {
            return true;
          }
          if (type === "tag" && !allowedTags.includes(name)) {
            return false;
          }
          return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];

    const parser = HtmlToReactParser.Parser;
    const htmlToReact = new parser();
    const ParsedComment = htmlToReact.parseWithInstructions(
      `<p>${comment}</p>`,
      isValidNode,
      instructions
    );
    return ParsedComment;
  }
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
                {parseComment(comment)}
                {img && <Img src={img} alt="" />}
              </article>
            </li>
          ))}
          <style jsx>{`
            ul {
              margin: 5px 0;
            }
            article :global(p) {
              margin: 0;
              grid-area: comment;
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
