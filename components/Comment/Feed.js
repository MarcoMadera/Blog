import useDarkMode from "../../hooks/useDarkMode";
import { colors } from "../../styles/theme";
import { siteMetadata } from "../../site.config";
import useComments from "../../hooks/useComments";
import CommentFeed from "./CommentFeed";

export default function Feed() {
  const darkMode = useDarkMode();
  const {
    timesLoadedComments,
    setTimesLoadedComments,
    allComments,
    commentCount,
  } = useComments();

  function loadMoreComments() {
    setTimesLoadedComments((val) => val + 1);
  }
  return (
    <>
      {allComments.length > 0 ? (
        <ul>
          {allComments.map(
            ({ commentId, avatar, username, comment, date, img, uid }) => (
              <CommentFeed
                key={commentId}
                commentId={commentId}
                avatar={avatar}
                username={username}
                comment={comment}
                date={date}
                img={img}
                uid={uid}
              />
            )
          )}
          <style jsx>{`
            ul {
              margin: 20px 0;
              display: flex;
              flex-direction: column;
              row-gap: 10px;
            }
          `}</style>
        </ul>
      ) : null}
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
