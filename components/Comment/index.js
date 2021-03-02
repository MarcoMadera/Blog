import { H2 } from "../tags";
import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import Form from "./form/index";
import useUser from "../../hooks/useUser";
import useComments from "../../hooks/useComments";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "../../firebase/client";

export default function Comments({ slug }) {
  const [preview, setPreview] = useState(false);
  const { user, logOutUser, setUser } = useUser();
  const { updateCommentsList } = useComments();

  // update comments every time the slug changes
  useEffect(() => {
    updateCommentsList();
  }, [slug, updateCommentsList]);

  // Detect user and log in
  useEffect(() => {
    onAuthStateChanged(setUser);
  }, [setUser]);

  return (
    <section>
      <label htmlFor="Comment">
        <H2>Comentarios</H2>
      </label>
      <div className="controls">
        {user ? (
          <div>
            <span>Sesión iniciada como {user.username} </span>
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
      <Form preview={preview} />
      <Feed />
      <style jsx>{`
        .controls {
          display: inline-flex;
          width: 100%;
          column-gap: 5px;
          align-items: flex-end;
          justify-content: space-between;
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
