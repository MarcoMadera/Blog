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
  const { addNotification } = useNotification();
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
        addNotification({
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
    addNotification,
    setCommentCount,
  ]);

  const handleTask = useCallback(
    ({ task, isSendingMoreFiles }) => {
      if (task) {
        let onProgress = () => {
          setImgURL(null);
        };
        let onError = () => {
          addNotification({
            variant: "error",
            message: "Ha ocurrido un error al intentar subir la imagen",
          });
        };
        let onComplete = () => {
          task.snapshot.ref.getDownloadURL().then(setImgURL);
          if (isSendingMoreFiles) {
            addNotification({
              variant: "info",
              message:
                "Solo se puede subir una imagen por comentario por este medio. Puedes usar la opción de imagen por enlace si prefieres tener más de una.",
            });
          }
        };
        task.on("state_changed", onProgress, onError, onComplete);
      }
    },
    [setImgURL, addNotification]
  );

  const createComment = useCallback(
    async (comment) => {
      setIsSubmittingComment(false);
      try {
        const commentRef = database.ref(`post/${slug}`);
        const newcommentRef = commentRef.push();
        const commentId = (await newcommentRef).key.toString();
        newcommentRef.set({
          username: user.username ?? "Anónimo",
          avatar:
            user.avatar ??
            `${siteMetadata.siteUrl}/profile-placeholder_200x200.jpg`,
          email: user.email ?? null,
          comment: comment.trim(),
          img: imgURL,
          post: slug,
          uid: user.uid,
          date: firebase.database.ServerValue.TIMESTAMP,
          commentId: commentId,
        });
        setImgURL(null);
        setComment("");
        updateCommentsList(timesLoadedComments * siteMetadata.commentsPerPost);
        addNotification({
          variant: "info",
          message: "Comentario publicado",
        });
      } catch {
        addNotification({
          variant: "error",
          message: "Error al publicar el comentario",
        });
      }
    },
    [
      imgURL,
      setComment,
      setImgURL,
      setIsSubmittingComment,
      addNotification,
      slug,
      timesLoadedComments,
      updateCommentsList,
      user,
    ]
  );

  const removeComment = useCallback(
    (commentId) => {
      database
        .ref(`post/${slug}/${commentId}`)
        .remove()
        .then(() => {
          addNotification({ variant: "info", message: "Comentario eliminado" });
        })
        .catch(() => {
          addNotification("Error al eliminar el comentario");
        });
    },
    [addNotification, slug]
  );

  function sendFile(files) {
    const isSendingMoreFiles = files.length > 1;
    const image = files[0];

    if (user === null) {
      addNotification({
        variant: "info",
        message: "Necesitas identificarte para enviar una imagen",
      });
      return;
    }
    if (image?.size > 3 * 1024 * 1024) {
      addNotification({
        variant: "info",
        message: "El archivo tiene que ser menor de 3mb",
      });
      return;
    }
    if (!image?.type.startsWith("image")) {
      addNotification({
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
    setIsSubmittingComment,
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
