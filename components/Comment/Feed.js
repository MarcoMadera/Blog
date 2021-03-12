import useComments from "../../hooks/useComments";
import CommentFeed from "./CommentFeed";

export default function Feed() {
  const { allComments } = useComments();

  return (
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
  );
}
