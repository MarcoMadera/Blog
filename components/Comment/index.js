import { H2 } from "../tags";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, logOut } from "../../firebase/client";
import Feed from "./Feed";
import Form from "./form/index";

export default function Comments({ slug }) {
  const [allComments, setAllComments] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);
  const [user, setUser] = useState(undefined);
  const [info, setInfo] = useState("");
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  function handleLogOut() {
    logOut()
      .then(setUser)
      .catch(() => setInfo("Ha ocurrido un error al cerrar sesión"));
  }
  return (
    <section>
      <label htmlFor="Comment">
        <H2>Comentarios</H2>
      </label>
      <div className="controls">
        {user ? (
          <div>
            <span>Sesión iniciada como {user.username} </span>
            <button onClick={handleLogOut}>(cerrar sesión)</button>
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
          {preview ? "Volver" : "Preview"}
        </button>
      </div>
      <Form
        slug={slug}
        user={user}
        setUser={setUser}
        setAllComments={setAllComments}
        updateComments={updateComments}
        setUpdateComments={setUpdateComments}
        info={info}
        setInfo={setInfo}
        preview={preview}
      />
      <Feed
        allComments={allComments}
        user={user}
        setInfo={setInfo}
        slug={slug}
        setAllComments={setAllComments}
      />
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
