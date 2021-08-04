import useComments from "hooks/useComments";
import { ReactElement } from "react";
import CommentFeed from "./CommentFeed";

export default function Feed(): ReactElement {
  const { allComments } = useComments();

  return (
    <ul>
      {allComments &&
        allComments.map(
          ({ commentId, avatar, username, comment, date, img, uid }) => (
            <li key={commentId}>
              <CommentFeed
                commentId={commentId}
                avatar={avatar}
                username={username}
                comment={comment}
                date={date}
                img={img}
                uid={uid}
              />
            </li>
          )
        )}
      <style jsx>{`
        ul {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
        }
        li {
          list-style: none;
          margin-bottom: 10px;
        }
      `}</style>
    </ul>
  );
}
