import css from "styled-jsx/css";
import { colors } from "styles/theme";

export const actionButtonStyle = css`
  .actionButton {
    border-width: 1px;
    border-style: solid;
    border-radius: 28px;
    color: ${colors.white};
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.375rem 2rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    text-align: center;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
  }
  .actionButton:not(:disabled):not(.disabled):hover {
    background-color: ${colors.dark_tertiary};
    border-color: ${colors.dark_tertiary};
    color: ${colors.white};
    text-decoration: none;
  }
  .actionButton:not(:disabled):not(.disabled):active {
    background-color: ${colors.dark_tertiary};
    border-color: ${colors.dark_tertiary};
    color: ${colors.white};
  }
  .actionButton:not(:disabled):not(.disabled):focus {
    box-shadow: 0 0 0 0.2rem rgba(181, 0, 0, 0.3);
    outline: none;
  }
`;

export const darkActionButtonDynamicStyle = css`
  .actionButton {
    background-color: ${colors.dark_secondary};
    border-color: ${colors.dark_secondary};
  }
`;

export const actionButtonDynamicStyle = css`
  .actionButton {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
  }
`;
