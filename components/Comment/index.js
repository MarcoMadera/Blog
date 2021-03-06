import { H2 } from "../tags";
import React, { useEffect, useRef, useState } from "react";
import Feed from "./Feed";
import Form from "./form/index";
import useUser from "../../hooks/useUser";
import useComments from "../../hooks/useComments";
import PropTypes from "prop-types";
import SendCommentPopup from "./options/SendCommentPopup";
import useNotification from "../../hooks/useNotification";
import { colors } from "../../styles/theme";
import useDarkMode from "../../hooks/useDarkMode";
export default function Comments({ slug }) {
  const [preview, setPreview] = useState(false);
  const { user, logOutUser, isLoggedIn } = useUser();
  const {
    comment,
    realtimeCommentList,
    isSubmittingComment,
    setIsSubmittingComment,
    createComment,
  } = useComments();
  const [isValidComment, setIsValidComment] = useState(false);
  const { addNotification } = useNotification();
  const sendCommentRef = useRef();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setIsValidComment(!(comment.trim().length < 10));
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
    realtimeCommentList();
  }, [slug, realtimeCommentList]);

  useEffect(() => {
    if (isLoggedIn && isSubmittingComment && isValidComment) {
      createComment(comment);
    }
  }, [isLoggedIn, comment, createComment, isSubmittingComment, isValidComment]);

  return (
    <section>
      {!isLoggedIn && isSubmittingComment && isValidComment ? (
        <SendCommentPopup sendCommentRef={sendCommentRef} />
      ) : null}
      <label htmlFor="Comment">
        <H2>Comentarios</H2>
      </label>
      <div className="controls">
        {isLoggedIn ? (
          <div>
            <span>Sesión iniciada como {user?.username ?? "Anónimo"} </span>
            <button onClick={logOutUser}>(cerrar sesión)</button>
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
        isValidComment={isValidComment}
        sendCommentRef={sendCommentRef}
      />
      <Feed />
      <style jsx>{`
        .controls {
          display: inline-flex;
          width: 100%;
          column-gap: 5px;
          align-items: flex-end;
          justify-content: space-between;
        }
        .controls div button:hover {
          color: ${darkMode ? colors.dark_secondary : colors.secondary};
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
          display: table;
        }
        span {
          font-size: 14px;
        }
      `}</style>
    </section>
  );
}

Comments.propTypes = {
  slug: PropTypes.string,
};
