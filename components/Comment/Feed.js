import { Img } from "../tags";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MarkDown from "../Markdown/index";
import { instructions, renderers } from "../Markdown/instructions/comments";
import { database } from "../../firebase/client";
import { updateCommentsList } from "./form/index";
import useNotification from "../../hooks/useNotification";
import useDarkMode from "../../hooks/useDarkMode";
import { colors } from "../../styles/theme";
import { siteMetadata } from "../../site.config";
export default function Feed({
  allComments,
  user,
  setInfo,
  slug,
  setAllComments,
  timesLoadedComments,
  setTimesLoadedComments,
}) {
  const { setShowNotification } = useNotification();
  const [commentCount, setCommentCount] = useState(0);
  const darkMode = useDarkMode();
  async function handleRemove(e, commentId) {
    e.preventDefault();
    setInfo("");
    database
      .ref(`post/${slug}/${commentId}`)
      .remove()
      .catch(() => {
        setInfo("Error al eliminar el comentario");
        setShowNotification(true);
      });
    updateCommentsList(
      slug,
      setAllComments,
      setInfo,
      setShowNotification,
      siteMetadata.commentsPerPost * timesLoadedComments
    );
    setInfo("");
  }
  useEffect(() => {
    database
      .ref(`post/${slug}`)
      .once("value")
      .then((snapshot) => {
        setCommentCount(snapshot.numChildren());
      });
  }, [slug, allComments]);
  function loadMoreComments() {
    setTimesLoadedComments((val) => val + 1);
    updateCommentsList(
      slug,
      setAllComments,
      setInfo,
      setShowNotification,
      siteMetadata.commentsPerPost * (timesLoadedComments + 1)
    );
  }
  return (
    <>
      {allComments.length ? (
        <ul>
          {allComments.map(
            ({ commentId, avatar, username, comment, date, img, uid }) => (
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
                    {user?.uid === uid && (
                      <button onClick={(e) => handleRemove(e, commentId)}>
                        Eliminar comentario
                      </button>
                    )}
                  </header>
                  <img src={avatar} alt={username} title={username} />
                  <div>
                    <MarkDown
                      source={comment}
                      instructions={instructions}
                      renderers={renderers}
                      escapeHtml={true}
                    />
                    {img && <Img src={img} alt="" />}
                  </div>
                </article>
              </li>
            )
          )}
          <style jsx>{`
            button {
              border: 0;
              background: transparent;
              color: inherit;
              cursor: pointer;
            }
            button:hover,
            button:focus {
              text-decoration: underline;
            }
            b {
              break-after: avoid;
            }
            ul {
              margin: 5px 0;
            }
            div {
              grid-area: comment;
              margin-left: 10px;
            }
            article :global(p) {
              margin-top: 0;
              word-break: break-word;
              white-space: pre-wrap;
            }
            article :global(h3) {
              font-size: 1.4em;
            }
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              display: inline;
              margin: 0 auto;
              grid-area: avatar;
            }
            i {
              font-size: 13px;
            }
            header {
              display: flex;
              flex-wrap: wrap;
              grid-area: username;
              column-gap: 10px;
              align-items: baseline;
              margin-left: 10px;
            }
            div :global(ul) {
              margin: 0;
            }
            li {
              list-style: none;
            }
            article {
              display: grid;
              grid-template-columns: 70px minmax(0, 1fr);
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
      {commentCount > siteMetadata.commentsPerPost * timesLoadedComments ? (
        <div>
          <button onClick={loadMoreComments}>Ver más comentarios</button>
          <style jsx>{`
            div {
              width: 100%;
            }
            button {
              display: block;
              border: 1px solid #cccccc4d;
              padding: 6px 8px;
              width: 100%;
              background: none;
              color: ${darkMode ? colors.dark_textColor : colors.textColor};
              cursor: pointer;
              border-radius: 4px;
            }
          `}</style>
        </div>
      ) : null}
    </>
  );
}
Feed.propTypes = {
  allComments: PropTypes.array,
  user: PropTypes.object,
  slug: PropTypes.string,
  setInfo: PropTypes.func,
  setAllComments: PropTypes.func,
  setTimesLoadedComments: PropTypes.func,
  timesLoadedComments: PropTypes.number,
};
