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
  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  function handleLogOut() {
    logOut()
      .then(setUser)
      .catch(() => setInfo("Ha ocurrido un error al cerrar sesión"));
  }
  return (
    <div>
      <label htmlFor="Comment">
        <H2>Comentarios</H2>
      </label>
      {user && (
        <>
          <span>Sesión iniciada como {user.username} </span>
          <button onClick={handleLogOut}>(cerrar sesión)</button>
        </>
      )}
      <Form
        slug={slug}
        user={user}
        setUser={setUser}
        setAllComments={setAllComments}
        updateComments={updateComments}
        setUpdateComments={setUpdateComments}
        info={info}
        setInfo={setInfo}
      />
      <Feed
        allComments={allComments}
        user={user}
        setInfo={setInfo}
        slug={slug}
        setAllComments={setAllComments}
      />
      <style jsx>{`
        button {
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }
        label {
          display: table;
        }
        span {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

Comments.propTypes = {
  slug: PropTypes.string,
};
