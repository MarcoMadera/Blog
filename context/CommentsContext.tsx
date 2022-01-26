import { useState, createContext, ReactNode, ReactElement } from "react";
import type { CommentsContext } from "types/comments";

const Context = createContext<CommentsContext | null>(null);

export function CommentsContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [allComments, setAllComments] = useState<
    CommentsContext["allComments"]
  >([]);
  const [timesLoadedComments, setTimesLoadedComments] =
    useState<CommentsContext["timesLoadedComments"]>(1);

  const [imgURL, setImgURL] = useState<CommentsContext["imgURL"]>(null);

  const [comment, setComment] = useState<CommentsContext["comment"]>("");

  const [commentCount, setCommentCount] =
    useState<CommentsContext["commentCount"]>(0);

  const [isSubmittingComment, setIsSubmittingComment] =
    useState<CommentsContext["isSubmittingComment"]>(false);

  const [task, setTask] = useState<CommentsContext["task"]>(null);

  const value = {
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
    task,
    setTask,
    commentCount,
    setCommentCount,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Context;
