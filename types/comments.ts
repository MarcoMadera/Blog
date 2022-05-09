import { UploadTask } from "firebase/storage";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Comment {
  commentId?: string;
  avatar?: string;
  username?: string;
  comment?: string;
  date?: string;
  img?: string;
  uid?: string;
}

export interface CommentsContext {
  allComments: Comment[];
  setAllComments: Dispatch<SetStateAction<Comment[]>>;
  timesLoadedComments: number;
  setTimesLoadedComments: Dispatch<SetStateAction<number>>;
  imgURL: string | null;
  setImgURL: Dispatch<SetStateAction<string | null>>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  isSubmittingComment: boolean;
  setIsSubmittingComment: Dispatch<SetStateAction<boolean>>;
  task: UploadTask | null;
  setTask: Dispatch<SetStateAction<CommentsContext["task"]>>;
  commentCount: number;
  setCommentCount: Dispatch<SetStateAction<number>>;
}

export interface UseComments {
  imgURL: CommentsContext["imgURL"];
  uploadImage: (files: FileList) => void;
  comment: CommentsContext["comment"];
  setComment: CommentsContext["setComment"];
  allComments: CommentsContext["allComments"];
  commentCount: CommentsContext["commentCount"];
  removeComment: (commentId: string) => void;
  createComment: (comment: string) => Promise<void>;
  updateComments: ({ isFirstTime }: { isFirstTime: boolean }) => Promise<void>;
  isSubmittingComment: CommentsContext["isSubmittingComment"];
  timesLoadedComments: CommentsContext["timesLoadedComments"];
  setIsSubmittingComment: CommentsContext["setIsSubmittingComment"];
  setTimesLoadedComments: CommentsContext["setTimesLoadedComments"];
}

export interface CommentOptions {
  name:
    | "Cursiva"
    | "Negrita"
    | "Subrayado"
    | "Título"
    | "Tachado"
    | "Código en línea"
    | "Bloque acotado"
    | "Bloque de código"
    | "Enlace"
    | "Lista de puntos"
    | "Lista de números"
    | "Lista de tareas"
    | "Imagen por enlace";
  type?:
    | "header"
    | "blockquote"
    | "blockCode"
    | "anchor"
    | "bulletList"
    | "numberList"
    | "checkList"
    | "anchorImage";
  mark?: "# " | "> " | "- " | "1. " | "- [ ] ";
  openMark?: "**" | "_" | "~~" | "`";
  closeMark?: "**" | "_" | "~~" | "`";
  children: ReactNode;
}
