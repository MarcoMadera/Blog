import useComments from "../../hooks/useComments";
import useUser from "../../hooks/useUser";
import Markdown from "../Markdown/index";
import { Img } from "../tags";
import { instructions, renderers } from "../Markdown/instructions/comments";
import Proptypes from "prop-types";

const CommentFeed = ({
  commentId,
  avatar,
  username,
  comment,
  date,
  img,
  uid,
}) => {
  const { user } = useUser();
  const { removeComment } = useComments();

  function handleRemove(e, commentId) {
    e.preventDefault();
    removeComment(commentId);
  }
  return (
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
      <img src={avatar} alt={username} title={username} />
      <div>
        <Markdown
          source={comment}
          instructions={instructions}
          renderers={renderers}
          escapeHtml={true}
        />
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
        div :global(ul) {
          margin: 0;
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
  );
};

export default CommentFeed;

CommentFeed.propTypes = {
  commentId: Proptypes.string,
  avatar: Proptypes.string,
  username: Proptypes.string,
  comment: Proptypes.string,
  date: Proptypes.number,
  img: Proptypes.string,
  uid: Proptypes.string,
};
