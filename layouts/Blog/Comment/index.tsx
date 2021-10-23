import { H2 } from "components/tags";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import Form from "./form/index";
import useUser from "hooks/useUser";
import useComments from "hooks/useComments";
import useNotification from "hooks/useNotification";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { siteMetadata } from "site.config";
import dynamic from "next/dynamic";

const Feed = dynamic(() => import("./Feed"), {
  ssr: false,
  loading: function Loading() {
    return <p>Cargando...</p>;
  },
});

const LoadMoreCommentsButton = dynamic(
  () => import("./LoadMoreCommentsButton"),
  {
    ssr: false,
  }
);

const SendCommentConfirmationModal = dynamic(
  () => import("components/modals/SendCommentConfirmationModal"),
  {
    ssr: false,
  }
);

export default function Comments({ slug }: { slug: string }): ReactElement {
  const [preview, setPreview] = useState(false);
  const { user, logOutUser, isLoggedIn } = useUser();
  const {
    comment,
    updateComments,
    isSubmittingComment,
    setIsSubmittingComment,
    createComment,
    allComments,
    commentCount,
    timesLoadedComments,
  } = useComments();
  const [isValidComment, setIsValidComment] = useState(false);
  const { addNotification } = useNotification();
  const sendCommentRef = useRef<HTMLButtonElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (comment) {
      setIsValidComment(!(comment.trim().length < 10));
    }
  }, [comment]);

  useEffect(() => {
    if (isSubmittingComment && !isValidComment) {
      addNotification({
        variant: "info",
        message: "Escribe al menos 10 caracteres",
      });
      setIsSubmittingComment(false);
    }
  }, [
    isSubmittingComment,
    isValidComment,
    addNotification,
    setIsSubmittingComment,
  ]);

  // update comments every time the slug changes
  useEffect(() => {
    updateComments();
  }, [slug, updateComments]);

  useEffect(() => {
    if (comment && isLoggedIn && isSubmittingComment && isValidComment) {
      createComment(comment);
    }
  }, [isLoggedIn, comment, createComment, isSubmittingComment, isValidComment]);

  return (
    <section>
      {!isLoggedIn && isSubmittingComment && isValidComment ? (
        <SendCommentConfirmationModal sendCommentRef={sendCommentRef} />
      ) : null}
      <label htmlFor="Comment">
        <H2>Comentarios</H2>
      </label>
      <div className="controls">
        {isLoggedIn ? (
          <div>
            <span>Sesión iniciada como {user?.username ?? "Anónimo"} </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                logOutUser();
                if (textAreaRef.current) {
                  textAreaRef.current.focus();
                } else {
                  sendCommentRef.current?.focus();
                }
              }}
            >
              (cerrar sesión)
            </button>
          </div>
        ) : (
          <span></span>
        )}
        <button
          className="previewButton"
          onClick={() => {
            setPreview((e) => !e);
          }}
        >
          {preview ? "Editor" : "Vista previa"}
        </button>
      </div>
      <Form
        preview={preview}
        sendCommentRef={sendCommentRef}
        textAreaRef={textAreaRef}
      />
      {allComments && allComments.length > 0 ? (
        <>
          <Feed />
          {commentCount &&
          timesLoadedComments &&
          commentCount > siteMetadata.commentsPerPost * timesLoadedComments ? (
            <LoadMoreCommentsButton />
          ) : null}
        </>
      ) : null}
      <style jsx>{`
        .controls div button:hover,
        .controls div button:focus {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
        }
      `}</style>
      <style jsx>{`
        .controls {
          display: flex;
          width: 100%;
          align-items: flex-end;
          justify-content: space-between;
        }
        .controls div {
          margin-right: 5px;
        }
        label :global(h2) {
          margin: 0;
        }
        button {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          line-height: 19px;
        }
        button.previewButton {
          float: right;
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          padding: 5px 8px;
        }
        button.previewButton:hover,
        button.previewButton:focus {
          border: 1px solid #cccccca1;
        }
        label {
          display: inline-block;
        }
        span {
          font-size: 14px;
        }
      `}</style>
    </section>
  );
}
