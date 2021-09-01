import { useCallback, useContext } from "react";
import CommentsContext from "context/CommentsContext";
import { database, uploadImage } from "lib/firebase/client";
import { siteMetadata } from "site.config";
import useNotification from "./useNotification";
import useUser from "./useUser";
import { useRouter } from "next/router";
import { Comment, UseComments } from "types/comments";
import { getDownloadURL, UploadTask } from "firebase/storage";
import {
  ref,
  onValue,
  limitToLast,
  push,
  set,
  remove,
  serverTimestamp,
  query,
} from "firebase/database";

export default function useComments(): UseComments {
  const context = useContext(CommentsContext);
  const allComments = context?.allComments;
  const setAllComments = context?.setAllComments;
  const timesLoadedComments = context?.timesLoadedComments;
  const setTimesLoadedComments = context?.setTimesLoadedComments;
  const imgURL = context?.imgURL;
  const setImgURL = context?.setImgURL;
  const comment = context?.comment;
  const setComment = context?.setComment;
  const setIsSubmittingComment = context?.setIsSubmittingComment;
  const isSubmittingComment = context?.isSubmittingComment;
  const commentCount = context?.commentCount;
  const setCommentCount = context?.setCommentCount;

  const { addNotification } = useNotification();
  const { user } = useUser();
  const router = useRouter();
  const slug = router.query.slug;

  const updateCommentCount = useCallback(() => {
    const postRef = ref(database, `post/${slug}`);
    onValue(postRef, (snapshot) => {
      if (setCommentCount) setCommentCount(snapshot.size);
    });
  }, [setCommentCount, slug]);

  const realtimeCommentList = useCallback(async () => {
    const postRef = ref(database, `post/${slug}`);
    try {
      const commentsQuery = query(
        postRef,
        limitToLast(siteMetadata.commentsPerPost * (timesLoadedComments || 0))
      );
      onValue(commentsQuery, (snapshot) => {
        const comments: Comment[] = [];
        snapshot.forEach((snap) => {
          comments.unshift(snap.val());
        });

        if (setAllComments) setAllComments(comments);
      });
      updateCommentCount();
    } catch {
      addNotification({
        variant: "error",
        message: "Error al actualizar los comentarios",
      });
    }
  }, [
    addNotification,
    setAllComments,
    slug,
    timesLoadedComments,
    updateCommentCount,
  ]);

  const handleTask = useCallback(
    ({
      task,
      isSendingMoreFiles,
    }: {
      task: UploadTask;
      isSendingMoreFiles: boolean;
    }) => {
      if (task) {
        const onProgress = () => {
          if (setImgURL) setImgURL(null);
        };
        const onError = () => {
          addNotification({
            variant: "error",
            message: "Ha ocurrido un error al intentar subir la imagen",
          });
        };
        const onComplete = () => {
          getDownloadURL(task.snapshot.ref).then(setImgURL);
          if (isSendingMoreFiles) {
            addNotification({
              variant: "info",
              message:
                "Solo se puede subir una imagen por comentario por este medio. Puedes usar la opción de imagen por enlace si prefieres tener más de una.",
              displayTime: 20000,
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
      const postRef = ref(database, `post/${slug}`);
      if (setIsSubmittingComment) setIsSubmittingComment(false);
      try {
        const newcommentRef = push(postRef);
        const commentId = (await newcommentRef).key?.toString();
        set(ref(database, `post/${slug}/${commentId}`), {
          username: user?.username ?? "Anónimo",
          avatar:
            user?.avatar ??
            `${siteMetadata.siteUrl}/profile-placeholder_200x200.jpg`,
          email: user?.email ?? null,
          comment: comment.trim(),
          img: imgURL,
          post: slug,
          uid: user?.uid,
          date: serverTimestamp(),
          commentId: commentId,
        });
        if (setImgURL) setImgURL(null);
        if (setComment) setComment("");
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
      user,
    ]
  );

  const removeComment = useCallback(
    (commentId) => {
      const commentRef = ref(database, `post/${slug}/${commentId}`);
      remove(commentRef)
        .then(() => {
          addNotification({ variant: "info", message: "Comentario eliminado" });
        })
        .catch(() => {
          addNotification({
            variant: "error",
            message: "Error al eliminar el comentario",
          });
        });
    },
    [addNotification, slug]
  );

  function sendFile(files: FileList) {
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
    handleTask(uploadImage(image, user?.uid, isSendingMoreFiles));
  }

  return {
    imgURL,
    sendFile,
    comment,
    setComment,
    allComments,
    commentCount,
    removeComment,
    createComment,
    realtimeCommentList,
    isSubmittingComment,
    timesLoadedComments,
    setIsSubmittingComment,
    setTimesLoadedComments,
  };
}
