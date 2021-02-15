import MarkDown from "../../Markdown";
import { instructions, renderers } from "../../Markdown/instructions/comments";
import PropTypes from "prop-types";
import { Markdown as MarkDownIcon } from "../icons";
import { A } from "../../tags";
export default function Preview({ comment }) {
  return (
    <section>
      <div>
        <MarkDown
          source={comment}
          instructions={instructions}
          renderers={renderers}
          escapeHtml={true}
        />
      </div>
      <A
        href="https://commonmark.org/help/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MarkDownIcon width={21} /> Aprende más sobre la sintaxis
      </A>
      <style jsx>{`
        div + :global(a) {
          display: inline-flex;
          font-size: 14px;
        }
        section :global(a svg) {
          margin-right: 5px;
        }
        div {
          display: inline-block;
          width: 100%;
          border-radius: 4px;
          border: 1px solid #cccccc4d;
          padding: 5px 10px;
          margin: 2px 0;
          min-height: 94px;
        }
        div :global(p) {
          margin-top: 0;
        }
      `}</style>
    </section>
  );
}

Preview.propTypes = {
  comment: PropTypes.string,
};
