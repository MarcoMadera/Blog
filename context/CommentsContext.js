/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
const Context = createContext({
  allComments: [],
  setAllComments: () => {},
  timesLoadedComments: 1,
  setTimesLoadedComments: () => {},
  imgURL: null,
  setImgURL: () => {},
  comment: "",
  setComment: () => {},
  isSubmittingComment: false,
  setIsSubmittingComment: () => {},
  task: null,
  setTask: () => {},
  commentCount: 0,
  setCommentCount: () => {},
});

export function CommentsContextProvider({ children }) {
  const [allComments, setAllComments] = useState([]);
  const [timesLoadedComments, setTimesLoadedComments] = useState(1);
  const [imgURL, setImgURL] = useState(null);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [task, setTask] = useState(null);
  return (
    <Context.Provider
      value={{
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
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
