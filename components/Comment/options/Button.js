/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

export default function Button({
  title,
  commentText,
  setCurrentCaret,
  setComment,
  children,
  type,
  setInfo,
  openMark,
  closeMark,
}) {
  function calculateCaretStart(initial, textbetweenTag) {
    if (openMark && !textbetweenTag) {
      return initial + openMark.length;
    }
    if (openMark && textbetweenTag) {
      return (
        initial + openMark.length + textbetweenTag.length + closeMark.length
      );
    }
    if (type === "anchor") {
      return initial + 1;
    }
    if (type === "blockCode") {
      return initial + 4;
    }
    if (type === "blockquote") {
      return initial + 3;
    }
    if (type === "anchorImage") {
      return initial + 2;
    }
    return initial;
  }
  function calculateCaretEnd(initial, textbetweenTag) {
    if (openMark) {
      return initial + openMark.length;
    }
    if (openMark && textbetweenTag) {
      return (
        initial + openMark.length + textbetweenTag.length + closeMark.length
      );
    }
    if (type === "blockquote") {
      return initial + 3;
    }
    if (type === "blockCode") {
      return initial + 12;
    }
    if (type === "anchor") {
      return initial + 20;
    }
    if (type === "anchorImage") {
      return initial + 32;
    }
    return initial;
  }
  function newComment(commentBefore, textbetweenTag, commentAfter) {
    if (openMark) {
      return (
        commentBefore + openMark + textbetweenTag + closeMark + commentAfter
      );
    }
    if (type === "blockquote" && !textbetweenTag) {
      return commentBefore + "\n> " + commentAfter;
    }
    if (type === "blockquote" && textbetweenTag) {
      return commentBefore + "\n> " + textbetweenTag + "\n" + commentAfter;
    }
    if (type === "blockCode" && !textbetweenTag) {
      return commentBefore + "\n```lenguage\nCódigo\n```\n" + commentAfter;
    }
    if (type === "blockCode" && textbetweenTag) {
      return (
        commentBefore +
        "\n```lenguage\n" +
        textbetweenTag +
        "\n" +
        "```\n" +
        commentAfter
      );
    }
    if (type === "anchor" && !textbetweenTag) {
      return (
        commentBefore + "[https://ejemplo.com](texto a mostrar)" + commentAfter
      );
    }
    if (type === "anchor" && textbetweenTag) {
      return (
        commentBefore +
        "[https://ejemplo.com](" +
        textbetweenTag +
        ")" +
        commentAfter
      );
    }
    if (type === "anchorImage" && !textbetweenTag) {
      return (
        commentBefore +
        "![https://ejemplo.com/imagen.png](título)" +
        commentAfter
      );
    }
    if (type === "anchorImage" && textbetweenTag) {
      return (
        commentBefore +
        "![https://ejemplo.com/imagen.png](" +
        textbetweenTag +
        ")" +
        commentAfter
      );
    }
    return commentBefore;
  }

  function modifiedTextWithTag(e) {
    e.preventDefault();
    const comment = commentText.current.value;
    if (comment.trim().length > 800) {
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
    const caretStart = calculateCaretStart(
      commentBefore.length,
      textbetweenTag
    );
    const caretEnd = calculateCaretEnd(commentBefore.length, textbetweenTag);

    setCurrentCaret({ start: caretStart, end: caretEnd });

    const text = newComment(commentBefore, textbetweenTag, commentAfter);
    setComment(text);
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
          font-style: ${title === "Cursiva" ? "italic" : "unset"};
          font-weight: ${title === "Negrita" ? "bold" : "unset"};
          text-decoration: ${title === "Subrayado"
            ? "underline"
            : title === "Tachado"
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
  type: PropTypes.string,
  commentText: PropTypes.object,
  setCurrentCaret: PropTypes.func,
  setComment: PropTypes.func,
  setInfo: PropTypes.func,
  children: PropTypes.node,
};
