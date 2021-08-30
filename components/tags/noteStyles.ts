import { ReactElement } from "react-markdown";
import css from "styled-jsx/css";

const NoteSuccessStyles = css.global`
  div[role="note"].success {
    border-left: 4px solid #4caf50;
  }
  div[role="note"].success li::marker,
  div[role="note"].success a {
    color: #4caf50;
  }
`;
const NoteInfoStyles = css.global`
  div[role="note"].info {
    border-left: 4px solid #3448c5;
  }
  div[role="note"].info li::marker,
  div[role="note"].info a {
    color: #3448c5;
  }
`;
const NoteTipStyles = css.global`
  div[role="note"].tip {
    border-left: 4px solid #48c4d8;
  }
  div[role="note"].tip li::marker,
  div[role="note"].tip a {
    color: #48c4d8;
  }
`;
const NoteDangerStyles = css.global`
  div[role="note"].danger {
    border-left: 4px solid #ff5050;
  }
  div[role="note"].danger li::marker,
  div[role="note"].danger a {
    color: #ff5050;
  }
`;
const NoteImportantStyles = css.global`
  div[role="note"].important {
    border-left: 4px solid #efce4a;
  }
  div[role="note"].important li::marker,
  div[role="note"].important a {
    color: #efce4a;
  }
`;

export const noteStyles: Record<string, ReactElement> = {
  success: NoteSuccessStyles,
  info: NoteInfoStyles,
  danger: NoteDangerStyles,
  tip: NoteTipStyles,
  important: NoteImportantStyles,
};
