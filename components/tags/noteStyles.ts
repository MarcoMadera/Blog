import { ReactElement } from "react-markdown";
import css from "styled-jsx/css";

export const NoteSuccessLightStyles = css.global`
  p[role="note"].success {
    background: #4caf50;
    border-color: #47df4c;
  }
`;
export const NoteSuccessDarkStyles = css.global`
  p[role="note"].success {
    background: #2e7d32;
    border-color: #4ec954;
  }
`;
export const NoteAlertLightStyles = css.global`
  p[role="note"].alert {
    background: #f39c12;
    border-color: #fcd08b;
  }
`;
export const NoteAlertDarkStyles = css.global`
  p[role="note"].alert {
    background: #e49d2b;
    border-color: #ffac27;
  }
`;
export const NoteInfoLightStyles = css.global`
  p[role="note"].info {
    background: #3498db;
    border-color: #95cef5;
  }
`;
export const NoteInfoDarkStyles = css.global`
  p[role="note"].info {
    background: #1980c5;
    border-color: #55bafd;
  }
`;
export const NoteDangerLightStyles = css.global`
  p[role="note"].danger {
    background: #e74c3c;
    border-color: #fd9c92;
  }
`;
export const NoteDangerDarkStyles = css.global`
  p[role="note"].danger {
    background: #c33223;
    border-color: #f86555;
  }
`;

export const noteStyles: {
  light: Record<string, ReactElement>;
  dark: Record<string, ReactElement>;
} = {
  light: {
    success: NoteSuccessLightStyles,
    info: NoteInfoLightStyles,
    alert: NoteAlertLightStyles,
    danger: NoteDangerLightStyles,
  },
  dark: {
    success: NoteSuccessDarkStyles,
    info: NoteInfoDarkStyles,
    alert: NoteAlertDarkStyles,
    danger: NoteDangerDarkStyles,
  },
};
