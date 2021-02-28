/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import useNotification from "../../../hooks/useNotification";

export default function Button({
  title,
  commentText,
  setCurrentCaret,
  setComment,
  children,
  type,
  setInfo,
  mark,
  openMark,
  closeMark,
}) {
  const { setShowNotification } = useNotification();
  function calculateCaret(initial, textbetweenTag) {
    if (mark) {
      const caret = initial ? initial + mark.length + 1 : mark.length;
      return { start: caret, end: caret };
    }
    if (openMark && closeMark) {
      const caret =
        initial +
        openMark.length +
        (textbetweenTag.length && textbetweenTag.length + closeMark.length);

      return { start: caret, end: caret };
    }
    if (type === "anchor") {
      const caretStart =
        initial + (textbetweenTag.length ? textbetweenTag.length + 3 : 18);
      const caretEnd =
        initial + (textbetweenTag.length ? textbetweenTag.length + 22 : 37);
      return { start: caretStart, end: caretEnd };
    }
    if (type === "anchorImage") {
      const caretEnd =
        initial + (textbetweenTag.length ? textbetweenTag.length + 10 : 40);
      return { start: initial + 10, end: caretEnd };
    }
    if (type === "blockCode") {
      return {
        start: initial + (initial ? 4 : 3),
        end: initial ? initial + 12 : 11,
      };
    }
  }
  function newComment(commentBefore, textbetweenTag, commentAfter) {
    if (mark) {
      return `${
        commentBefore.length ? `${commentBefore}\n${mark}` : mark
      }${textbetweenTag}${commentAfter.length ? `${commentAfter}\n` : ""}`;
    }
    if (openMark && closeMark) {
      return (
        commentBefore + openMark + textbetweenTag + closeMark + commentAfter
      );
    }
    if (type === "blockCode") {
      return (
        (commentBefore.length ? commentBefore + "\n" : "") +
        `${"```lenguaje\n"}${
          textbetweenTag || "Código"
        }${"\n```"}\n${commentAfter}`
      );
    }
    if (type === "anchor") {
      return (
        commentBefore +
        `[${textbetweenTag || "texto a mostrar"}](` +
        "https://ejemplo.com)" +
        commentAfter
      );
    }
    if (type === "anchorImage") {
      return (
        commentBefore +
        `![título](${textbetweenTag || "https://ejemplo.com/imagen.png"})` +
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
      setShowNotification(true);
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
    setCurrentCaret(calculateCaret(commentBefore.length, textbetweenTag));

    const text = newComment(commentBefore, textbetweenTag, commentAfter);
    setComment(text);
    commentText.current.focus();
  }
  return (
    <button onClick={(e) => modifiedTextWithTag(e)} title={title}>
      {children}
      <style jsx>{`
        button {
          align-items: center;
          background: transparent;
          border: 1px solid #cccccc4d;
          border-radius: 3px;
          color: inherit;
          cursor: pointer;
          display: inline-flex;
          height: 32px;
          width: 32px;
          justify-content: center;
          font-style: ${title === "Cursiva" ? "italic" : "unset"};
          font-weight: ${title === "Negrita" ? "bold" : "unset"};
          font-size: ${title === "Título" ? "16px" : "13.333px"};
          padding: 3px;
          position: relative;
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
