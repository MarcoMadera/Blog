import MarkDown from "../../Markdown";
import { instructions, renderers } from "../../Markdown/instructions/comments";
import { Markdown as MarkDownIcon } from "../icons";
import { A, Img } from "../../tags";
import useComments from "../../../hooks/useComments";
import SendCommentButton from "./SendCommentButton";
import PropTypes from "prop-types";

export default function Preview({ sendCommentRef }) {
  const { comment, imgURL } = useComments();
  return (
    <section>
      <div>
        <MarkDown
          source={comment}
          instructions={instructions}
          renderers={renderers}
          escapeHtml={true}
        />
        {imgURL ? <Img src={imgURL} /> : null}
      </div>
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
          margin-bottom: 5px;
        }
        div:nth-of-type(2) {
          display: flex;
          height: 32px;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        div:nth-of-type(2) :global(a) {
          display: inline-flex;
          font-size: 14px;
          align-items: center;
        }
        section :global(a svg) {
          margin-right: 5px;
        }
        section :global(h3) {
          font-size: 1.4em;
        }
        div:nth-of-type(1) {
          display: inline-block;
          width: 100%;
          border-radius: 4px;
          border: 1px solid #cccccc4d;
          padding: 5px 10px;
          margin: 2px 0;
          min-height: 94px;
        }
        div:nth-of-type(1) :global(p) {
          margin-top: 0;
        }
      `}</style>
    </section>
  );
}

Preview.propTypes = {
  sendCommentRef: PropTypes.object,
};
