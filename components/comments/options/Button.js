import PropTypes from "prop-types";

export default function Button({
  title,
  commentText,
  setCurrentCaret,
  setComment,
  children,
  tagName,
  attr,
  setInfo,
}) {
  function modifiedTextWithTag(e) {
    e.preventDefault();
    const comment = commentText.current.value;
    if (comment.trim().length > 500) {
      setInfo("El comentario tiene que ser más corto");
      return;
    }
    const currentPos = commentText.current.selectionStart;
    const lastPos = commentText.current.selectionEnd;
    const textbetweenTag = commentText.current.value.substring(
      currentPos,
      lastPos
    );
    const commentBefore = commentText.current.value.slice(0, currentPos);
    const commentAfter = commentText.current.value.slice(
      lastPos,
      commentText.current.value.lenght
    );
    const caretStart =
      textbetweenTag && !attr
        ? commentBefore.length + textbetweenTag.length + tagName.length * 2 + 5
        : commentBefore.length +
          tagName.length +
          2 +
          (attr ? attr.length + 1 : 0);
    // 19 is the length of https://ejemplo.com
    const caretEnd = !attr ? caretStart : caretStart + 19;
    setCurrentCaret({ start: caretStart, end: caretEnd });
    const newText =
      commentBefore +
      `<${tagName}${attr ? ` ${attr}=https://ejemplo.com` : ""}>` +
      (textbetweenTag || (attr ? "texto a mostrar" : "")) +
      `</${tagName}>` +
      commentAfter;
    setComment(newText);
    commentText.current.focus();
  }
  return (
    <button onClick={(e) => modifiedTextWithTag(e)} title={title}>
      {children}
      <style jsx>{`
        button {
          display: inline-flex;
          border: 0;
          background: transparent;
          color: inherit;
          position: relative;
          border-radius: 3px;
          padding: 3px;
          border: 1px solid #cccccc4d;
          cursor: pointer;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          font-style: ${tagName === "i" ? "italic" : "unset"};
          font-weight: ${tagName === "strong" ? "bold" : "unset"};
          text-decoration: ${tagName === "u"
            ? "underline"
            : tagName === "del"
            ? "line-through"
            : "unset"};
        }
        button:focus,
        button:hover {
          border: 1px solid #cccccca1;
        }
      `}</style>
    </button>
  );
}
Button.propTypes = {
  title: PropTypes.string,
  tagName: PropTypes.string,
  attr: PropTypes.string,
  commentText: PropTypes.object,
  setCurrentCaret: PropTypes.func,
  setComment: PropTypes.func,
  setInfo: PropTypes.func,
  children: PropTypes.node,
};
