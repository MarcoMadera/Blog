import { useCallback, useContext } from "react";
import CommentsContext from "context/CommentsContext";
import { database, uploadTask } from "lib/firebase/client";
import { siteMetadata } from "site.config";
import useNotification from "./useNotification";
import useUser from "./useUser";
import { useRouter } from "next/router";
import type { Comment, UseComments } from "types/comments";
import {
  getDownloadURL,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
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
import useAnalytics from "./useAnalytics";
import { HitType } from "types/analytics";

export default function useComments(): UseComments {
  const context = useContext(CommentsContext);
  const { addNotification } = useNotification();
  const { user } = useUser();
  const router = useRouter();
  const { trackWithGoogleAnalytics } = useAnalytics();

  if (context === null) {
    throw new Error("useComments must be used within a CommentProvider");
  }

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
  } = context;

  const { commentsPerPost, siteUrl } = siteMetadata;

  const slug = router.query.slug;

  const updateCommentCount = useCallback(() => {
    const postRef = ref(database, `post/${slug}`);

    onValue(postRef, ({ size }) => setCommentCount(size));
  }, [setCommentCount, slug]);

  const updateComments = useCallback(async () => {
    try {
      const postRef = ref(database, `post/${slug}`);
      const maxComments = limitToLast(commentsPerPost * timesLoadedComments);
      const commentsQuery = query(postRef, maxComments);

      onValue(commentsQuery, (snapshot) => {
        const comments: Comment[] = [];

        snapshot.forEach((snap) => {
          comments.unshift(snap.val());
        });

        setAllComments(comments);
      });

      updateCommentCount();
      trackWithGoogleAnalytics(HitType.EVENT, {
        eventCategory: "Comments",
        eventAction: "Loaded",
        eventLabel: `${slug}`,
        eventValue: "1",
      });
    } catch {
      addNotification({
        variant: "error",
        message: "Error al actualizar los comentarios",
      });
      trackWithGoogleAnalytics(HitType.EXCEPTION, {
        exDescription: "Update comments error",
        exFatal: "0",
      });
    }
  }, [
    addNotification,
    commentsPerPost,
    setAllComments,
    slug,
    timesLoadedComments,
    trackWithGoogleAnalytics,
    updateCommentCount,
  ]);

  const handleTask = useCallback(
    ({ task }: { task: UploadTask }) => {
      function onProgress(uploadTaskSnapshot: UploadTaskSnapshot) {
        setImgURL(null);
        if (uploadTaskSnapshot.state === "canceled") {
          addNotification({
            variant: "info",
            message: "Se ha cancelado subir la imagen",
          });
        }
      }

      function onError() {
        addNotification({
          variant: "error",
          message: "Ha ocurrido un error al intentar subir la imagen",
        });
        trackWithGoogleAnalytics(HitType.EXCEPTION, {
          exDescription: "Upload image error",
          exFatal: "0",
        });
      }

      function onComplete() {
        getDownloadURL(task.snapshot.ref).then(setImgURL);
      }

      task.on("state_changed", onProgress, onError, onComplete);
    },
    [setImgURL, addNotification, trackWithGoogleAnalytics]
  );

  const createComment = useCallback(
    async (comment) => {
      const postRef = ref(database, `post/${slug}`);

      setIsSubmittingComment(false);

      try {
        const newcommentRef = await push(postRef);
        const commentId = newcommentRef.key?.toString();
        const newComment = {
          username: user?.username ?? "Anónimo",
          avatar: user?.avatar ?? `${siteUrl}/profile-placeholder_200x200.jpg`,
          email: user?.email ?? null,
          comment: comment.trim(),
          img: imgURL,
          post: slug,
          uid: user?.uid,
          date: serverTimestamp(),
          commentId: commentId,
        };

        set(newcommentRef, newComment);
        setImgURL(null);
        setComment("");

        addNotification({
          variant: "success",
          message: "Comentario publicado",
        });
        trackWithGoogleAnalytics(HitType.EVENT, {
          eventCategory: "Form",
          eventAction: "Submit success",
          eventLabel: "Comments",
          eventValue: "1",
        });
      } catch {
        addNotification({
          variant: "error",
          message: "Error al publicar el comentario",
        });
        trackWithGoogleAnalytics(HitType.EXCEPTION, {
          exDescription: "Create comment error",
          exFatal: "0",
        });
      }
    },
    [
      slug,
      setIsSubmittingComment,
      user,
      siteUrl,
      imgURL,
      setImgURL,
      setComment,
      addNotification,
      trackWithGoogleAnalytics,
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

  const uploadImage = useCallback(
    (files: FileList) => {
      const isSendingMoreFiles = files.length > 1;
      const image = files[0];

      if (user === null) {
        addNotification({
          variant: "info",
          message: "Necesitas identificarte para enviar una imagen",
        });
        return;
      }
      if (isSendingMoreFiles) {
        addNotification({
          variant: "info",
          message:
            "Solo se puede subir una imagen por comentario. Puedes usar la opción de imagen por enlace si prefieres tener más de una.",
          displayTime: 20000,
        });
        return;
      }
      if (!image.type.startsWith("image")) {
        addNotification({
          variant: "info",
          message: "El archivo tiene que ser de tipo imagen",
        });
        return;
      }
      if (image.size > 3 * 1024 * 1024) {
        addNotification({
          variant: "info",
          message: "El archivo tiene que ser menor de 3mb",
        });
        return;
      }
      handleTask(uploadTask(image, user?.uid));
    },
    [addNotification, handleTask, user]
  );

  return {
    imgURL,
    uploadImage,
    comment,
    setComment,
    allComments,
    commentCount,
    removeComment,
    createComment,
    updateComments,
    isSubmittingComment,
    timesLoadedComments,
    setIsSubmittingComment,
    setTimesLoadedComments,
  };
}
