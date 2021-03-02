import { useCallback, useContext } from "react";
import CommentsContext from "../context/CommentsContext";
import { database, uploadImage } from "../firebase/client";
import { siteMetadata } from "../site.config";
import useNotification from "./useNotification";
import firebase from "firebase/app/";
import useUser from "./useUser";
import { useRouter } from "next/router";
export default function useComments() {
  const {
    allComments,
    setAllComments,
    timesLoadedComments,
    setTimesLoadedComments,
    imgURL,
    setImgURL,
    comment,
    setComment,
    setIsSubmittingComment,
    isSubmittingComment,
    commentCount,
    setCommentCount,
  } = useContext(CommentsContext);
  const { setNotification } = useNotification();
  const { user } = useUser();
  const router = useRouter();
  const slug = router.query.slug;

  const updateCommentsList = useCallback(() => {
    //Update all comments
    database
      .ref(`post/${slug}`)
      .orderByChild("post")
      .equalTo(slug)
      .limitToLast(siteMetadata.commentsPerPost * timesLoadedComments)
      .once("value", (snapshot) => {
        let comments = [];
        snapshot.forEach((snap) => {
          comments.unshift(snap.val());
        });
        setAllComments(comments);
      })
      .catch(() => {
        setNotification({
          variant: "error",
          message: "Error al actualizar los comentarios",
        });
      });

    // Update Comment Count
    database
      .ref(`post/${slug}`)
      .once("value")
      .then((snapshot) => {
        setCommentCount(snapshot.numChildren());
      });
  }, [
    setAllComments,
    timesLoadedComments,
    slug,
    setNotification,
    setCommentCount,
  ]);

  const handleTask = useCallback(
    ({ task, isSendingMoreFiles }) => {
      if (task) {
        let onProgress = (snapshot) => {
          setImgURL(null);
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setNotification({
            variant: "info",
            message: `Cargando ${Math.round(percent * 100) / 100}%`,
          });
        };
        let onError = () => {
          setNotification({
            variant: "error",
            message: "Ha ocurrido un error al intentar subir la imagen",
          });
        };
        let onComplete = () => {
          task.snapshot.ref.getDownloadURL().then(setImgURL);
          if (isSendingMoreFiles) {
            setNotification({
              variant: "info",
              message:
                "Solo se puede subir una imagen por comentario por este medio. Puedes usar la opción de imagen por enlace si prefieres tener más de una.",
            });
          }
        };
        task.on("state_changed", onProgress, onError, onComplete);
      }
    },
    [setImgURL, setNotification]
  );

  async function createComment(comment) {
    setNotification({});
    if (!user) {
      setNotification({
        variant: "info",
        message: "Necesitas identificarte para enviar un comentario",
      });
      return;
    }
    if (comment.trim().length < 10) {
      setNotification({
        variant: "info",
        message: "Escribe al menos 10 caracteres",
      });
      return;
    }
    setIsSubmittingComment(true);
    const commentRef = database.ref(`post/${slug}`);
    const newcommentRef = commentRef.push();
    const commentId = (await newcommentRef).key.toString();
    try {
      newcommentRef.set({
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        comment: comment.trim(),
        img: imgURL,
        post: slug,
        uid: user.uid,
        date: firebase.database.ServerValue.TIMESTAMP,
        commentId: commentId,
      });
      setNotification({
        variant: "info",
        message: "Comentario publicado",
      });
      setImgURL(null);
      setComment("");
      updateCommentsList(timesLoadedComments * siteMetadata.commentsPerPost);
    } catch {
      setNotification({
        variant: "error",
        message: "Error al publicar el comentario",
      });
    }
    setIsSubmittingComment(false);
  }

  function removeComment(commentId) {
    setNotification("");
    database
      .ref(`post/${slug}/${commentId}`)
      .remove()
      .then(() => {
        setNotification({ variant: "info", message: "Comentario eliminado" });
      })
      .catch(() => {
        setNotification("Error al eliminar el comentario");
      });
  }

  function sendFile(files) {
    setNotification({});
    const isSendingMoreFiles = files.length > 1;
    const image = files[0];

    if (user === null) {
      setNotification({
        variant: "info",
        message: "Necesitas identificarte para enviar una imagen",
      });
      return;
    }
    if (image?.size > 3 * 1024 * 1024) {
      setNotification({
        variant: "info",
        message: "El archivo tiene que ser menor de 3mb",
      });
      return;
    }
    if (!image?.type.startsWith("image")) {
      setNotification({
        variant: "info",
        message: "El archivo tiene que ser de tipo imagen",
      });
      return;
    }
    handleTask(uploadImage(image, user.uid, isSendingMoreFiles));
  }

  return {
    comment,
    setAllComments,
    setComment,
    isSubmittingComment,
    allComments,
    createComment,
    removeComment,
    updateCommentsList,
    timesLoadedComments,
    setTimesLoadedComments,
    slug,
    imgURL,
    setImgURL,
    sendFile,
    commentCount,
  };
}
