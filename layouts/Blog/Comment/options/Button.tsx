import useComments from "hooks/useComments";
import useNotification from "hooks/useNotification";
import useToolTip from "hooks/useToolTip";
import React, {
  Dispatch,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  RefObject,
  SetStateAction,
} from "react";
import { CommentOptions } from "types/comments";

interface ButtonProps extends CommentOptions {
  textAreaRef: RefObject<HTMLTextAreaElement>;
  setCurrentCaret: Dispatch<
    SetStateAction<{
      start: number;
      end: number;
    }>
  >;
}

export default function Button({
  name,
  textAreaRef,
  setCurrentCaret,
  children,
  type,
  mark,
  openMark,
  closeMark,
}: PropsWithChildren<ButtonProps>): ReactElement {
  const { addNotification } = useNotification();
  const { setComment } = useComments();
  const { getToolTipAttrbutes } = useToolTip();

  function calculateCaret(initial: number, textbetweenTag: string) {
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
    return { start: 0, end: 0 };
  }

  function newComment(
    commentBefore: string,
    textbetweenTag: string,
    commentAfter: string
  ) {
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

  function modifiedTextWithTag(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    const comment = textAreaRef.current?.value;
    if (comment && comment.trim().length > 800) {
      addNotification({
        variant: "info",
        message: "El comentario tiene que ser más corto",
      });
      return;
    }
    const currentPos = textAreaRef.current?.selectionStart;
    const lastPos = textAreaRef.current?.selectionEnd;
    const textbetweenTag = textAreaRef.current?.value.substring(
      currentPos || 0,
      lastPos
    );
    const commentBefore = textAreaRef.current?.value.slice(0, currentPos);
    const commentAfter = textAreaRef.current?.value.slice(
      lastPos,
      textAreaRef.current.value.length
    );

    setCurrentCaret(
      calculateCaret(commentBefore?.length || 0, textbetweenTag || "")
    );

    const text = newComment(
      commentBefore || "",
      textbetweenTag || "",
      commentAfter || ""
    );
    setComment(text);
    textAreaRef.current?.focus();
  }

  return (
    <button
      onClick={(e) => modifiedTextWithTag(e)}
      {...getToolTipAttrbutes(name)}
    >
      <span aria-hidden="true">{children}</span>
      <style jsx>{`
        button {
          font-style: ${name === "Cursiva" ? "italic" : "unset"};
          font-weight: ${name === "Negrita" ? "bold" : "unset"};
          font-size: ${name === "Título" ? "16px" : "13.333px"};
          text-decoration: ${name === "Subrayado"
            ? "underline"
            : name === "Tachado"
            ? "line-through"
            : "unset"};
        }
      `}</style>
      <style jsx>{`
        span {
          display: inline-flex;
        }
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
          margin: 0 6px 5px 0;
          justify-content: center;
          padding: 3px;
          position: relative;
        }
        button:focus,
        button:hover {
          border: 1px solid #cccccca1;
        }
      `}</style>
    </button>
  );
}
