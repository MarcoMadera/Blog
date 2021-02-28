import { database, uploadImage } from "../../../firebase/client";
import { useState, useEffect, useRef } from "react";
import { Info } from "../icons";
import firebase from "firebase/app";
import PropTypes from "prop-types";
import TextArea from "./TextArea";
import Options from "../options";
import Preview from "./Preview";
import useNotification from "../../../hooks/useNotification";
import { siteMetadata } from "../../../site.config";

export function updateCommentsList(
  slug,
  setAllComments,
  setInfo,
  setShowNotification,
  limit
) {
  database
    .ref(`post/${slug}`)
    .orderByChild("post")
    .equalTo(slug)
    .limitToLast(limit || siteMetadata.commentsPerPost)
    .once("value", (snapshot) => {
      let allComments = [];
      snapshot.forEach((snap) => {
        allComments.unshift(snap.val());
      });
      setAllComments(allComments);
    })
    .catch(() => {
      setInfo("Error al actualizar los comentarios");
      setShowNotification(true);
    });
}

export default function Form({
  slug,
  user,
  setUser,
  setAllComments,
  info,
  setInfo,
  updateComments,
  setUpdateComments,
  preview,
  timesLoadedComments,
}) {
  const [selectTextArea, setSelectTextArea] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [currentCaret, setCurrentCaret] = useState({ start: 0, end: 0 });
  const commentText = useRef();
  const [drag, setDrag] = useState("");
  const { setShowNotification } = useNotification();
  useEffect(() => {
    setInfo("");
    updateCommentsList(slug, setAllComments, setInfo, setShowNotification);
  }, [slug, setAllComments, setInfo, setShowNotification]);

  useEffect(() => {
    if (task) {
      let onProgress = (snapshot) => {
        setImgURL(null);
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setShowNotification(true);
        setInfo(`Cargando ${Math.round(percent * 100) / 100}%`);
        setShowNotification(true);
      };
      let onError = () => {
        setInfo("Ha ocurrido un error al intentar subir la imagen");
        setShowNotification(true);
      };
      let onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImgURL);
        setTask(null);
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task, setInfo, setShowNotification]);

  // Set the cursor position after select one modified text option
  useEffect(() => {
    if (commentText) {
      commentText.current.selectionEnd = currentCaret.end;
      commentText.current.selectionStart = currentCaret.start;
    }
  }, [currentCaret]);

  // Hide the options everytime the slug blog changes
  // it should also be included here to remove the image or message if added one and change page instead of submit
  useEffect(() => {
    return () => setSelectTextArea(false);
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();

    setInfo("");
    if (!user) {
      setInfo("Necesitas identificarte para enviar un comentario");
      setShowNotification(true);
      return;
    }
    if (comment.trim().length < 10) {
      setInfo("Escribe al menos 10 caracteres");
      setShowNotification(true);
      return;
    }
    const commentsRef = database.ref(`post/${slug}`);
    const newPostRef = commentsRef.push();
    const commentId = (await newPostRef).key.toString();
    setUpdateComments(true);
    await newPostRef
      .set({
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        img: imgURL,
        comment: comment.trim(),
        post: slug,
        date: firebase.database.ServerValue.TIMESTAMP,
        uid: user.uid,
        commentId: commentId,
      })
      .catch(() => {
        setInfo("Error al publicar el comentario");
        setShowNotification(true);
      });
    updateCommentsList(
      slug,
      setAllComments,
      setInfo,
      setShowNotification,
      siteMetadata.commentsPerPost * timesLoadedComments
    );
    setUpdateComments(false);
    setImgURL(null);
    setComment("");
    setInfo("");
  }
  function handleDrop(image) {
    setDrag("Drop");
    setInfo("");
    if (user === null) {
      setInfo("Necesitas identificarte para enviar una imagen");
      setShowNotification(true);
      return;
    }
    if (!image?.type.startsWith("image")) {
      setInfo("El archivo tiene que ser de tipo imagen");
      setShowNotification(true);
      return;
    }
    setTask(uploadImage(image, slug));
  }
  return (
    <>
      {preview ? (
        <Preview comment={comment} />
      ) : (
        <form>
          <TextArea
            setComment={setComment}
            setSelectTextArea={setSelectTextArea}
            comment={comment}
            commentText={commentText}
            setDrag={setDrag}
            drag={drag}
            handleDrop={handleDrop}
          />
          <Options
            user={user}
            handleDrop={handleDrop}
            handleSubmit={handleSubmit}
            updateComments={updateComments}
            commentText={commentText}
            setCurrentCaret={setCurrentCaret}
            setComment={setComment}
            setInfo={setInfo}
            setUser={setUser}
            selectTextArea={selectTextArea}
          />
          {info && (
            <p className="infoComment">
              <Info width={20} height={20} /> {info}
            </p>
          )}
          {imgURL && <img src={imgURL} alt="" />}
        </form>
      )}
      <style jsx>{`
        form {
          width: 100%;
          margin-bottom: 15px;
        }
        img {
          margin: 10px auto;
          max-width: 100%;
          display: flex;
          border-radius: 10px;
        }
        p {
          align-items: center;
          display: inline-flex;
        }
        p :global(svg) {
          margin-right: 5px;
        }
      `}</style>
    </>
  );
}
Form.propTypes = {
  children: PropTypes.node,
  slug: PropTypes.string,
  user: PropTypes.object,
  info: PropTypes.string,
  setUser: PropTypes.func,
  setAllComments: PropTypes.func,
  setInfo: PropTypes.func,
  preview: PropTypes.bool,
  updateComments: PropTypes.bool,
  setUpdateComments: PropTypes.func,
  timesLoadedComments: PropTypes.number,
};
