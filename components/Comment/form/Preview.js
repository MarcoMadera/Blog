import { Markdown as MarkDownIcon } from "../icons";
import { A } from "../../tags";
import useComments from "../../../hooks/useComments";
import SendCommentButton from "./SendCommentButton";
import PropTypes from "prop-types";
import CommentFeed from "../CommentFeed";
import useUser from "../../../hooks/useUser";
import { siteMetadata } from "../../../site.config";

export default function Preview({ sendCommentRef }) {
  const { comment, imgURL } = useComments();
  const { user } = useUser();
  return (
    <section>
      <CommentFeed
        avatar={
          user?.avatar ??
          `${siteMetadata.siteUrl}/profile-placeholder_200x200.jpg`
        }
        username={user?.username ?? "Anónimo"}
        comment={comment}
        img={imgURL ? imgURL : null}
      />
      <div>
        <A
          href="https://commonmark.org/help/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MarkDownIcon width={21} /> Aprende más sobre la sintaxis
        </A>
        <SendCommentButton sendCommentRef={sendCommentRef} />
      </div>
      <style jsx>{`
        section {
          margin: 4px 0;
          row-gap: 3px;
          display: flex;
          flex-direction: column;
        }
        div {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }
        div :global(a) {
          display: inline-flex;
          font-size: 14px;
          height: max-content;
          align-items: center;
        }
        section :global(a svg) {
          margin-right: 5px;
        }
        section :global(h3) {
          font-size: 1.4em;
        }
      `}</style>
    </section>
  );
}

Preview.propTypes = {
  sendCommentRef: PropTypes.object,
};
