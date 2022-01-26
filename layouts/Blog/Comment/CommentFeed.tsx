import useComments from "hooks/useComments";
import useUser from "hooks/useUser";
import Markdown from "components/Markdown/index";
import { Img } from "components/tags";
import EmojisWrapper from "components/EmojisWrapper";
import type { Comment } from "types/comments";
import { MouseEvent, ReactElement } from "react";

export default function CommentFeed({
  commentId,
  avatar,
  username,
  comment,
  date,
  img,
  uid,
}: Comment): ReactElement {
  const { user } = useUser();
  const { removeComment } = useComments();

  function handleRemove(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    commentId: Comment["commentId"]
  ) {
    e.preventDefault();
    removeComment(commentId || "");
  }

  return (
    <EmojisWrapper>
      <article>
        <header>
          <b>{username}</b>
          <i>
            {new Date(date ?? Date()).toLocaleDateString("es-MX", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </i>
          {user?.uid === uid && commentId ? (
            <button onClick={(e) => handleRemove(e, commentId)}>
              Eliminar comentario
            </button>
          ) : null}
        </header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} alt={username} title={username} />
        <div>
          {comment ? (
            <Markdown
              source={comment}
              type={`comment-${commentId ?? user?.uid ?? "anon"}`}
            />
          ) : (
            <p>Aquí se mostrará tu comentario... cuando lo escribas</p>
          )}
          {img && <Img src={img} alt="" />}
        </div>
        <style jsx>{`
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
            align-items: baseline;
            margin-left: 10px;
          }
          header > * {
            margin-right: 10px;
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
            padding: 10px 6px;
          }
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
        `}</style>
      </article>
    </EmojisWrapper>
  );
}
